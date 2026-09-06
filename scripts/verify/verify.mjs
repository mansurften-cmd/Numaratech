// Playwright resolves from node_modules when installed locally; set
// PLAYWRIGHT_PKG to an absolute path where it is only available globally
// (this project's build sandbox: /opt/node22/lib/node_modules/playwright).
import { createRequire } from 'node:module';
// require() resolves a directory through its package.json; ESM import() does
// not, so a global install path must go through require.
const pw = process.env.PLAYWRIGHT_PKG ? createRequire(import.meta.url)(process.env.PLAYWRIGHT_PKG) : await import('playwright');
const chromium = pw.chromium ?? pw.default?.chromium;
const B = process.env.VERIFY_BASE ?? 'http://127.0.0.1:4322';
const ROUTES = ['/','/advisory/','/advisory/accounting-audit/','/advisory/tax/','/advisory/risk-compliance/','/platform/',
  '/platform/corporate-tax/','/platform/fs-studio/','/services/','/business-case/','/about/','/insights/',
  '/insights/first-corporate-tax-return-what-breaks/','/insights/closing-the-books-in-five-days/',
  '/insights/audit-trail-as-a-design-requirement/','/contact/','/privacy/','/terms/','/404.html'];
const b = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const R = []; const t = (name, ok, d='') => R.push([name, !!ok, d]);

// CSP violations + page errors across every route
{ const p = await b.newPage(); const v = [];
  p.on('console', m => { if (/Content Security Policy|Refused to/i.test(m.text())) v.push(m.text().slice(0,80)); });
  p.on('pageerror', e => v.push('pageerror: ' + e.message.slice(0,80)));
  for (const r of ROUTES) await p.goto(B+r, { waitUntil: 'networkidle' });
  t('no CSP violations / page errors on 19 routes', v.length===0, v.join(' | ')); await p.close(); }

// PRINT: both calculators, print media
{ const p = await b.newPage({ viewport:{width:1280,height:900} });
  for (const r of ['/platform/corporate-tax/','/business-case/']) {
    await p.goto(B+r,{waitUntil:'networkidle'}); await p.emulateMedia({ media:'print' });
    const x = await p.evaluate(() => { const h=s=>{const e=document.querySelector(s); return e?getComputedStyle(e).display==='none':'absent';};
      const dark=document.querySelector('.nt-dark'); return { header:h('.nt-header'), footer:h('.nt-footer'), legal:h('.nt-legal'),
      burger:h('.nt-burger'), masthead: getComputedStyle(document.querySelector('.nt-print-only')).display!=='none',
      grid:h('.nt-grid'), darkBg: dark?getComputedStyle(dark).backgroundColor:'n/a', table: !!document.querySelector('.nt-table') }; });
    t(`print ${r}: header/footer/legal/burger hidden`, x.header===true&&x.footer===true&&x.legal===true&&x.burger===true, JSON.stringify(x));
    t(`print ${r}: masthead shown, table present, grid hidden, dark band white`, x.masthead&&x.table&&x.grid===true&&/255, 255, 255/.test(x.darkBg), x.darkBg);
    await p.emulateMedia({ media:'screen' }); }
  await p.close(); }

// DESKTOP DROPDOWN ARIA
{ const p = await b.newPage({ viewport:{width:1280,height:900} }); await p.goto(B+'/',{waitUntil:'networkidle'});
  const a = await p.evaluate(() => { const l=document.querySelector('.nt-nav__item > a[aria-haspopup]'); return { start:l?.getAttribute('aria-expanded'), controls: !!document.getElementById(l?.getAttribute('aria-controls')||'') }; });
  t('dropdown: aria-expanded=false at rest, aria-controls resolves', a.start==='false'&&a.controls, JSON.stringify(a));
  await p.focus('.nt-nav__item > a[aria-haspopup]');
  const f = await p.evaluate(() => { const l=document.querySelector('.nt-nav__item > a[aria-haspopup]'); const m=document.getElementById(l.getAttribute('aria-controls')); return { exp:l.getAttribute('aria-expanded'), vis:getComputedStyle(m).display!=='none' }; });
  t('dropdown: focus sets aria-expanded=true and menu visible', f.exp==='true'&&f.vis, JSON.stringify(f));
  await p.keyboard.press('Escape');
  const e = await p.evaluate(() => ({ exp:document.querySelector('.nt-nav__item > a[aria-haspopup]').getAttribute('aria-expanded'), focusOnLink: document.activeElement===document.querySelector('.nt-nav__item > a[aria-haspopup]') }));
  t('dropdown: Escape collapses and returns focus to the link', e.exp==='false'&&e.focusOnLink, JSON.stringify(e));
  await p.close(); }

