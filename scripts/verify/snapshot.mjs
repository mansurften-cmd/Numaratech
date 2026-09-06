// Computed-style fingerprint of every element on every route, screen + print.
// Usage: node snapshot.mjs out.json
import pw from '/opt/node22/lib/node_modules/playwright/index.js';
import { writeFileSync } from 'node:fs';
const { chromium } = pw;
const B = process.env.VERIFY_BASE ?? 'http://127.0.0.1:4322';
const ROUTES=['/','/advisory/','/advisory/accounting-audit/','/advisory/tax/','/advisory/risk-compliance/','/platform/',
 '/platform/corporate-tax/','/platform/fs-studio/','/services/','/business-case/','/about/','/insights/',
 '/insights/first-corporate-tax-return-what-breaks/','/insights/closing-the-books-in-five-days/',
 '/insights/audit-trail-as-a-design-requirement/','/contact/','/privacy/','/terms/','/404.html'];
const PROPS=['display','position','color','background-color','font-family','font-size','font-weight','line-height','letter-spacing',
 'text-transform','padding-top','padding-right','padding-bottom','padding-left','margin-top','margin-bottom','border-top-width',
 'border-bottom-width','border-color','visibility','opacity','width','height','gap','grid-template-columns','outline-style','white-space','animation-name'];
const b=await chromium.launch({executablePath:'/opt/pw-browsers/chromium-1194/chrome-linux/chrome'});
const out={};
for (const w of [1280, 390]) {
  const p=await b.newPage({viewport:{width:w,height:900}});
  for (const r of ROUTES) for (const media of ['screen','print']) {
    await p.emulateMedia({media}); await p.goto(B+r,{waitUntil:'networkidle'});
    await p.addStyleTag({content:'*,*::before,*::after{transition:none!important;animation:none!important}'});
    await p.waitForTimeout(120);
    const rows=await p.evaluate((PROPS)=>[...document.querySelectorAll('body *')].map((el,i)=>{const cs=getComputedStyle(el);
      const path=el.tagName.toLowerCase()+(el.id?'#'+el.id:'')+(typeof el.className==='string'&&el.className?'.'+el.className.trim().split(/\s+/).join('.'):'');
      return i+':'+path+'|'+PROPS.map(k=>cs.getPropertyValue(k)).join(';');}), PROPS);
    out[`${w}:${media}:${r}`]=rows;
  }
  await p.close();
}
await b.close();
writeFileSync(process.argv[2], JSON.stringify(out));
console.log('snapshot:', Object.keys(out).length, 'route/media/width combos,', Object.values(out).reduce((a,v)=>a+v.length,0), 'elements');
