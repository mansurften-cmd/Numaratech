# LAUNCH — moving to numaratech.com

Ordered. Each step says how to know it worked. Do not skip step 0.

The site is currently **deliberately unindexable**: `robots.txt` disallows
everything and `_headers` sends `X-Robots-Tag: noindex, nofollow`. That is
correct while the real domain does not exist — see step 5 for why removing it
early is the expensive mistake.

---

## 0. Before you start

- [ ] `git pull origin main` — work from the current tree.
- [ ] `npm run build && npm run check:headers` — both clean before you change anything.
- [ ] Decide the canonical host: **apex** (`numaratech.com`) or **www**. This
      document assumes apex, with `www` redirecting to it. Changing your mind
      later means redoing steps 4 and 9.

---

## 1. Purchase and DNS

- [ ] Register `numaratech.com`.
- [ ] Add the zone in Cloudflare and move the nameservers at the registrar.
- [ ] Wait for the zone to show **Active** in the Cloudflare dashboard.

**Verify:** `dig +short NS numaratech.com` returns Cloudflare nameservers.

---

## 2. Workers custom domain

- [ ] Cloudflare dashboard → Workers & Pages → `numaratech-website` → Settings
      → Domains & Routes → **Add** → Custom domain → `numaratech.com`.
- [ ] Add `www.numaratech.com` as a second custom domain (step 9 redirects it).
- [ ] Wait for the certificate to issue.

**Verify:** `curl -sI https://numaratech.com/` returns `200`, and the response
body is the site rather than a Cloudflare error page.

> Custom domains on Workers issue their own certificate and route directly to
> the Worker. Do not add a separate DNS record by hand — the custom domain
> creates it.

---

## 3. Flip the origin — one edit

- [ ] In `site.config.mjs`, change `SITE_ORIGIN` to `https://numaratech.com`.

That is the whole change. `astro.config.mjs`, `src/consts.ts` (`SITE.url`) and
`src/pages/robots.txt.ts` all import it, so canonicals, `og:url`, `og:image`,
every sitemap `<loc>` and the JSON-LD `url` follow, and `IS_TEMPORARY_HOST`
flips `robots.txt` from `Disallow: /` to `Allow: /` on its own.

**Verify locally before pushing:**

```
npm run build
grep -r "workers.dev" dist/ | grep -v "^Binary"   # must return nothing
cat dist/robots.txt                                # must say Allow: /
grep -o '<link rel="canonical"[^>]*>' dist/about/index.html
```

This exact sequence was rehearsed on 14 August 2026 and all four outputs were
correct.

---

## 4. Remove the pre-launch indexing block

- [ ] `robots.txt` — nothing to do. Step 3 already switched it. Confirm
      `dist/robots.txt` reads `Allow: /`.
- [ ] `public/_headers` — delete these two lines from the `/*` block:

```
  # Temporary host — see public/robots.txt. Remove on launch to the real domain.
  X-Robots-Tag: noindex, nofollow
```

- [ ] Leave every other header exactly as it is.

**Verify:** `npm run build && npm run check:headers` still passes, and
`grep -i x-robots dist/_headers` returns nothing.

---

## 5. Keep the workers.dev origin permanently unindexable

**Do not skip this.** `numaratech.mansurften.workers.dev` keeps serving after
launch. If it is indexable it competes with the real domain for the same
content, and duplicate-content dilution is far harder to unpick than to
prevent.

Options, best first:

- [ ] **Disable the workers.dev route entirely** — dashboard → Worker →
      Settings → Domains & Routes → disable `workers.dev`. Nothing to
      maintain, nothing to leak.
- [ ] If you want to keep it reachable for testing, add a `_headers` rule that
      applies `X-Robots-Tag: noindex` only on that hostname, or return a 301
      to the apex (step 9).

**Verify:** `curl -sI https://numaratech.mansurften.workers.dev/` returns 404,
301, or a `noindex` header — not a plain 200.

---

## 6. Deploy

- [ ] Commit and push to `main`. Cloudflare builds and deploys automatically.
- [ ] Watch the build log to completion.

**Verify:** `curl -s https://numaratech.com/ | grep -o "<title>[^<]*"` shows
the real title.

---

## 7. Verify the headers on the live host

This is the check that could not be run from the build sandbox.

```
curl -sI https://numaratech.com/ | grep -iE \
  'content-security|strict-transport|x-content-type|x-frame|referrer|permissions|cross-origin|cache-control'
```

- [ ] Seven security headers present.
- [ ] **No** `X-Robots-Tag`.
- [ ] HTML shows `max-age=0, must-revalidate`.
- [ ] `curl -sI https://numaratech.com/_astro/<any-hashed-file>` shows `immutable`.
- [ ] Optionally run https://securityheaders.com against the domain.

---

## 8. Verify canonicals, sitemap and structured data

- [ ] `curl -s https://numaratech.com/sitemap.xml | grep -c "<loc>"` → **18**.
- [ ] Every `<loc>` is `https://numaratech.com/...` with a trailing slash.
- [ ] `curl -s https://numaratech.com/about/ | grep canonical` → the apex, not workers.dev.
- [ ] Paste the homepage and one insight post into
      https://validator.schema.org — expect `AccountingService` on every page,
      `BreadcrumbList` on every non-home page, `Article` on the three posts.
- [ ] Re-run `node scripts/check-headers.mjs` against the built output.

---

## 9. Redirects

- [ ] `www.numaratech.com` → `https://numaratech.com` (301). Cloudflare
      dashboard → Rules → Redirect Rules, or a bulk redirect.
- [ ] If you kept the workers.dev route in step 5, 301 it to the apex.
- [ ] Check `public/_redirects` still holds the Client Portal 301s from the
      earlier build — those must survive the move.

**Verify:** `curl -sI https://www.numaratech.com/` → `301` with
`location: https://numaratech.com/`.

---

## 10. Search Console

Only now, once every URL the crawler can reach is the final one.

- [ ] Add `numaratech.com` as a **Domain** property (covers apex and www).
- [ ] Verify by DNS TXT — Cloudflare makes this a one-record change.
- [ ] Submit `https://numaratech.com/sitemap.xml`.
- [ ] Use the URL Inspection tool on the homepage → "Request indexing".
- [ ] Check Coverage after ~48 h: expect 18 valid, 0 "blocked by robots.txt".

---

## 11. Social cards

- [ ] https://developers.facebook.com/tools/debug/ → scrape `https://numaratech.com/`.
- [ ] https://www.linkedin.com/post-inspector/ → same.
- [ ] Expect a 1200×630 navy card with the wordmark and the page headline.

These could not be checked pre-launch: neither tool can reach a host that
returns `noindex` and `Disallow: /`.

---

## 12. Post-launch

- [ ] Update `SITE.email` if `hello@numaratech.com` moves to the new domain's mail.
- [ ] Set the Web3Forms access key in `src/consts.ts` if you want the contact
      form back — `/contact/` currently offers email and telephone only.
- [ ] Review `PDPL-DRAFT.md` and apply the privacy notice revisions.
- [ ] Work through `AUDIT-LOCAL.md`, starting with findings 1 and 2.
- [ ] Remove the `noindex` reminder comments in `src/consts.ts` and
      `site.config.mjs` once they no longer apply.

---

## Rollback

If anything is wrong after step 6, revert `SITE_ORIGIN` in `site.config.mjs`,
restore the `X-Robots-Tag` line in `public/_headers`, and push. The site
returns to the workers.dev origin, unindexed, in one deploy. Nothing else in
the tree depends on the domain.
