/*
 * Every word on this site, in one file.
 *
 * Migrated from the Divi/WordPress build at crystalwatersplumbing.com.au.
 * Copy is reproduced faithfully where the old site had real copy, and rewritten
 * where it did not — the old /services/ and /services/all-services/ pages were
 * still carrying the Divi Plumber demo theme's lorem ipsum ("Sed ut
 * perspiciatis…", "Jack Jones – Customer", a POWER FLUSHING section, and mailto
 * and href links pointing at diviplumber.digitalrefresh.uk). Those are marked
 * REWRITTEN below so they are easy to find and check against the client.
 *
 * Typos in the source are corrected silently: WARRENTY → warranty, Draiange →
 * Drainage, "WHY HOOSE" → "WHY CHOOSE", "Toilers & faucets" → "Toilets &
 * tapware", "Neighborhood" → neighbourhood, and American -ize spellings
 * normalised to Australian -ise.
 */

export const site = {
  name: "Crystal Waters Plumbing",
  legalName: "Crystal Waters Plumbing & Drainage Pty Ltd",
  tagline: "Plumbing & Drainage",
  domain: "crystalwatersplumbing.com.au",
  url: "https://crystalwatersplumbing.com.au",

  phone: "0412 402 399",
  phoneHref: "tel:+61412402399",
  email: "office@crystalwatersplumbing.com.au",
  emailHref: "mailto:office@crystalwatersplumbing.com.au",

  address: {
    street: "112 Cottesloe Drive",
    suburb: "Robina",
    state: "QLD",
    postcode: "4226",
    full: "112 Cottesloe Drive, Robina QLD 4226",
  },

  facebook: "https://www.facebook.com/Crystalwaters2018/",

  /* Established July 2018 per the About page. Years-in-business is derived
     rather than hard-coded, because the old site was still advertising "5+
     years" three years after that stopped being true. */
  establishedYear: 2018,

  serviceArea: "Palm Beach to Helensvale and everything in between",

  /*
   * Count is off the Trustindex widget the old site embedded. Rating is the
   * client's own correction — the widget read 4.9, they are a straight 5.
   *
   * A string, not a number, so it renders as "5.0" rather than "5". Google
   * shows one decimal and this sits next to a Google mark and five stars; "5"
   * on its own reads as a hand-written claim rather than a pulled figure.
   */
  reviews: {
    count: 205,
    rating: "5.0",
    writeUrl:
      "https://admin.trustindex.io/api/googleWriteReview?place-id=ChIJT9R40fwDkWsR1SQJP4QSWb0",
  },

  /* Their sister company, credited on the About page. */
  sister: {
    name: "Crystal Waters Electrical",
    contact: "Darren",
    phone: "0402 555 032",
    phoneHref: "tel:+61402555032",
  },
} as const;

export function yearsTrading(now = new Date()) {
  return now.getFullYear() - site.establishedYear;
}

/* ── The four proof points, repeated across the old home and about pages ── */
export const pillars = [
  {
    label: "Expert plumbers",
    body: "25+ years in the plumbing industry, on the tools and on the Gold Coast.",
  },
  {
    label: "No call-out fee",
    body: "Upfront pricing with no call-out fee. You know the number before we start.",
  },
  {
    label: "Guaranteed work",
    body: "Lifetime warranty on our workmanship. Every job, no exceptions.",
  },
  {
    label: "Locally based",
    body: "Covering Palm Beach to Helensvale and everything in between.",
  },
] as const;

export const stats = [
  { figure: "25+", label: "Years of experience" },
  { figure: "100%", label: "Lifetime workmanship warranty" },
  { figure: "205", label: "Five-star Google reviews" },
  { figure: "0", label: "Call-out fee, ever" },
] as const;

/* ── SERVICES ────────────────────────────────────────────────────────────
   Slugs are preserved exactly as WordPress served them. This is a migration:
   /services/bathroom-kitchen/ has been indexed for three years and renaming it
   to the more natural /services/kitchen-bathroom/ would throw that away for a
   cosmetic gain. */
