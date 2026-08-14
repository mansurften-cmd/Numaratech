# AUDIT-LOCAL — findings requiring repository and browser access

Completed 14 August 2026 against commit `bc6ace5`, after the Part A fixes.
Every check was run; nothing here is estimated or inferred from reading.

**Nothing in this file has been fixed.** Part B was scoped as report-only.
Findings 1 and 2 are the two I would fix first.

---

## Findings

| # | Severity | Area | Finding | file:line | Impact | Fix | Effort |
|---|---|---|---|---|---|---|---|
| 1 | **High** | Print | Print stylesheet hides `.nt-site-header`, `.nt-site-footer`, `.nt-nav-toggle` — all three are System A class names that the 2a rebuild renamed and no longer exist in the markup | `src/styles/global.css:1180–1186` | "Print this computation" and "Print this working" produce a document carrying the full site navigation, footer and legal strip. The advertised feature is broken on both calculator pages | Replace the dead selectors with `.nt-header, .nt-footer, .nt-legal, .nt-burger` | 5 min |
| 2 | **High** | A11y | Calculator outputs are not in an `aria-live` region | `src/pages/platform/corporate-tax.astro:183`, `src/pages/business-case.astro`, `src/pages/index.astro:120` | A screen reader user changes an input and hears nothing. The figures update silently, so the calculators are unusable non-visually | Wrap each output table in `aria-live="polite" aria-atomic="true"` | 15 min |
| 3 | Medium | Motion | `prefers-reduced-motion` disables `.nt-grid` but not `.nt-pulse`, which keeps animating | `src/styles/nt-2a.css:59` (rule), `:164` (animation) | Users who asked for reduced motion still get a pulsing indicator on every hero strip and in the CT mockup | Add `.nt-pulse` to the existing reduced-motion block | 2 min |
| 4 | Medium | A11y | Desktop nav dropdowns are CSS-only (`:hover`/`:focus-within`) with no `aria-expanded` and no button semantics | `src/components/Nav.astro:23–34` | Screen reader users get no indication that Advisory and Platform have submenus or that they have opened. Keyboard access works; the announcement does not | Promote the parent to a `<button aria-expanded>` and reuse the drawer's script | 30 min |
| 5 | Medium | A11y | Range inputs have labels but no `aria-valuetext` | `src/pages/index.astro:104`, `src/pages/business-case.astro` | A screen reader announces "1500000", not "AED 1,500,000" — a bare number in a currency field | Set `aria-valuetext` from the same formatter the visible output uses | 10 min |
| 6 | Medium | Deps | `npm audit`: 2 high in the production tree, 5 total including dev — `js-yaml` (quadratic CPU in `!!omap`, `<4.3.1`), `nanoid` (infinite loop, `<3.3.18`), `undici`, `miniflare`, `wrangler` | `package-lock.json` | All are build-time transitive dependencies of Astro's toolchain and the Wrangler CLI. **None ship to the browser** — this is a static site whose only client JS is the 6.5 KB it authors itself. Real exposure is limited to the build container | `npm audit fix`, then re-run the build and the verification scripts | 15 min |
| 7 | Medium | Deps | Behind current: `astro` 7.1.6 → 7.2.2, `wrangler` 4.115.0 → 4.123.0, `typescript` 6.0.3 → 7.0.2 | `package.json` | Missing fixes; the TypeScript jump is a major version and needs its own check | Take Astro and Wrangler now; schedule TypeScript separately | 30 min |
| 8 | Low | A11y | Targets below 24×24 (WCAG 2.2 AA 2.5.8), excluding inline prose links: footer and legal links (~`60×17` to `162×18`), the range inputs (`16 px` and `20×20` high), `button.nt-arrow-link` (`204×23`) | `/terms/`, `/privacy/`, `/contact/`, `/`, `/platform/corporate-tax/` | Harder to hit accurately, particularly on touch. Most are in the footer rather than the primary task flow | Raise line-height/padding on footer link lists; give the range inputs a taller hit area | 45 min |
| 9 | Low | A11y | Skip link is 43 px high — 1 px under the 44 px target | `src/styles/nt-2a.css` (`.nt-skip`) | Passes AA (24×24); misses AAA 2.5.5 by one pixel | Add 1 px padding | 1 min |
| 10 | Low | Security | CSP still allows `api.web3forms.com` in `connect-src` and `form-action` although no form exists after A3 | `public/_headers` | Unused permitted origin. Left deliberately — removing it breaks the form the moment an access key is added | Remove if the form is not coming back; otherwise leave | 2 min |
| 11 | Low | Maint | `.nt-stage--live` now renders the text "private beta" | `src/pages/index.astro:66`, `src/styles/nt-2a.css` | Class name contradicts its content; misleads the next person to read it | Rename to `.nt-stage--built` | 10 min |
| 12 | Low | Layout | The arrow in "Print this computation" wraps to a second line | `src/pages/platform/corporate-tax.astro:233` | Cosmetic; the button is taller than it should be | `white-space: nowrap` on the button | 2 min |
| 13 | Low | Maint | Two design systems ship on every page: `global.css` (System A) and `nt-2a.css` (2a), 46.7 KB of CSS combined | `src/layouts/Base.astro:13–14` | Finding 1 is a direct symptom — print rules were left behind pointing at classes the rebuild renamed. Several contrast fixes are also patches that exist only to out-specify `global.css` | Delete the dead half of `global.css`; keep `.nt-prose`, the form primitives, `.nt-table`, `@font-face` and the print block | 3–4 h |

