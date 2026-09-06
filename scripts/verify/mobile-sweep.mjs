import { createRequire } from 'node:module';
// require() resolves a directory through its package.json; ESM import() does
// not, so a global install path must go through require.
const pwm = process.env.PLAYWRIGHT_PKG ? createRequire(import.meta.url)(process.env.PLAYWRIGHT_PKG) : await import('playwright');
const pw = { chromium: pwm.chromium ?? pwm.default.chromium };
const B=process.env.VERIFY_BASE ?? 'http://127.0.0.1:4322', OUT=process.argv[2];
const ROUTES=['/','/advisory/','/advisory/accounting-audit/','/advisory/tax/','/advisory/risk-compliance/','/platform/','/platform/corporate-tax/','/platform/fs-studio/','/services/','/business-case/','/about/','/insights/','/insights/first-corporate-tax-return-what-breaks/','/insights/closing-the-books-in-five-days/','/insights/audit-trail-as-a-design-requirement/','/contact/','/privacy/','/terms/','/404.html'];
const VIEWPORTS=[[320,568],[360,740],[390,844],[414,896],[768,1024],[820,1180],[1024,1366],[844,390]];
const b=await pw.chromium.launch({executablePath: process.env.CHROMIUM_PATH || undefined});
const issues=[]; const note=(k,v)=>issues.push(`${k}: ${v}`);
for (const [w,h] of VIEWPORTS) {
  const ctx=await b.newContext({viewport:{width:w,height:h}, hasTouch:w<=820, isMobile:w<=820, deviceScaleFactor:2});
  const p=await ctx.newPage(); const failed=[]; const errs=[];
  p.on('response', r=>{ if(r.status()>=400 && r.url().startsWith(B)) failed.push(`${r.status()} ${r.url().replace(B,'')}`); });
  p.on('pageerror', e=>errs.push(e.message.slice(0,80))); p.on('console', m=>{ if(m.type()==='error') errs.push(m.text().slice(0,80)); });
  for (const r of ROUTES) {
    await p.goto(B+r,{waitUntil:'networkidle'});
    const m=await p.evaluate((w)=>{
      const doc=document.documentElement; const over=doc.scrollWidth>w+1;
      const wide=[...document.querySelectorAll('body *')].filter(e=>{const rc=e.getBoundingClientRect(); const cs=getComputedStyle(e); return rc.width>0&&rc.right>w+1&&!['auto','scroll'].includes(cs.overflowX)&&!e.closest('.nt-table-scroll, .nt-nav__links');}).slice(0,3).map(e=>e.tagName.toLowerCase()+'.'+((e.className||'')+'').split(' ')[0]+'@'+Math.round(e.getBoundingClientRect().right));
      const nav=document.querySelector('.nt-nav'); const navH=nav?Math.round(nav.getBoundingClientRect().height):0;
      const links=document.querySelector('.nt-nav__links'); const linksH=links?Math.round(links.getBoundingClientRect().height):0;
      const consoles=[...document.querySelectorAll('.nt-console')].map(c=>Math.round(c.getBoundingClientRect().right));
      // any text node visually clipped by an overflow:hidden ancestor narrower than its content?
      const clipped=[...document.querySelectorAll('h1,h2,h3,p,dd,span,a,td,th,li')].filter(e=>{ if (e.classList.contains('nt-sr-only')) return false; const cs=getComputedStyle(e); if(cs.overflow!=='hidden'&&cs.overflowX!=='hidden') return false; return e.scrollWidth>e.clientWidth+2 && !e.classList.contains('nt-btn');}).slice(0,3).map(e=>e.tagName.toLowerCase()+'.'+((e.className||'')+'').split(' ')[0]+` sw=${e.scrollWidth} cw=${e.clientWidth}`);
      return {over, sw:doc.scrollWidth, wide, navH, linksH, consoles, clipped};
    }, w);
    if (m.over) note(`${w}x${h} ${r}`, `horizontal overflow scrollWidth=${m.sw} culprits=${m.wide.join(',')||'?'}`);
    if (m.clipped.length) note(`${w}x${h} ${r}`, `clipped text: ${m.clipped.join(' | ')}`);
    if (w>=721 && m.linksH>60) note(`${w}x${h} ${r}`, `desktop nav wrapped to ${m.linksH}px tall (nav ${m.navH}px)`);
    if (m.consoles.some(x=>x>w+1)) note(`${w}x${h} ${r}`, `mockup overflows viewport: right=${m.consoles.join(',')}`);
    if (w===390 && h===844) await p.screenshot({path:`${OUT}/${r.replace(/[\/.]/g,'_')||'home'}.png`, fullPage:true});
    if (w===768 && ['/','/platform/','/platform/corporate-tax/'].includes(r)) await p.screenshot({path:`${OUT}/768-${r.replace(/[\/.]/g,'_')||'home'}.png`, fullPage:false});
  }
  if (failed.length) note(`${w}x${h}`, `failed requests: ${[...new Set(failed)].join(', ')}`);
  if (errs.length) note(`${w}x${h}`, `console errors: ${[...new Set(errs)].join(' | ')}`);
  // Drawer on this viewport (mobile only)
  if (w<=720) {
    await p.goto(B+'/',{waitUntil:'networkidle'}); await p.locator('.nt-burger').tap(); await p.waitForTimeout(300);
    const d=await p.evaluate(()=>{const m=document.querySelector('#nt-menu'); const cs=getComputedStyle(m); const last=[...m.querySelectorAll('a')].pop(); const r=m.getBoundingClientRect();
      return {overflowY:cs.overflowY, scrolls:m.scrollHeight>m.clientHeight, menuH:Math.round(r.height), vh:innerHeight, lastReachable: last.getBoundingClientRect().top < innerHeight || m.scrollHeight>m.clientHeight,
        ctaCentred: (()=>{const a=m.querySelector('.nt-btn'); const cs2=getComputedStyle(a); return cs2.justifyContent;})(), ctaW: Math.round(m.querySelector('.nt-btn').getBoundingClientRect().width), menuW: Math.round(r.width)};});
    if (!(d.overflowY==='auto'||d.overflowY==='scroll')) note(`${w}x${h} drawer`, `overflow-y=${d.overflowY}`);
    if (!d.lastReachable) note(`${w}x${h} drawer`, `last link unreachable (menu ${d.menuH}px, viewport ${d.vh}px, scrolls=${d.scrolls})`);
    if (d.ctaCentred!=='center') note(`${w}x${h} drawer`, `CTA justify-content=${d.ctaCentred} (text not centred in stretched button), width ${d.ctaW}/${d.menuW}`);
    if (w===390) await p.screenshot({path:`${OUT}/drawer-390.png`});
    if (w===320) await p.screenshot({path:`${OUT}/drawer-320.png`});
    await p.keyboard.press('Escape');
  }
  await ctx.close();
}
await b.close();
console.log(issues.length? issues.join('\n') : 'No issues across '+ROUTES.length+' routes x '+VIEWPORTS.length+' viewports');
