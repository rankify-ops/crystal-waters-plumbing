"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { site } from "@/content/site";
import { Tap, Cylinder, Camera, Drip, Phone, Arrow, Clock } from "@/components/ui/Icons";

/*
 * The multi-stage quote form.
 *
 * Same shape as the Tintek Roofing build: four questions then contact details,
 * one question per screen, tap-to-answer rather than type-to-answer. The reason
 * it converts better than a single long form is not the animation — it is that
 * step one asks for nothing personal, so the commitment is a tap, and by the
 * time the email field appears the person has already invested three answers.
 *
 * Differences from the Tintek version, all deliberate:
 *
 *   - Selecting an option ADVANCES. Tintek's version required select-then-Next,
 *     which is two taps for one decision on every question.
 *   - Urgency comes second, not third. For a plumber it is the field that
 *     changes what happens next — a burst pipe should reach a phone, not an
 *     inbox — so it is asked while the form still has the person's attention,
 *     and an "emergency" answer surfaces the phone number immediately rather
 *     than waiting for the thank-you screen.
 *   - Back is a single control in the progress row, not a button per step.
 *
 * Submission goes to Web3Forms, which is what the other Rankify plumbing builds
 * use — it needs no server, which matters because this site is a static export.
 * The access key is per-inbox: set NEXT_PUBLIC_WEB3FORMS_KEY at build time.
 * Without it the form degrades to the phone number rather than silently
 * pretending to send.
 */

const ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "";

type Option = { value: string; label: string; note?: string; Icon?: typeof Tap };

const JOB: Option[] = [
  { value: "Blocked drain", label: "Blocked drain", note: "Sink, toilet, shower or main line", Icon: Camera },
  { value: "Hot water", label: "Hot water", note: "No hot water, or time to replace", Icon: Cylinder },
  { value: "Leak or burst pipe", label: "Leak or burst pipe", note: "Including hidden and underground", Icon: Drip },
  { value: "Kitchen or bathroom", label: "Kitchen or bathroom", note: "Renovation, upgrade or fit-off", Icon: Tap },
  { value: "Gas", label: "Gas fitting or gas leak" },
  { value: "Something else", label: "Something else" },
];

/* Referenced in three places, so it is named once rather than typed out. */
const EMERGENCY = "Emergency — today";

const URGENCY: Option[] = [
  { value: EMERGENCY, label: "Emergency", note: "Water is going somewhere it should not" },
  { value: "This week", label: "This week" },
  { value: "Next few weeks", label: "Next few weeks" },
  { value: "Just getting a price", label: "Just getting a price" },
];

const PROPERTY: Option[] = [
  { value: "House", label: "House" },
  { value: "Unit or apartment", label: "Unit or apartment" },
  { value: "Commercial", label: "Commercial" },
  { value: "Body corporate", label: "Body corporate" },
];

const STEPS = ["What is the job?", "How urgent?", "Property type", "Your details"];