export type Service = {
  slug: string;
  nav: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  lead: string;
  image: string;
  imageAlt: string;
  /* The long-form body, section by section. Each entry becomes one editorial
     block; `label` is the .mi eyebrow the old site set above each heading. */
  blocks: { label: string; heading: string; body: string[] }[];
  listLabel: string;
  list: string[];
  why: { heading: string; points: { term: string; body: string }[] };
};

export const services: Service[] = [
  {
    slug: "bathroom-kitchen",
    nav: "Kitchen or Bathroom Renovation",
    title: "Kitchen or Bathroom Renovation",
    metaTitle: "Kitchen or Bathroom Renovation Gold Coast | Crystal Waters Plumbing",
    metaDescription:
      "Kitchen or bathroom renovation plumbing across the Gold Coast. Fully licensed, upfront pricing, lifetime workmanship warranty. Call 0412 402 399.",
    lead: "Choose Crystal Waters Plumbing & Drainage for your next kitchen or bathroom renovation. Our team of respectful, reliable plumbers is committed to first-class workmanship. When it comes to Gold Coast kitchen or bathroom renovations, trust only the experts.",
    image: "g-shower",
    imageAlt: "Completed bathroom in black marble tile with freestanding bath and wall-mounted mixer",
    blocks: [
      {
        label: "Kitchen or bathroom renovation",
        heading: "Kitchen or bathroom renovations on the Gold Coast",
        body: [
          "Are you considering a transformation for the bathroom or kitchen in your Gold Coast home? Is your current space in need of a refresh, or a complete overhaul? Look no further than Crystal Waters Plumbing & Drainage — your premier choice for bathroom and kitchen renovations in the region.",
          "Are your bathroom and kitchen showing signs of wear and tear, feeling outdated, or simply not meeting your lifestyle needs? Our team of experienced professionals specialises in breathing new life into these spaces, improving both how they look and how they work. We have been the go-to choice for countless Gold Coast homeowners looking for a transformation that lifts their whole home.",
        ],
      },
      {
        label: "Renovation specialists",
        heading: "Your kitchen or bathroom renovation experts on the Gold Coast",
        body: [
          "We offer a comprehensive range of renovation services tailored to your specific needs, from minor touch-ups to full-scale overhauls. Our plumbers are not only fully qualified and insured, they have the experience needed to get the plumbing right first time on a renovation — where a mistake behind a wall is an expensive one.",
          "Rest assured, when you choose Crystal Waters Plumbing & Drainage you are choosing a team of professionals dedicated to your satisfaction. Our plumbers are ready to respond promptly when you need us most. Trust the Gold Coast's leading renovation experts to turn your vision into reality.",
        ],
      },
    ],
    listLabel: "Kitchen or bathroom renovation services",
    list: [
      "Replacement of showerheads and tapware",
      "Upgrades for showers, sinks and baths",
      "Installation or replacement of sinks",
      "Vanity unit replacements",
      "Toilet and kitchen repairs and replacements",
      "Pipe relocation, repairs and installations",
      "Hot water system replacements",
      "Installation of all bathroom fixtures and fittings",
      "Kitchen appliance installations and plumbing",
    ],
    why: {
      heading:
        "Why choose Crystal Waters for your next kitchen or bathroom renovation?",
      points: [
        {
          term: "Transparent pricing",
          body: "We provide upfront pricing, so there are no surprises along the way.",
        },
        {
          term: "Guaranteed workmanship",
          body: "Rest easy knowing we stand behind the quality of our work, guaranteeing your satisfaction.",
        },
        {
          term: "Perfection",
          body: "Turning kitchens and bathrooms into rooms people actually want to stand in is the part of the job we like most. Meticulous attention to detail and a keen eye for design, from sleek modern kitchens to spa-like bathrooms — top-quality materials, and every aspect executed with precision and care.",
        },
      ],
    },
  },
  {
    slug: "hot-water-systems",
    nav: "Hot Water Systems",
    title: "Hot Water Systems",
    metaTitle: "Hot Water Systems Gold Coast | Crystal Waters Plumbing",
    metaDescription:
      "Hot water system repair, service and replacement across the Gold Coast — electric, gas and heat pump. Same-day replacement where we can. Call 0412 402 399.",
    lead: "Choose Crystal Waters Plumbing & Drainage for your next hot water system upgrade. Our team of respectful, reliable plumbers is committed to first-class workmanship, and we carry out some of the finest looking installations on the Gold Coast. Trust only the experts.",
    image: "g-hot-1",
    imageAlt: "New hot water system installed against an external wall",
    blocks: [
      {
        label: "Hot water specialists",
        heading: "Hot water system experts on the Gold Coast",
        /* REWRITTEN. The live page repeats the kitchen-and-bathroom
           introduction verbatim here — a copy-paste left in place when the
           service pages were built. These two paragraphs say the same things
           about the right subject. */
        body: [
          "No hot water is not a problem that waits politely until Monday. It is cold showers, a full sink, and a household that stops working. We carry the common units and the common parts, which is why “same day” appears as often as it does in our reviews — several of them describe a morning phone call and a working system by mid-afternoon.",
          "Whether your system needs a repair, a service, or replacing entirely, we will tell you which of those three it actually is before we quote it. A tempering valve or an element is a fraction of the price of a new unit, and a plumber who reaches for the replacement every time is not saving you anything.",
        ],
      },
      {
        label: "Hot water specialists",
        heading: "Repair, service or replace — we will tell you which",
        /* REWRITTEN, same reason as above. */
        body: [
          "We work across electric, gas and heat pump systems, and we install to the manufacturer's specification so your warranty stays intact. Every install is left tidy, the old unit goes with us, and the work area is cleaned before we leave.",
          "Rest assured, when you choose Crystal Waters Plumbing & Drainage you are choosing a team of professionals dedicated to your satisfaction. Our plumbers are ready to respond promptly when you need us most.",
        ],
      },
    ],
    listLabel: "Hot water services",
    list: [
      "Electric hot water systems",
      "Gas hot water systems",
      "Heat pump systems",
      "Repairs and maintenance",
      "Servicing",
      "Hot water system upgrades",
      "Tempering valves",
      "Same-day replacement where stock allows",
    ],
    why: {
      heading:
        "Why choose Crystal Waters for your hot water repair or replacement?",
      points: [
        {
          term: "Transparent pricing",
          body: "We provide upfront pricing, so there are no surprises along the way.",
        },
        {
          term: "Guaranteed workmanship",
          body: "Rest easy knowing we stand behind the quality of our work, guaranteeing your satisfaction.",
        },
        {
          term: "Free plumbing inspection",
          body: "When you book our Gold Coast plumbers, you get a complimentary plumbing inspection so you know the rest of the house is in good shape too.",
        },
      ],
    },
  },
  {
    slug: "drainage-blockages",
    nav: "CCTV & Jetting",
    title: "CCTV & Jetting",
    metaTitle: "Blocked Drains, CCTV & Jetting Gold Coast | Crystal Waters Plumbing",
    metaDescription:
      "Blocked drain clearing, high-pressure jetting and CCTV drain inspections across the Gold Coast. Find the cause, not just the symptom. Call 0412 402 399.",
    lead: "Are you dealing with a drain that blocks again every few months? Is your plumbing system in need of relief? Crystal Waters Plumbing & Drainage is your trusted solution for blocked drains — and for finding out why they keep blocking.",
    image: "sink-and-drain",
    imageAlt: "Sink trap and an open street drain with the jetting reel alongside",
    blocks: [
      {
        label: "Blocked drains",
        heading: "Blocked drain solutions on the Gold Coast",
        body: [
          "Our team offers a comprehensive range of blocked drain services tailored to your situation, from a single blocked sink to a complex drainage problem across a whole property. Our plumbers are fully qualified and insured, and they arrive with the gear to fix the problem on the first visit rather than book a second one.",
          "A blockage cleared is only half the job. A jetter will clear almost anything; a camera tells you whether it was a root, a collapse, a belly in the line or simply what went down the sink. We put the camera down as a matter of course, because clearing the same drain twice a year is not a service, it is a subscription.",
        ],
      },
      {
        label: "Blocked drains",
        heading: "We are experts at what we do",
        body: [
          "Rest assured, when you choose Crystal Waters Plumbing & Drainage you are choosing a team of professionals dedicated to your satisfaction. Our plumbers are ready to respond promptly when you need us most. Trust the Gold Coast's leading blocked drain experts to unclog your drains and restore your peace of mind.",
          "Our team of respectful, reliable plumbers is committed to first-class workmanship. When it comes to blocked drains on the Gold Coast, trust only the experts.",
        ],
      },
    ],
    listLabel: "Drainage services",
    list: [
      "Clearing blockages in sinks, toilets, showers and baths",
      "High-pressure jetting to remove stubborn clogs",
      "CCTV drain inspections to pinpoint the cause",
      "Drain repairs and replacements",
      "Root intrusion removal",
      "Preventative drain maintenance",
    ],
    why: {
      heading: "Why choose Crystal Waters for your drainage problem?",
      points: [
        {
          term: "Peace of mind",
          body: "Experience the relief of a plumbing system that flows smoothly, free from annoying blockages.",
        },
        {
          term: "Optimal performance",
          body: "Enjoy the benefits of a system operating at its best, with improved drainage efficiency.",
        },
        {
          term: "Preventative maintenance",
          body: "Our solutions do not just resolve the blockage in front of us — they help prevent the next one, saving you time and money.",
        },
        {
          term: "Affordability",
          body: "Cost-effective drainage solutions that Gold Coast locals have trusted us with for years. Whether it is a minor blockage or a major drainage problem, our experts deliver quality at an affordable price.",
        },
      ],
    },
  },
  {
    slug: "water-leaks",
    nav: "Water Leaks",
    title: "Water Leaks",
    metaTitle: "Water Leak Detection Gold Coast | Crystal Waters Plumbing",
    metaDescription:
      "Leak detection on the Gold Coast using thermal imaging, drone inspection and CCTV. Internal, external and underground leaks found and fixed. Call 0412 402 399.",
    lead: "At Crystal Waters Plumbing & Drainage we specialise in detecting and repairing both internal and external water leaks. Equipped with advanced tools and extensive experience, our team is dedicated to thorough, efficient leak detection.",
    image: "svc-water-leak",
    imageAlt: "Water leak located and exposed in an external wall",
    blocks: [
      {
        label: "Leak detection",
        heading: "Find it before you dig",
        body: [
          "We take a meticulous approach to pinpointing and resolving leaks promptly. With a commitment to professionalism and precision, we make sure every leak is identified and addressed with the utmost care, protecting your property from further damage and inconvenience. Trust in our expertise to deliver reliable solutions for all your plumbing needs.",
        ],
      },
      {
        label: "Drone footage specialists",
        heading: "Water leaks from above",
        body: [
          "Crystal Waters Plumbing & Drainage offers a sophisticated way of reaching difficult spaces: drone inspection. Using drone technology fitted with high-resolution cameras, we provide a comprehensive visual perspective on areas that are traditionally hard to reach. From tall structures to complex industrial environments, our drone navigates with precision, capturing detailed footage for thorough inspection and assessment of possible water ingress.",
          "This does not just remove the safety risk that comes with a manual inspection — it produces documentation you can actually make a decision from, and keep.",
        ],
      },
      {
        label: "Burst pipe specialists",
        heading: "Water leaks from below",
        body: [
          "Our burst pipe location and repair service is designed to minimise damage and restore peace of mind in record time. Using advanced technology and expert technique, we swiftly pinpoint the source of the leak. Once located, our technicians get to work, repairing the burst pipe with precision and care.",
          "With an efficient, effective approach, you can trust that your property is in capable hands, and we will have your plumbing back in working order before you know it.",
        ],
      },
      {
        label: "Thermal imaging technology",
        heading: "Hidden internal water leaks",
        body: [
          "With thermal imaging, we offer a pioneering approach to detecting internal water leaks with real precision. Using infrared thermography, our equipment translates subtle temperature differences into a clear visual picture, revealing hidden leaks with exceptional clarity. Whether it is concealed behind a wall or sitting under flooring, our thermal imaging system identifies the source of the moisture, enabling swift and accurate diagnosis.",
          "Trust in our expertise and our tools to identify and address internal water leaks effectively — before the plasterboard tells you where the leak was.",
        ],
      },
    ],
    listLabel: "Water leak services",
    list: [
      "Internal water leaks",
      "External water leaks",
      "Underground water leaks",
      "Burst pipe location",
      "Thermal imaging technology",
      "Drone footage specialists",
      "CCTV inspections",
      "Water mains entry point location",
      "Fixture and fitting leaks",
    ],
    why: {
      heading: "Why choose Crystal Waters to find your leak?",
      points: [
        {
          term: "We locate before we open",
          body: "Thermal imaging, CCTV and drone footage mean we cut once, in the right place — not three times looking for it.",
        },
        {
          term: "Documented",
          body: "You get the footage and the images. That matters when there is an insurer or a body corporate on the other side of the conversation.",
        },
        {
          term: "Guaranteed workmanship",
          body: "Lifetime warranty on our workmanship, on the repair as well as the detection.",
        },
      ],
    },
  },
];

