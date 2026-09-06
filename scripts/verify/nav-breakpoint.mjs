import { createRequire } from 'node:module';
// require() resolves a directory through its package.json; ESM import() does
// not, so a global install path must go through require.
const pwm = process.env.PLAYWRIGHT_PKG ? createRequire(import.meta.url)(process.env.PLAYWRIGHT_PKG) : await import('playwright');
const pw = { chromium: pwm.chromium ?? pwm.default.chromium };
const B=process.env.VERIFY_BASE ?? 'http://127.0.0.1:4322', OUT=process.argv[2];
const b=await pw.chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined});
const bad=[];
for (const w of [320,360,390,414,600,768,820,844,961,999,1000,1024,1100,1280]) {
  const p=await b.newPage({viewport:{width:w,height:800}});
  for (const r of ['/','/platform/','/platform/corporate-tax/','/business-case/','/terms/']) {
    await p.goto(B+r,{waitUntil:'networkidle'});
    const m=await p.evaluate(()=>({sw:document.documentElement.scrollWidth, burger:getComputedStyle(document.querySelector('.nt-burger')).display!=='none', linksH:Math.round(document.querySelector('.nt-nav__links').getBoundingClientRect().height), linksShown:getComputedStyle(document.querySelector('.nt-nav__links')).display!=='none'}));
    if (m.sw>w+1) bad.push(`${w}px ${r}: overflow ${m.sw}`);
    if (w<1000 && (!m.burger || m.linksShown)) bad.push(`${w}px ${r}: expected drawer (burger=${m.burger}, links shown=${m.linksShown})`);
    if (w>=1000 && (m.burger || !m.linksShown || m.linksH>60)) bad.push(`${w}px ${r}: expected one-line desktop nav (burger=${m.burger}, linksH=${m.linksH})`);
  }
  await p.close();
}
// drawer works on an iPad portrait, by tap
{ const ctx=await b.newContext({viewport:{width:768,height:1024},hasTouch:true,isMobile:true}); const p=await ctx.newPage(); await p.goto(B+'/',{waitUntil:'networkidle'});
  await p.locator('.nt-burger').tap(); await p.waitForTimeout(250);
  const ok=await p.evaluate(()=>document.querySelector('.nt-burger').getAttribute('aria-expanded')==='true' && getComputedStyle(document.querySelector('#nt-menu')).display!=='none');
  if(!ok) bad.push('768 drawer did not open on tap'); await p.screenshot({path:`${OUT}/drawer-768.png`}); await ctx.close(); }
// drawer bottom at 390 (CTA), and crops of risky sections
{ const ctx=await b.newContext({viewport:{width:390,height:844},hasTouch:true,isMobile:true,deviceScaleFactor:2}); const p=await ctx.newPage();
  await p.goto(B+'/',{waitUntil:'networkidle'}); await p.locator('.nt-burger').tap(); await p.waitForTimeout(250);
  await p.evaluate(()=>{const m=document.querySelector('#nt-menu'); m.scrollTop=m.scrollHeight;}); await p.waitForTimeout(150);
  await p.screenshot({path:`${OUT}/drawer-390-bottom.png`});
  const crop=async(r,sel,name)=>{await p.goto(B+r,{waitUntil:'networkidle'}); const el=p.locator(sel).first(); await el.scrollIntoViewIfNeeded(); await el.screenshot({path:`${OUT}/${name}.png`});};
  await crop('/platform/','.nt-console','crop-console-390');
  await crop('/platform/corporate-tax/','.est','crop-estimator-390');
  await crop('/business-case/','.calc','crop-calc-390');
  await crop('/','.nt-footer','crop-footer-390');
  await crop('/','#estimator','crop-home-estimator-390');
  await ctx.close(); }
await b.close();
console.log(bad.length? bad.join('\n') : 'tablet/nav sweep clean: no overflow at 14 widths; drawer <1000px; one-line nav >=1000px; iPad drawer opens on tap');