export function QuoteForm({
  /** Pre-selects step one when the form is embedded on a service page. */
  presetJob,
  className = "",
}: {
  presetJob?: string;
  className?: string;
}) {
  // A preset job means question one is already answered by the click that got
  // the visitor here, so the form opens on question two. Back still returns to
  // question one, where their answer is shown selected and can be changed.
  const [step, setStep] = useState(presetJob ? 1 : 0);
  const [answers, setAnswers] = useState<Record<string, string>>(
    presetJob ? { job: presetJob } : {}
  );
  const [fields, setFields] = useState({ name: "", phone: "", email: "", suburb: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const honeypot = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const firstRender = useRef(true);

  const emergency = answers.urgency === "Emergency — today";

  // Move focus to the new question on each advance, so a screen reader and a
  // keyboard user both land where a sighted user is already looking. Skipped on
  // first render, which would otherwise yank the page to the form on load.
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    panelRef.current?.focus({ preventScroll: true });
  }, [step]);

  function choose(key: string, value: string) {
    setAnswers((a) => ({ ...a, [key]: value }));

    // "Emergency" is the one answer that should stop the form rather than
    // advance it. Somebody with water coming through a ceiling is better served
    // by a phone number than by three more questions, so the panel holds and
    // offers the call — with a way to carry on for anyone who would still
    // rather type it out.
    if (key === "urgency" && value === EMERGENCY) return;

    // A short beat otherwise, so the selected state is visible before the panel
    // changes. Without it the answer appears to have been ignored.
    window.setTimeout(() => setStep((s) => Math.min(s + 1, STEPS.length - 1)), 170);
  }

  const canSubmit =
    fields.name.trim() !== "" &&
    fields.phone.trim() !== "" &&
    fields.suburb.trim() !== "";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || status === "sending") return;

    // Bots fill every field they find; a human never sees this one.
    if (honeypot.current?.value) return;

    if (!ACCESS_KEY) {
      setStatus("error");
      setError(
        "This form is not connected yet. Please call " + site.phone + " or email us and we will come straight back to you."
      );
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: ACCESS_KEY,
          subject: `${answers.urgency === "Emergency — today" ? "URGENT — " : ""}Quote request: ${answers.job || "Plumbing"} (${fields.suburb})`,
          from_name: "crystalwatersplumbing.com.au",
          name: fields.name,
          phone: fields.phone,
          email: fields.email || "not supplied",
          Suburb: fields.suburb,
          Job: answers.job || "Not specified",
          Urgency: answers.urgency || "Not specified",
          Property: answers.property || "Not specified",
          Details: fields.message || "—",
          "Source page": typeof window !== "undefined" ? window.location.href : "",
        }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) throw new Error(data?.message || `HTTP ${res.status}`);
      setStatus("done");
    } catch {
      setStatus("error");
      setError(
        `Sorry — we could not send that. Please call ${site.phone} or email ${site.email} and we will pick it up straight away.`
      );
    }
  }

  const progress = useMemo(
    () => (status === "done" ? 1 : (step + (step === STEPS.length - 1 ? 0.5 : 0)) / STEPS.length),
    [step, status]
  );

  /* ── Done ──────────────────────────────────────────────────────────── */
  if (status === "done") {
    return (
      <div className={`border border-[var(--rule)] bg-paper p-8 md:p-11 ${className}`} id="quote">
        <div className="mb-7 h-[3px] w-full bg-[var(--rule)]">
          <div className="h-full bg-aqua" style={{ width: "100%" }} />
        </div>
        <div className="py-6 text-center">
          <div className="mx-auto mb-7 grid h-14 w-14 place-items-center rounded-full bg-aqua/10">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="var(--aqua)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m4 12.5 5 5L20 6.5" />
            </svg>
          </div>
          <h3 className="dsp-sm text-[26px]">Thanks — we have got it</h3>
          <p className="bd mx-auto mt-4 max-w-[400px]">
            {emergency
              ? "You flagged this as urgent, so if you have not heard from us in the next few minutes, please call — that is the fastest way to reach us."
              : "A member of the team will call you back to talk it through and give you a price. No call-out fee, and nothing starts until you approve the number."}
          </p>
          <a href={site.phoneHref} className="btn btn-aqua mt-8">
            <Phone size={15} />
            {site.phone}
          </a>
        </div>
      </div>
    );
  }

  /* ── Form ──────────────────────────────────────────────────────────── */
  return (
    <div className={`border border-[var(--rule)] bg-paper p-6 sm:p-8 md:p-10 ${className}`} id="quote">
      <div className="mb-1 flex items-baseline justify-between gap-4">
        <h3 className="dsp-sm text-[21px] md:text-[24px]">Get a free quote</h3>
        <span className="mi shrink-0" style={{ color: "var(--ink-3)" }}>
          Step {step + 1} / {STEPS.length}
        </span>
      </div>
      <p className="bd-sm mb-6">Four quick questions. No call-out fee, no obligation.</p>

      {/* Progress. One continuous bar rather than four pips — pips imply the
          steps are equal in effort, and the last one is not. */}
      <div className="mb-8 h-[3px] w-full bg-[var(--rule)]">
        <div
          className="h-full bg-aqua transition-[width] duration-500"
          style={{ width: `${Math.max(progress, 0.06) * 100}%` }}
        />
      </div>

      <div ref={panelRef} tabIndex={-1} className="outline-none" aria-live="polite">
        {/* Step 1 — job */}
        {step === 0 && (
          <Panel heading="What do you need done?" sub="Pick whichever is closest.">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {JOB.map((o) => (
                <Choice key={o.value} option={o} selected={answers.job === o.value} onSelect={() => choose("job", o.value)} />
              ))}
            </div>
          </Panel>
        )}

        {/* Step 2 — urgency */}
        {step === 1 && (
          <Panel heading="How urgent is it?" sub="This decides whether we call you or slot you in.">
            <div className="grid gap-2.5">
              {URGENCY.map((o) => (
                <Choice key={o.value} option={o} selected={answers.urgency === o.value} onSelect={() => choose("urgency", o.value)} row />
              ))}
            </div>
            {/* Selecting "Emergency" holds the form here (see choose()) and
                offers the phone instead of question three. */}
            {emergency && (
              <div className="mt-4 border border-aqua bg-aqua/[0.07] p-5">
                <p className="bd-sm text-ink">
                  If water is actively going somewhere it should not, ring us
                  rather than filling this in — we will get someone moving while
                  we are still on the phone.
                </p>
                <a href={site.phoneHref} className="btn btn-aqua mt-4 w-full">
                  <Phone size={15} />
                  Call now — {site.phone}
                </a>
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mi mt-4 inline-flex w-full items-center justify-center gap-2 transition-colors hover:text-aqua"
                  style={{ color: "var(--ink-3)" }}
                >
                  Or finish the form instead
                  <Arrow size={13} />
                </button>
              </div>
            )}
          </Panel>
        )}

        {/* Step 3 — property */}
        {step === 2 && (
          <Panel heading="What sort of property?" sub="Units and body corporate jobs have their own paperwork.">
            <div className="grid gap-2.5 sm:grid-cols-2">
              {PROPERTY.map((o) => (
                <Choice key={o.value} option={o} selected={answers.property === o.value} onSelect={() => choose("property", o.value)} />
              ))}
            </div>
          </Panel>
        )}

        {/* Step 4 — details */}
        {step === 3 && (
          <Panel heading="Where should we call you?" sub="Phone and suburb are all we really need.">
            <form onSubmit={submit} className="grid gap-2.5">
              <Field label="Your name" value={fields.name} onChange={(v) => setFields((f) => ({ ...f, name: v }))} autoComplete="name" required />
              <Field label="Phone number" value={fields.phone} onChange={(v) => setFields((f) => ({ ...f, phone: v }))} type="tel" autoComplete="tel" required />
              <Field label="Suburb" value={fields.suburb} onChange={(v) => setFields((f) => ({ ...f, suburb: v }))} autoComplete="address-level2" required />
              <Field label="Email (optional)" value={fields.email} onChange={(v) => setFields((f) => ({ ...f, email: v }))} type="email" autoComplete="email" />
              <label className="block">
                <span className="sr-only">Anything else we should know?</span>
                <textarea
                  value={fields.message}
                  onChange={(e) => setFields((f) => ({ ...f, message: e.target.value }))}
                  placeholder="Anything else we should know? (optional)"
                  rows={3}
                  className="bd w-full resize-none border border-[var(--rule)] bg-paper px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-[var(--ink-3)] focus:border-aqua"
                />
              </label>

              <input ref={honeypot} type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -left-[9999px] h-px w-px opacity-0" />

              <button type="submit" disabled={!canSubmit || status === "sending"} className="btn btn-solid mt-2 w-full disabled:cursor-not-allowed disabled:opacity-45">
                {status === "sending" ? "Sending…" : "Request my quote"}
                {status !== "sending" && <Arrow size={14} />}
              </button>

              {status === "error" && (
                <p className="bd-sm mt-1" style={{ color: "var(--alarm)" }} role="alert">
                  {error}
                </p>
              )}

              <p className="mi mt-3 flex items-center justify-center gap-2" style={{ color: "var(--ink-3)" }}>
                <Clock size={13} />
                We reply the same day, most days
              </p>
            </form>
          </Panel>
        )}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(s - 1, 0))}
          className="mi mt-7 inline-flex items-center gap-2 transition-colors hover:text-aqua"
          style={{ color: "var(--ink-3)" }}
        >
          <Arrow size={13} className="rotate-180" />
          Back
        </button>
      )}
    </div>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