/* ── EVERYTHING ELSE WE DO ───────────────────────────────────────────────
   REWRITTEN. The old /services/all-services/ page listed nine items under a
   POWER FLUSHING heading with lorem ipsum beneath it, and included "Radiator
   replacements" — a service for a UK heating market, inherited from the demo
   theme and not something a Gold Coast plumber sells. The list below keeps the
   items that were real and replaces the ones that were not with work this
   business actually does, per the About page ("we fix leaky tap washers to new
   homes and everything in between. Burst pipe?…we got you covered. Gas
   leak?…we got that covered too."). Worth confirming with Nick. */
export const allServices = [
  "General plumbing & maintenance",
  "Burst pipes",
  "Gas fitting & gas leaks",
  "Bathroom upgrades",
  "Toilets & tapware",
  "Outside taps & garden lines",
  "Shower replacement",
  "Drain unblocking",
  "Toilet repairs",
  "Water filters & purifiers",
  "New homes & extensions",
  "Rainwater tanks & pumps",
  "Backflow prevention",
  "Stormwater & kerb adaptors",
] as const;

/* ── HOW WE WORK ─────────────────────────────────────────────────────────
   NEW. The old site had no process section; every review that mentions why
   people rebooked describes the same four things happening in the same order,
   so it is written down here rather than left implicit. */