// DROPDOWN IS ACTUALLY ON SCREEN: hit-test the first submenu link. Checking
// display/aria alone passed while the whole menu was clipped by the header.
{ const p = await b.newPage({ viewport:{width:1280,height:900} }); await p.goto(B+'/',{waitUntil:'networkidle'});
  await p.hover('.nt-nav__item > a[aria-haspopup]'); await p.waitForTimeout(200);
  const h = await p.evaluate(() => { const a=document.querySelector('.nt-nav__menu a'); const r=a.getBoundingClientRect();
    const hit=document.elementFromPoint(r.left+12, r.top+r.height/2); return { ok: hit===a || a.contains(hit), got: hit? hit.tagName+'.'+(hit.className+'').split(' ')[0] : 'none' }; });
  t('dropdown: first submenu link is hit-testable when open (not clipped)', h.ok, h.got); await p.close(); }

// HERO EXTRUDE: ghost layers must break lines exactly where the headline does.
{ for (const w of [1280, 1528, 1920]) { const p = await b.newPage({ viewport:{width:w,height:900} });
    for (const r of ['/','/business-case/','/platform/']) { await p.goto(B+r,{waitUntil:'networkidle'});
      const m = await p.evaluate(() => { const rects=el=>{const rg=document.createRange(); rg.selectNodeContents(el); return [...rg.getClientRects()].map(x=>Math.round(x.width)).join(',');};
        return { solid: rects(document.querySelector('.nt-extrude__solid')), ghost: rects(document.querySelector('.nt-extrude__ghost')) }; });
      t(`extrude ${w}px ${r}: ghost line boxes == headline line boxes`, m.solid===m.ghost, `solid[${m.solid}] ghost[${m.ghost}]`); }
    await p.close(); } }

// PRIMARY BUTTON HOVER stays visible on a white ground.
{ const p = await b.newPage({ viewport:{width:1280,height:900} }); await p.goto(B+'/contact/',{waitUntil:'networkidle'});
  // `main` scope: the first a.nt-btn on the page is the nav CTA, which sits on the dark header and inverts.
  const btn = p.locator('main a.nt-btn:not(.nt-btn--ghost)').first(); await btn.scrollIntoViewIfNeeded(); await btn.hover(); await p.waitForTimeout(400);
  const c = await p.evaluate(() => { const a=document.querySelector('main a.nt-btn:not(.nt-btn--ghost)'); const cs=getComputedStyle(a), pb=getComputedStyle(a,'::before');
    return { color: cs.color, border: cs.borderTopColor, wipe: pb.transform, wipeBg: pb.backgroundColor }; });
  t('button hover on white: white text over navy wipe, navy border', c.color==='rgb(255, 255, 255)' && /^(none|matrix\(1, 0, 0, 1, 0, 0\))$/.test(c.wipe) && c.wipeBg==='rgb(11, 47, 90)' && c.border==='rgb(11, 47, 90)', JSON.stringify(c));
  await p.close(); }

// PRIMARY BUTTON HOVER on a dark band inverts to white, so it does not sink
// into the navy ground.
{ const p = await b.newPage({ viewport:{width:1280,height:900} }); await p.goto(B+'/',{waitUntil:'networkidle'});
  const btn = p.locator('.nt-hero a.nt-btn:not(.nt-btn--ghost)').first(); await btn.hover(); await p.waitForTimeout(400);
  const c = await p.evaluate(() => { const a=document.querySelector('.nt-hero a.nt-btn:not(.nt-btn--ghost)'); const cs=getComputedStyle(a), pb=getComputedStyle(a,'::before');
    return { color: cs.color, wipeBg: pb.backgroundColor, border: cs.borderTopColor }; });
  t('button hover on dark: navy text over white wipe, white border', c.color==='rgb(11, 47, 90)' && c.wipeBg==='rgb(255, 255, 255)' && c.border==='rgb(255, 255, 255)', JSON.stringify(c));
  await p.close(); }

// NO BUTTON CLIPS ITS OWN CONTENT (the wipe relies on overflow:hidden).
{ for (const w of [1280, 900]) { const p = await b.newPage({ viewport:{width:w,height:900} });
    const clipped = [];
    for (const r of ['/','/contact/','/platform/corporate-tax/']) { await p.goto(B+r,{waitUntil:'networkidle'});
      for (const sel of ['.nt-nav a.nt-btn', '.nt-hero a.nt-btn', 'main a.nt-btn']) { const el = p.locator(sel).first(); if (!(await el.count())) continue;
        await el.hover(); await p.waitForTimeout(350);
        const c = await el.evaluate(e => ({ sw: e.scrollWidth, cw: e.clientWidth, sh: e.scrollHeight, ch: e.clientHeight }));
        if (c.sw > c.cw + 1 || c.sh > c.ch + 1) clipped.push(`${w}px ${r} ${sel} ${JSON.stringify(c)}`); } }
    t(`buttons: none clip their content on hover at ${w}px`, clipped.length===0, clipped.join(' | ')); await p.close(); } }