---

## Checks that passed

| Area | Result |
|---|---|
| **B1 Build** | `astro build` clean, 19 pages. `astro check` — **0 errors, 0 warnings, 0 hints** across 40 files. (It reported 4 errors on first run, all `Cannot find name 'Buffer'` in the new `src/og.ts`; fixed by adding `@types/node` and `compilerOptions.types` before this table was written.) |
| **B2 Secrets** | No `.env` or key files tracked. No token-shaped strings in any tracked file. No credentials in `wrangler.toml` — no `account_id`, no `api_token`. `.gitignore` covers `.env` and `.env.*`. |
| **B3 Headers** | All seven security headers present on every page. HSTS is `max-age=63072000; includeSubDomains; preload`. CSP contains `base-uri 'self'`, `form-action`, `object-src 'none'`, `frame-ancestors 'none'`, and `script-src 'self'` with no `unsafe-inline` or `unsafe-eval`. `_astro/*` and `fonts/*` are `immutable`; HTML is `max-age=0, must-revalidate`. Verified by `npm run check:headers` (41 assertions) and by loading the site under the real CSP in Chromium — 0 violations. Note: the HTML cache rule was `/*.html`, which matched nothing; fixed in Phase 0 T-007. |
| **B4 Assets** | 19 HTML (306 KB total, largest 23.2 KB), 46.7 KB CSS, **6.5 KB JS across 4 files**, 70 KB fonts. OG cards total 633 KB but are fetched only by social crawlers, one per share — never by a visitor. |
| **B4 Fonts** | Correctly subset. Both faces carry `unicode-range` limited to Latin + punctuation, and both set `font-display: swap`. No full Unicode set is shipped. |
| **B5 Focus** | Visible focus ring on the first 12 tabbables. Desktop dropdowns are reachable and open on focus (the gap is announcement, not access — finding 4). |
| **B6 Motion** | `.nt-grid` animation correctly disabled under `prefers-reduced-motion`. The hero extrude is a **static** offset with no animation, so leaving it is correct — it is not motion. `.nt-pulse` is the one real gap (finding 3). |
| **B7 Responsive** | **No horizontal overflow on any of the 18 routes at 375, 768, 1280 or 1920 px.** No clipped text found. |
| **B9 Links** | **337 internal links and anchors checked across 18 routes — all resolve.** `/platform/#roadmap` included. |

---

## Not verifiable from here

- **Live response headers.** The sandbox egress policy returns 403 on CONNECT to `numaratech.mansurften.workers.dev`, so I can prove `_headers` resolves correctly but not that Cloudflare emits it. One `curl -sI` from your machine closes this.
- **Lighthouse.** Not run. No score is quoted anywhere in this document.
- **Real-world social card rendering.** Cards are generated and every page references one that exists, but Facebook's and LinkedIn's debuggers cannot reach a `noindex`, `Disallow: /` host. Re-check after launch.