export const process = [
  {
    step: "01",
    title: "You call, a plumber answers",
    body: "Not a call centre. You get Nick or someone on the tools, and a straight answer about whether it is today, tomorrow, or something you can safely leave until next week.",
  },
  {
    step: "02",
    title: "We turn up when we said",
    body: "The single thing customers mention most in our reviews. If we are running late you will hear from us before the window closes, not after.",
  },
  {
    step: "03",
    title: "Price before we start",
    body: "Upfront pricing and no call-out fee. You approve the number before a tool comes out of the van.",
  },
  {
    step: "04",
    title: "Clean site, lifetime warranty",
    body: "The old unit leaves with us, the area is cleaned, and the workmanship is covered for life.",
  },
] as const;

/* ── TEAM ────────────────────────────────────────────────────────────────
   From the About page. Hayden's tenure ("going into his 3rd year") was written
   in 2023 and is stale; it is described qualitatively here instead so it does
   not need editing every January. */
export const team = [
  {
    name: "Nick",
    role: "The brains",
    image: "team-nick",
    body: [
      "With 25+ years in the plumbing and building industry, my knowledge of the other trades is what sets me aside from the rest.",
      "My spare time is spent at Miami Beach SLSC, where I take care of the equipment and spend time as a patrolling member on our beaches.",
    ],
  },
  {
    name: "Hayden",
    role: "Plumber",
    image: "team-hayden",
    body: [
      "Hayden is our longest-standing employee and an absolute asset to the team, with workmanship second to none.",
      "At 6'4\" tall, Hayden spends his time on the courts with one of the finest basketball teams on the Gold Coast.",
    ],
  },
  {
    name: "Ethan",
    role: "Plumbing apprentice",
    image: "team-ethan",
    body: [
      "Ethan is the newest member of our team.",
      "Ethan is also a keen member of Miami Beach SLSC, where he regularly patrols to keep our beaches safe.",
    ],
  },
] as const;