// LIVE STATUS + VALUETEXT on both calculators
{ const p = await b.newPage({ viewport:{width:1280,height:900} });
  await p.goto(B+'/platform/corporate-tax/',{waitUntil:'networkidle'}); await p.waitForTimeout(150);
  const s0 = await p.evaluate(() => document.querySelector('[data-live-status]')?.textContent);
  t('CT live status populated on load', /Taxable income AED 1,316,150.*Corporate Tax AED 84,704/.test(s0||''), s0);
  await p.fill('#est-profit','2,000,000'); await p.waitForTimeout(900);
  const s1 = await p.evaluate(() => ({ txt: document.querySelector('[data-live-status]')?.textContent, live: document.querySelector('[data-live-status]')?.getAttribute('aria-live'), atomic: document.querySelector('[data-live-status]')?.getAttribute('aria-atomic') }));
  t('CT live status updates after input settles (aria-live=polite, atomic)', /2,066,150/.test(s1.txt||'')&&s1.live==='polite'&&s1.atomic==='true', JSON.stringify(s1));
  await p.goto(B+'/business-case/',{waitUntil:'networkidle'}); await p.waitForTimeout(150);
  const b0 = await p.evaluate(() => ({ txt: document.querySelector('[data-live-status]')?.textContent, vt: document.querySelector('#bc-reduction')?.getAttribute('aria-valuetext') }));
  t('BC live status populated + range aria-valuetext', /Cost of closing AED [\d,]+\. \d+ hours returned at \d+%/.test(b0.txt||'')&&/35 percent/.test(b0.vt||''), JSON.stringify(b0));
  await p.goto(B+'/',{waitUntil:'networkidle'});
  const h = await p.evaluate(() => document.querySelector('#nt-income')?.getAttribute('aria-valuetext'));
  t('home estimator range aria-valuetext', /AED 1,500,000 taxable income, Corporate Tax AED 101,250/.test(h||''), h);
  await p.close(); }

// CALCULATOR: SSR == CSR and still correct
{ const nojs = await b.newContext({ javaScriptEnabled:false }); const p1 = await nojs.newPage();
  await p1.goto(B+'/platform/corporate-tax/',{waitUntil:'load'});
  const ssr = await p1.evaluate(() => Object.fromEntries([...document.querySelectorAll('[data-out]')].map(e=>[e.dataset.out,e.textContent.trim()])));
  const p2 = await b.newPage(); await p2.goto(B+'/platform/corporate-tax/',{waitUntil:'networkidle'}); await p2.waitForTimeout(200);
  const csr = await p2.evaluate(() => Object.fromEntries([...document.querySelectorAll('[data-out]')].map(e=>[e.dataset.out,e.textContent.trim()])));
  const mism = Object.keys(ssr).filter(k=>ssr[k]!==csr[k]);
  t('CT calculator: server-rendered == post-JS on all outputs', mism.length===0, mism.join(','));
  await p2.fill('#est-profit','2,000,000'); await p2.fill('#est-addbacks','100,000'); await p2.waitForTimeout(250);
  const a = await p2.evaluate(() => ({ taxable: document.querySelector('[data-out=taxable]').textContent.trim(), tax: document.querySelector('[data-out=tax]').textContent.trim() }));
  t('CT calculator: 2,000,000 + 100,000 -> 2,100,000 / 155,250', a.taxable==='2,100,000'&&a.tax==='155,250', JSON.stringify(a));
  await nojs.close(); await p2.close(); }

// REDUCED MOTION
{ const c = await b.newContext({ reducedMotion:'reduce' }); const p = await c.newPage(); await p.goto(B+'/',{waitUntil:'networkidle'});
  const m = await p.evaluate(() => ({ grid:getComputedStyle(document.querySelector('.nt-grid')).animationName, pulse:getComputedStyle(document.querySelector('.nt-pulse')).animationName }));
  t('reduced motion: grid and pulse animations off', m.grid==='none'&&m.pulse==='none', JSON.stringify(m)); await c.close(); }

