# NUMARATECH — website

Corporate website for NUMARATECH: finance and compliance infrastructure for UAE
business. Built with [Astro](https://astro.build) as a fully static site and
deployed to Cloudflare Pages.

```
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview  # serve dist/ locally
npm run check    # astro check — type and template diagnostics
```

---

## Deploying to Cloudflare Pages

### 1. Connect the repository

Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect
to Git**, then pick this repository and branch.

### 2. Build settings

| Setting | Value |
| --- | --- |
| Framework preset | Astro |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Node version | 20 or later (set `NODE_VERSION=20` if the default is older) |

No adapter is needed. `output: 'static'` produces plain files, and the contact
endpoint is a Pages Function rather than a server-rendered route.

### 3. Set the production hostname

`site` in `astro.config.mjs` is `https://numaratech.com`. It drives canonical
URLs, Open Graph tags and `sitemap.xml`. **Change it before the first deploy** —
a wrong value silently publishes canonical tags pointing at a domain you do not
control. Then update the `Sitemap:` line in `public/robots.txt` to match.

### 4. Environment variables for the contact form

`functions/api/contact.js` sends enquiries through [Resend](https://resend.com).
Add these in **Settings → Environment variables**, as **secrets**, for both the
production and preview environments:

| Variable | Example | Notes |
| --- | --- | --- |
| `RESEND_API_KEY` | `re_…` | Store as a secret, never in the repo |
| `CONTACT_TO` | `hello@numaratech.com` | Mailbox receiving enquiries |
| `CONTACT_FROM` | `NUMARATECH <site@numaratech.com>` | Must be a verified sender domain in Resend |

Until all three are set the endpoint returns `503` and the form tells the
visitor to email directly. That is deliberate — better a clear fallback than
silently dropping enquiries.

Using a different provider? Replace the single `fetch` call to
`api.resend.com` in `functions/api/contact.js`. Everything around it —
validation, honeypot, length caps, error handling — is provider-agnostic.

### 5. What the deployment config files do

| File | Purpose |
| --- | --- |
| `public/_headers` | CSP and security headers; immutable caching for fonts and hashed assets |
| `public/_routes.json` | Restricts Functions to `/api/*` so static pages are served from the edge without invoking a worker |
| `public/robots.txt` | Crawl policy and sitemap pointer |
| `src/pages/sitemap.xml.ts` | Generates `sitemap.xml` at build time |

The CSP in `_headers` allows **no third-party origins**. If you later add
analytics, an embedded map or any external script, that policy must be widened
or the resource will be blocked.

---

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/platform/` | Platform overview |
| `/platform/corporate-tax/` | Corporate Tax Engine + free browser-side estimator |
| `/platform/fs-studio/` | FS Studio (IFRS financial statements) |
| `/platform/client-portal/` | Client Portal |
| `/services/` | Implementation, remediation, automation, support |
| `/about/` | Positioning, beliefs, boundaries |
| `/insights/` | Index + three articles |
| `/contact/` | Enquiry form → `/api/contact` |
| `/privacy/`, `/terms/` | Legal |
| `/404.html` | Not found |

---

## The design system

`src/styles/global.css` is the whole system, and the **only** file permitted to
contain a colour literal. Everything else references a token. It implements the
NUMARATECH brand rules:

- Thin navy and teal rules on white. No rounded corners, shadows, gradients or
  cards. `border-radius: 0` is enforced on `*` so a stray component cannot
  reintroduce rounding.
- **One solid navy element per view, maximum** — normally the primary button.
  `CtaBand` takes a `primary` prop for this: the home page spends its one navy
  element on the hero, so its band passes `primary={false}`.
- Inputs are never below `16px`, which is the threshold at which iOS Safari
  zooms on focus and breaks the layout.
- Figures use `tabular-nums`, are right-aligned and never wrap (`.nt-fig`).
- Print is a first-class output — see below.

Contrast ratios against white are recorded in a comment beside every colour
token. `--nt-teal-500` is 3.00:1 and is marked **decorative**: rules, marks and
text on navy only, never text on white. Use `--nt-teal-700` (5.68:1) for accent
text.

### The "futuristic" device

The brief asked for a futuristic feel; the brand forbids gradients, glows and
shadows. The resolution is technical-instrument precision rather than neon: a
hairline drafting grid (`.nt-field` / `.nt-field__rules`), crosshair
registration marks (`.nt-mark`), monospace micro-labels with numeric section
indices, and thin SVG line diagrams. Every one of those is built from 1px
rules, so nothing breaks a brand rule.

The grid is constrained to the content field width and centred, so its rules
land on the same column edges as the type. A grid that does not align to the
type reads as noise.

### Print

`@media print` remaps the tokens to a single-ink palette, drops the chrome, and
sets break rules so a figure is never orphaned from its label.

Pages that produce a computation print the computation rather than the page. A
control sets `data-print-scope` on `<body>`; the region marked
`data-print-region` survives and everything else in `<main>` is dropped for that
job. See the print button on `/platform/corporate-tax/`.

### Typography

Inter (variable) and JetBrains Mono, both self-hosted from `public/fonts/` and
preloaded. No external font requests, which is what lets the CSP stay strict.

---

## The Corporate Tax estimator

`/platform/corporate-tax/#estimator` runs entirely in the browser. Nothing the
visitor types is transmitted or stored — worth preserving, since it is stated as
a privacy claim on that page, in `/privacy/` and in `/terms/`.

Statutory parameters live in `UAE_CT` in `src/consts.ts`:

| Parameter | Value |
| --- | --- |
| Standard rate | 9% above the zero band |
| Zero band ceiling | AED 375,000 |
| Small Business Relief revenue cap | AED 3,000,000 |
| Regime in force | Financial years beginning on or after 1 June 2023 |

> **These are also duplicated as constants at the top of the inline script in
> `src/pages/platform/corporate-tax.astro`,** because Astro bundles that script
> separately from the page module. If a rate or threshold changes, update both.

The estimator models only the zero band and a Small Business Relief election. It
does not model free zone qualifying income, tax groups, interest limitation,
loss relief, foreign tax credits or transfer pricing — all of which are listed
as exclusions on the page and in `/terms/`.

**Verify these parameters against current Federal Tax Authority guidance before
each release.** They were correct as published at the time of writing, but tax
law changes and this repository is not the authority.

---

## Before going live

Content placeholders that must be replaced with real values:

- [ ] `SITE.phoneDisplay` / `SITE.phoneHref` in `src/consts.ts` — currently
      `+971 4 000 0000`
- [ ] `SITE.address` — currently "Business Bay, Dubai"
- [ ] `SITE.email` — confirm `hello@numaratech.com` exists and is monitored
- [ ] `site` in `astro.config.mjs` and the `Sitemap:` line in `robots.txt`
- [ ] Legal review of `/privacy/` and `/terms/`, and the `updated` date in each.
      Both are drafted to be accurate about how this site actually behaves, but
      they have not been reviewed by a lawyer.
- [ ] Confirm the illustrative figures on `/platform/fs-studio/` and
      `/platform/client-portal/` read acceptably as illustrations — they are
      labelled as such and describe no real entity.
- [ ] Add an Open Graph share image (`og:image`) in `src/layouts/Base.astro` if
      link previews matter.

## Note on the brand source

`BRAND.md` was not present in the `numaratech-brand` skill folder when this site
was built — only `SKILL.md` synced. The rules summarised there were applied in
full, but the exact hex values, type stack and spacing scale in
`src/styles/global.css` were derived rather than taken from the brand document.
Reconcile the token block against `BRAND.md` and adjust; because every colour
literal is confined to that one block, changing them is a single edit.
