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

The site presents **two offerings, kept deliberately separate**: the licensed
advisory practice and the software platform. That separation is load-bearing —
see "Positioning" below before editing copy.

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/advisory/` | The licensed practice: Corporate Tax, accounting and reporting, AML/compliance |
| `/platform/` | Platform overview |
| `/platform/corporate-tax/` | Corporate Tax Engine + free browser-side estimator |
| `/platform/fs-studio/` | FS Studio (IFRS financial statements) |
| `/platform/client-portal/` | Client Portal |
| `/services/` | Platform implementation, remediation, automation, support |
| `/about/` | Positioning, beliefs, boundaries |
| `/insights/` | Index + three articles |
| `/contact/` | Enquiry form → `/api/contact` |
| `/privacy/`, `/terms/` | Legal |
| `/404.html` | Not found |

The `/advisory/` page carries `#corporate-tax`, `#accounting` and `#compliance`
anchors, linked from the nav flyout and the footer. If you rename or remove a
practice area, update `NAV` and `FOOTER_NAV` in `src/consts.ts` to match.

### Positioning — read before editing copy

NUMARATECH is a **licensed accounting and tax consultancy** (registered as
NUMARATECH FOR ACCOUNTING AND TAX CONSULTANTS) **and** the builder of the
platform. The site never says we don't advise — we do, under a signed
engagement letter. What it says instead is that *nothing on the website* is
advice and that reading it creates no advisory relationship.

Getting this distinction wrong in either direction is a real problem, so if you
touch this copy, keep all four of these true:

- `/advisory/` presents a practice that takes engagements and forms judgements.
- `/terms/` disclaims advice **through the website**, not advice as such, and
  states that an advisory relationship begins only on a signed engagement letter.
- `/about/` "Boundaries" says what we genuinely are not — your auditor, a law
  firm, an advice channel on this website, a replacement for your ledger — and
  does *not* claim we give no advice.
- `/services/` is platform implementation, distinct from advisory, and
  cross-links to `/advisory/` so neither audience lands in the wrong place.

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

There are **two** calculators, and they are intentionally different things.

### 1. The free on-site estimator

`/platform/corporate-tax/#estimator` runs entirely in the browser. Nothing the
visitor types is transmitted or stored — worth preserving, since it is stated as
a privacy claim on that page, in `/privacy/` and in `/terms/`. It is ungated:
no email required, which is what makes it useful as a credibility demo and for
search.

### 2. The full, gated calculator — configurable

The full tool is hosted outside this site. Its URL is a **single config value**
so you can point it at whichever deployment is current (the Base44 build, your
Cloudflare build, or anything later) without touching page markup.

In `src/consts.ts`:

```ts
export const CALCULATOR = {
  url: 'https://numaratech.base44.app', // ← swap to your Cloudflare URL
  label: 'Open the full Corporate Tax calculator',
  note: 'Handles free zone qualifying income, groups, loss relief …',
  gated: true,   // appends a line warning it asks for contact details
} as const;
```

- Change `url` to move every link to the full calculator site-wide.
- Set `url` to `''` to **hide every link to it** — the block disappears
  entirely and the free estimator carries on working. Useful if the external
  tool is down or being migrated.
- `gated: false` drops the "Asks for your details before showing results" line.

Links render through `hasCalculator()`, so an empty URL never produces a dead
link.

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
- [ ] `CALCULATOR.url` in `src/consts.ts` — currently the Base44 build; switch to
      the Cloudflare one when it is live
- [ ] **Legal review of `/privacy/` and `/terms/`**, and the `updated` date in
      each. These now describe a *licensed practice*, which raises the stakes:
      the advice disclaimer, the engagement-letter language and the statement
      that we are not your statutory auditor all need a professional read. They
      are drafted to be accurate about how the site behaves, but no lawyer has
      seen them.
- [ ] Confirm the `/advisory/` practice-area lists match what you are actually
      licensed and staffed to deliver — particularly the AML/goAML and Economic
      Substance/UBO items, which I inferred from your DNFBP registration work
      rather than from a service list you gave me
- [ ] Confirm the illustrative figures on `/platform/fs-studio/` and
      `/platform/client-portal/` read acceptably as illustrations — they are
      labelled as such and describe no real entity.
- [ ] Add an Open Graph share image (`og:image`) in `src/layouts/Base.astro` if
      link previews matter.

## Note on the brand source

`BRAND.md` was not present in the `numaratech-brand` skill folder when this site
was built — only `SKILL.md` synced, and a filesystem-wide search found no copy.
The Notion "Numaratech brand guide" page and the "Numaratech Stamp / Sign" page
are both blank, and Drive has nothing either.

So the rules from `SKILL.md` were applied in full — spelling, no
rounding/shadows/gradients/cards, the 16px input floor, `tabular-nums` figures,
one solid navy element per view, print as a first-class output — but these were
**derived rather than taken from the brand document**:

- the navy and teal hex values
- the type stack (Inter + JetBrains Mono)
- the spacing and type scales
- the specific print measurements that `SKILL.md` §7 refers to but does not
  reproduce

Reconcile the token block in `src/styles/global.css` against `BRAND.md` when it
exists. Because every colour literal is confined to that one block, swapping the
palette is a single edit. The two unavoidable exceptions are the `theme-color`
meta tag in `src/layouts/Base.astro` (a meta tag cannot read a custom property)
and `public/favicon.svg` (a standalone file) — both are commented as such.
