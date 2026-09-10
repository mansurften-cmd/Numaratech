# Verification harness

Every script here found at least one real bug that reading the code missed.
They run against the built `dist/`, served **with the production CSP** from
`public/_headers` — a plain static server hides exactly the class of bug that
once blanked the live site (inline scripts refused by `script-src 'self'`).

```
npm run build
npm run verify:serve &          # dist/ on :4322 with the real CSP
npm run verify                  # 45 browser checks
npm run verify:snapshot before.json   # then change CSS, rebuild, and …
npm run verify:snapshot after.json    # … diff the two files
```

In the build sandbox Playwright is only installed globally:
`PLAYWRIGHT_PKG=/opt/node22/lib/node_modules/playwright CHROMIUM_PATH=/opt/pw-browsers/chromium-1194/chrome-linux/chrome npm run verify`

| Script | Checks |
|---|---|
| `verify.mjs` | CSP violations on all routes · print media on both calculators · dropdown ARIA, Escape, hit-test and hover-intent path · hero extrude ghost/solid line parity at three widths · button hover on both grounds and no clipping · both calculator live regions and range `aria-valuetext` · CT calculator SSR/CSR parity and correctness · **home hero console ↔ estimator: SSR == CSR on the demo entity, either slider re-runs the other, estimate mode** · **the drawing: frame corners finish at 24px, copy and console never overlap or overflow, typed lines end fully revealed, all static under reduced motion** · mobile drawer · text contrast against walked-up backgrounds on 19 routes · every internal link and anchor |
| `snapshot.mjs` | Computed-style fingerprint of every element, screen + print, 1280 + 390px. Diff two runs to prove a CSS change is a no-op. Media is set before navigation and animations are frozen — without that the diff is nondeterministic. |
| `mobile-sweep.mjs <outdir>` | 19 routes × 8 viewports (320 → 1024, plus landscape phone): horizontal overflow, clipped text, failed asset loads, console errors, drawer scrolls and its CTA is centred; full-page screenshots at 390px. Found the iPad nav overflow. |
| `nav-breakpoint.mjs <outdir>` | 14 widths: no overflow; drawer below 1000px; one-line desktop nav at 1000px and above; iPad drawer opens on tap; viewport crops of the risky sections. |
| `serve-with-csp.py` | `dist/` on a port with the `Content-Security-Policy` header parsed out of `public/_headers`. |

`scripts/check-headers.mjs` (`npm run check:headers`) resolves `_headers` the
way Cloudflare does and asserts 41 things about the result.