/* ── REVIEWS ─────────────────────────────────────────────────────────────
   The ten Google reviews the old site's Trustindex widget rendered. Kept
   verbatim, because they are other people's words. */
export const reviews = [
  {
    name: "Maddie E",
    body: "Exterior shower and under sink water purifier installed. Nick's service was fantastic. Great communication, quality professional install, friendly service and made sure we were happy with the results. Would definitely recommend.",
  },
  {
    name: "Clare Houlihan",
    body: "I called Nick at 9:30am as our hot water system needed to be replaced. We had a new system supplied and installed by 2:30pm the same day. Great quality work, great price, so so happy and highly recommend!",
  },
  {
    name: "Dave Crockett",
    body: "I recently hired Nick for several plumbing tasks in our home including a full in wall toilet replacement unit, retiling the bathroom wall, addressing a roof top hot water issue, and installing a new kitchen tap. Nick paid meticulous attention to detail and the cleanliness of work. He showed up exactly on time and as agreed and was very good value for money. Highly recommended for anyone seeking top notch plumbing services.",
  },
  {
    name: "Anthony Stevens",
    body: "I had no hot water, phoned Crystal Waters plumbing and was informed they would be at my residence within a couple of hours, which they were. Nick and his son were very polite and their work in repairing my water heater was performed professionally. I was very happy with their work and considered it good value. I would have no hesitation in recommending this company.",
  },
  {
    name: "Dian Deller",
    body: "I phoned Nick this morning hoping to have my hot water system replaced. Nick gave exceptional and professional service with same day replacement. The old system taken away and the work area completely cleaned. I'd have no hesitation in recommending Crystal Waters Plumbing. Great job boys.",
  },
  {
    name: "luke",
    body: "Nick and his team from Crystal Waters Plumbing are highly recommended. We have used his business multiple times now at our property for varying issues, each one has been solved promptly, affordable and with professionalism. Workmanship is neat and tidy with no mess left behind. Would recommend him every day of the week and will continue to use him for any plumbing needs in the future.",
  },
  {
    name: "chris ritchie",
    body: "Great Plumbing company, They turn up when they say they are going to, price is good value and leave a tidy job. I highly recommend them and will be using them for all my plumbing.",
  },
  {
    name: "Bobby K",
    body: "Great experience with Nick, always there to help. Above five star service. Will use again.",
  },
  {
    name: "Laz Foley",
    body: "Affordable pricing and quality workmanship",
  },
  {
    name: "Shane",
    body: "Excellent, nothing was a problem. 10/10. Thank you.",
  },
] as const;