// MOBILE DRAWER (core behaviours)
{ const p = await b.newPage({ viewport:{width:390,height:780}, hasTouch:true }); await p.goto(B+'/',{waitUntil:'networkidle'});
  const bb = await p.locator('.nt-burger').boundingBox();
  t('mobile: toggle visible, >=44x44, collapsed', !!bb&&bb.width>=44&&bb.height>=44&&await p.locator('.nt-burger').getAttribute('aria-expanded')==='false');
  await p.locator('.nt-burger').click();
  t('mobile: opens, menu visible, scroll locked', await p.locator('.nt-burger').getAttribute('aria-expanded')==='true'&&await p.locator('#nt-menu').isVisible()&&await p.evaluate(()=>getComputedStyle(document.body).overflow==='hidden'));
  const subExp = await p.evaluate(() => [...document.querySelectorAll('.nt-nav__item > a[aria-haspopup]')].every(a=>a.getAttribute('aria-expanded')==='true'));
  t('mobile: inline submenus report aria-expanded=true', subExp);
  await p.keyboard.press('Escape');
  t('mobile: Escape closes and restores scroll', await p.locator('.nt-burger').getAttribute('aria-expanded')==='false'&&await p.evaluate(()=>getComputedStyle(document.body).overflow!=='hidden'));
  const skip = await p.evaluate(()=>Math.round(document.querySelector('.nt-skip').getBoundingClientRect().height));
  await p.close(); t('skip link >= 44px tall', skip>=44, skip+'px'); }

// TEXT CONTRAST across all routes (walked-up backgrounds; skips transparent text)
{ const p = await b.newPage({ viewport:{width:1280,height:900} }); const bad=new Map();
  for (const r of ROUTES) { await p.goto(B+r,{waitUntil:'networkidle'});
    const rows = await p.evaluate(() => { const A=s=>{const m=s.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);return m?Number(m[1]):1;};
      const RGB=s=>{const m=s.match(/\d+(\.\d+)?/g);return m?m.slice(0,3).map(Number):null;};
      const L=c=>{const s=c.map(v=>{v/=255;return v<=.03928?v/12.92:Math.pow((v+.055)/1.055,2.4);});return .2126*s[0]+.7152*s[1]+.0722*s[2];};
      const CR=(a,b)=>{const[x,y]=[L(a),L(b)].sort((m,n)=>n-m);return (x+.05)/(y+.05);};
      const BG=el=>{let n=el;while(n&&n!==document.documentElement){const c=getComputedStyle(n).backgroundColor;if(c&&c!=='transparent'&&A(c)>0)return RGB(c);n=n.parentElement;}return[255,255,255];};
      const out=[]; for (const el of document.querySelectorAll('*')) { const own=[...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()); if(!own) continue;
        const rc=el.getBoundingClientRect(); if(!rc.width||!rc.height) continue; const cs=getComputedStyle(el);
        if(cs.visibility==='hidden'||cs.display==='none'||Number(cs.opacity)===0||A(cs.color)===0) continue;
        const fg=RGB(cs.color), bg=BG(el), size=parseFloat(cs.fontSize), w=Number(cs.fontWeight)||400; const large=size>=24||(size>=18.66&&w>=700);
        const req=large?3:4.5, ratio=CR(fg,bg); if(ratio<req) out.push(`${el.tagName.toLowerCase()}.${(typeof el.className==='string'?el.className:'').split(/\s+/)[0]} ${ratio.toFixed(2)}<${req}`); }
      return out; });
    for (const x of rows) bad.set(x, r); }
  t('text contrast: 0 failing pairs on 19 routes', bad.size===0, [...bad.entries()].slice(0,5).map(([k,v])=>`${v} ${k}`).join(' | ')); await p.close(); }

// LINKS
{ const p = await b.newPage(); const seen=new Set(); const broken=[];
  for (const r of ROUTES) { await p.goto(B+r,{waitUntil:'domcontentloaded'});
    const hrefs = await p.evaluate(()=>[...document.querySelectorAll('a[href]')].map(a=>a.getAttribute('href')).filter(h=>h&&!/^(https?:|mailto:|tel:)/.test(h)));
    for (const h of hrefs) { const u=new URL(h,B+r); if(seen.has(u.href)) continue; seen.add(u.href);
      const res=await p.request.get(u.href).catch(()=>null); if(!res||res.status()>=400){broken.push(`${r} -> ${h}`);continue;}
      if(u.hash){ const html=await res.text(); if(!new RegExp(`id=["']${u.hash.slice(1)}["']`).test(html)) broken.push(`${r} -> ${h} (anchor)`); } } }
  t(`links: all ${seen.size} internal links/anchors resolve`, broken.length===0, broken.slice(0,4).join(' | ')); await p.close(); }

await b.close();
let fails=0; for (const [n,ok,d] of R) { if(!ok) fails++; console.log(`${ok?'PASS':'FAIL'}  ${n}${!ok&&d?'\n        '+d:''}`); }
console.log(`\n${R.length} checks, ${fails} failed`); process.exit(fails?1:0);
