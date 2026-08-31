const fs=require('fs');
const files=fs.readdirSync('.').filter(f=>f.endsWith('.html'));
let out='';
for(const f of files){
  let h=fs.readFileSync(f,'utf8');
  const title=(h.match(/<title>([\s\S]*?)<\/title>/)||[])[1]||'';
  const desc=(h.match(/<meta name="description" content="([^"]*)"/)||[])[1]||'';
  // images
  const imgs=[...h.matchAll(/(?:src|data-src)="(https?:\/\/[^"]*?\.(?:jpg|jpeg|png|webp|svg|gif))"/gi)].map(m=>m[1]);
  const uniq=[...new Set(imgs)].filter(u=>!/plugins|emoji|gravatar/.test(u));
  h=h.replace(/<script[\s\S]*?<\/script>/gi,'').replace(/<style[\s\S]*?<\/style>/gi,'').replace(/<noscript[\s\S]*?<\/noscript>/gi,'').replace(/<!--[\s\S]*?-->/g,'');
  const body=(h.match(/<body[\s\S]*<\/body>/i)||[''])[0];
  let t=body
    .replace(/<\/(h1|h2|h3|h4|h5|h6|p|li|div|section|tr|br)>/gi,'\n')
    .replace(/<(h1|h2|h3|h4)[^>]*>/gi,'\n## ')
    .replace(/<a [^>]*href="([^"]*)"[^>]*>/gi,'[link:$1] ')
    .replace(/<[^>]+>/g,' ')
    .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#8217;|&#039;|&rsquo;/g,"'").replace(/&#8211;|&ndash;/g,'–').replace(/&quot;/g,'"').replace(/&#8230;/g,'…').replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g,'"')
    .replace(/[ \t]+/g,' ')
    .replace(/\n\s*\n+/g,'\n');
  t=t.split('\n').map(s=>s.trim()).filter(s=>s.length>0).join('\n');
  out+=`\n\n================ ${f} ================\nTITLE: ${title}\nDESC: ${desc}\nIMAGES(${uniq.length}):\n${uniq.join('\n')}\n---- CONTENT ----\n${t}\n`;
}
fs.writeFileSync('EXTRACTED.txt',out);
console.log('written',out.length);