/* ── GALLERY ─────────────────────────────────────────────────────────────
   The fifteen images the old gallery page served, plus the three job photos
   that were only ever used as page decoration. Captions are new — the old
   gallery had none, and an uncaptioned grid of pipework does not tell a
   prospective customer anything. */
export const gallery = [
  { image: "g-shower", alt: "Black marble bathroom with freestanding bath", caption: "Marble bathroom fit-off", tag: "Bathroom" },
  { image: "g-vanity", alt: "Wall-hung vanity with new tapware", caption: "Wall-hung vanity install", tag: "Bathroom" },
  { image: "g-perfection", alt: "Under-sink water filter and purifier with new copper work", caption: "Under-sink filter & purifier", tag: "Kitchen" },
  { image: "svc-kitchen", alt: "New kitchen with island bench and undermount sink", caption: "Kitchen fit-off", tag: "Kitchen" },
  { image: "svc-bathroom", alt: "In-wall cistern and pan installed in a tiled bathroom", caption: "In-wall cistern & pan", tag: "Bathroom" },
  { image: "g-bathroom-1", alt: "Bathroom fit-off detail", caption: "Fit-off detail", tag: "Bathroom" },
  { image: "g-bathroom-2", alt: "Completed bathroom plumbing", caption: "Completed renovation", tag: "Bathroom" },
  { image: "g-bathroom-3", alt: "New bathroom pipework", caption: "New pipework", tag: "Bathroom" },
  { image: "g-bathroom-4", alt: "Bathroom tapware installation", caption: "Tapware installation", tag: "Bathroom" },
  { image: "g-bathroom-5", alt: "Bathroom plumbing detail", caption: "Concealed cistern", tag: "Bathroom" },
  { image: "g-bathroom-6", alt: "Renovated bathroom", caption: "Renovated bathroom", tag: "Bathroom" },
  { image: "g-hot-1", alt: "New hot water system installed", caption: "Hot water system replacement", tag: "Hot water" },
  { image: "g-hot-2", alt: "Hot water unit and tempering valve", caption: "Unit & tempering valve", tag: "Hot water" },
  { image: "g-hot-3", alt: "Hot water system pipework", caption: "Tidy pipework", tag: "Hot water" },
  { image: "g-gas-1", alt: "Gas line installation", caption: "Gas line installation", tag: "Gas" },
  { image: "g-gas-2", alt: "Gas meter and regulator", caption: "Meter & regulator", tag: "Gas" },
  { image: "g-gas-3", alt: "Gas fitting detail", caption: "Gas fitting", tag: "Gas" },
  { image: "g-kerb-1", alt: "Kerb adaptor installation", caption: "Kerb adaptor", tag: "Drainage" },
  { image: "g-kerb-2", alt: "Stormwater kerb outlet", caption: "Stormwater outlet", tag: "Drainage" },
  { image: "g-kerb-3", alt: "Completed kerb adaptor and driveway reinstatement", caption: "Reinstated driveway", tag: "Drainage" },
] as const;

