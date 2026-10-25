# Verification harness

Every script here found at least one real bug that reading the code missed.
They run against the built `dist/`, served **with the production CSP** from
`public/_headers` — a plain static server hides exactly the class of bug that
once blanked the live site (inline scripts refused by `script-src 'self'`).

```
npm run build
npm run verify:serve &          # dist/ on :4322 with the real CSP
npm run verify                  # 50 browser checks
npm run verify:snapshot before.json   # then change CSS, rebuild, and …
npm run verify:snapshot after.json    # … diff the two files
```

In the build sandbox Playwright is only installed globally:
`PLAYWRIGHT_PKG=/opt/node22/lib/node_modules/playwright CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run verify`

| Script | Checks |
|---|---|
| `verify.mjs` | CSP violations on all routes · print media on both calculators · dropdown ARIA, Escape, hit-test and hover-intent path · hero extrude ghost/solid line parity at three widths · button hover on both grounds and no clipping · both calculator live regions and range `aria-valuetext` · CT calculator SSR/CSR parity and correctness · **home hero console ↔ estimator: SSR == CSR on the demo entity, either slider re-runs the other, estimate mode** · **the drawing: frame corners finish at 24px, copy and console never overlap or overflow, typed lines end fully revealed, all static under reduced motion** · mobile drawer · text contrast against walked-up backgrounds on every route · every internal link and anchor |
| `verify.mjs`, added 17 October 2026 | **axe-core** WCAG 2.2 AA on every route at 1280 and 390px (with the label-in-name rule Lighthouse enables) · phone nav keeps its collapsed shape before any script runs, with both fallbacks (JavaScript off; script blocked → links after 4s) · **no layout shift** on a throttled phone (6× CPU, slow network, 3 pages × 3 loads) |
| `verify.mjs`, added 25 October 2026 | **Small Business Relief rules**: 14 cases on `src/lib/sbr.ts` (AED 3,000,000 exactly vs one dirham over, the cumulative earlier-period test, 31 December 2029 vs 1 January 2030, before the regime, each exclusion, incomplete answers, a failure outranking open questions) plus the loss-forfeit note — imported straight into Node · the SBR page end to end (blank, available, not available, clear, live region) · the About profile (photo loads, AVIF source, Person JSON-LD, organisation's `founder` by the same `@id`) · article bylines (`rel="author"`, Article `author` is the Person) · WhatsApp links are plain `wa.me` links with no third-party script. Routes: 24. |
| `verify.mjs`, added 25 October 2026 (later) | **Fixed fees from one source**: every amount on a dedicated service page appears on `/fees/`, each is a schema.org `Offer`, each page has a `FAQPage`, no `{fee:}` token is left unfilled, and `/advisory/tax/` links its four dedicated pages. Routes: 36. |
| `snapshot.mjs` | Computed-style fingerprint of every element, screen + print, 1280 + 390px. Diff two runs to prove a CSS change is a no-op. Media is set before navigation and animations are frozen — without that the diff is nondeterministic. |
| `mobile-sweep.mjs <outdir>` | every route (36) × 8 viewports (320 → 1024, plus landscape phone): horizontal overflow, clipped text, failed asset loads, console errors, drawer scrolls and its CTA is centred; full-page screenshots at 390px. Found the iPad nav overflow. |
| `nav-breakpoint.mjs <outdir>` | 14 widths: no overflow; drawer below 1000px; one-line desktop nav at 1000px and above; iPad drawer opens on tap; viewport crops of the risky sections. |
| `serve-with-csp.py` | `dist/` on a port with the `Content-Security-Policy` header parsed out of `public/_headers`. |

`scripts/check-headers.mjs` (`npm run check:headers`) resolves `_headers` the
way Cloudflare does and asserts 41 things about the result.

## Fast checks (no browser)

`npm test` — type check, build, the 41 header assertions, and `html-validate`
on every built page. A GitHub Actions workflow that runs the same on every push
is written and saved as `scripts/ci/checks.yml`; it takes effect once copied to
`.github/workflows/ci.yml` (see the note at the top of that file).

## Performance

Measured with Lighthouse 12 against the CSP server, mobile emulation
(simulated slow 4G, 4× CPU) and desktop. 17 October 2026, after this pass:
performance 99–100 on every page tested, accessibility 100, best practices
100, total blocking time 0 ms, layout shift 0. SEO reads 66 only because the
pre-launch `noindex` is in force — expected until launch.