function Panel({ heading, sub, children }: { heading: string; sub: string; children: React.ReactNode }) {
  return (
    // key-less fade-in: the panel remounts on every step change, so the
    // animation restarts without any state to track.
    <div className="animate-[panel_.5s_cubic-bezier(.16,1,.3,1)_both]">
      <style>{`@keyframes panel{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}`}</style>
      <h4 className="dsp-sentence text-[19px] md:text-[21px]">{heading}</h4>
      <p className="bd-sm mb-6 mt-2">{sub}</p>
      {children}
    </div>
  );
}

function Choice({
  option,
  selected,
  onSelect,
  row = false,
}: {
  option: Option;
  selected: boolean;
  onSelect: () => void;
  row?: boolean;
}) {
  const { Icon } = option;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`group flex items-center gap-3.5 border px-4 py-4 text-left transition-all duration-300 ${
        selected
          ? "border-aqua bg-aqua/[0.07]"
          : "border-[var(--rule)] hover:border-[var(--ink-3)] hover:bg-mist"
      } ${row ? "" : "sm:min-h-[74px]"}`}
    >
      {Icon && (
        <span className={`shrink-0 transition-colors ${selected ? "text-aqua" : "text-[var(--ink-3)] group-hover:text-ink"}`}>
          <Icon size={22} />
        </span>
      )}
      <span className="min-w-0">
        <span className="mi-lg block text-ink">{option.label}</span>
        {option.note && (
          <span className="bd-sm mt-1 block leading-snug">{option.note}</span>
        )}
      </span>
    </button>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  autoComplete,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  autoComplete?: string;
  required?: boolean;
}) {
  return (
    <label className="block">
      <span className="sr-only">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        autoComplete={autoComplete}
        required={required}
        className="bd w-full border border-[var(--rule)] bg-paper px-4 py-3.5 text-ink outline-none transition-colors placeholder:text-[var(--ink-3)] focus:border-aqua"
      />
    </label>
  );
}