/* ── SUBURBS ─────────────────────────────────────────────────────────────
   NEW. The old site said only "Palm Beach to Helensvale and everything
   in-between", which is accurate but invisible to anyone searching for their
   own suburb. This is that same corridor, named. */
export const suburbs = [
  "Palm Beach", "Burleigh Heads", "Burleigh Waters", "Miami", "Mermaid Beach",
  "Mermaid Waters", "Broadbeach", "Broadbeach Waters", "Robina", "Varsity Lakes",
  "Reedy Creek", "Mudgeeraba", "Worongary", "Carrara", "Merrimac",
  "Surfers Paradise", "Main Beach", "Bundall", "Ashmore", "Benowa",
  "Southport", "Labrador", "Parkwood", "Arundel", "Molendinar",
  "Nerang", "Highland Park", "Pacific Pines", "Helensvale",
] as const;

/* ── FAQ ─────────────────────────────────────────────────────────────────
   NEW. Answers are drawn from claims the old site already made — no-call-out
   fee, lifetime warranty, service area, same-day hot water — so nothing here
   is a new promise on the client's behalf. */
export const faqs = [
  {
    q: "Do you charge a call-out fee?",
    a: "No. Crystal Waters Plumbing & Drainage has upfront pricing with no call-out fee. You get the price before we start, and you approve it before any work begins.",
  },
  {
    q: "What areas do you cover?",
    a: "Palm Beach to Helensvale and everything in between — Robina, Burleigh, Miami, Mermaid, Broadbeach, Varsity Lakes, Mudgeeraba, Nerang, Southport, Pacific Pines and the suburbs around them. If you are not sure whether you are in the corridor, call and ask.",
  },
  {
    q: "Can you replace a hot water system the same day?",
    a: "Often, yes. Several of our Google reviews describe a morning phone call and a working system by that afternoon. It depends on the unit you need and whether it is in stock — we will tell you honestly when we take the call.",
  },
  {
    q: "What does the lifetime warranty cover?",
    a: "Our workmanship, for life. Product warranties are separate and come from the manufacturer, which is one reason we install everything to manufacturer specification — a shortcut on the install is what voids those.",
  },
  {
    q: "My drain keeps blocking. Why?",
    a: "Because clearing a blockage and finding its cause are two different jobs. A jetter will clear almost anything; a CCTV camera tells you whether you are dealing with tree roots, a collapsed section, a belly in the line, or simply what is going down the sink. We put the camera down as a matter of course.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes — fully licensed and insured, with 25+ years in the plumbing and building industry behind the business.",
  },
  {
    q: "Do you do electrical work too?",
    a: "Not ourselves, but our sister company does. Crystal Waters Electrical — ask for Darren on 0402 555 032. He carries out some of the finest work on the Gold Coast.",
  },
] as const;
