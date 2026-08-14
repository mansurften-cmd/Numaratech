# Privacy notice — proposed revisions (A12)

**Status: draft. Not applied to `src/pages/privacy.astro`.** Legal text should
not be published without you reading it. Approve, amend or reject each block
below and I will apply it.

---

## 1. The data residency sentence has to change, or the config does

`src/pages/privacy.astro:93` currently says:

> Client data processed under a services agreement is hosted in the United
> Arab Emirates region unless we have agreed otherwise with you in writing.

**Finding:** `wrangler.toml` sets no jurisdiction restriction — no
`jurisdiction`, no placement or region constraint of any kind. Cloudflare
Workers static assets are served from the global edge by default.

Two things are true and worth separating:

- The **website** holds no client data. It is static, has no backend, no form,
  no database and no storage binding. So the sentence is not describing this
  repo.
- The sentence is therefore describing **a system that is not in production**.
  Both platform products are private beta (A2). Whatever hosting they
  eventually use is where this claim will have to be true.

So this is not currently a false statement about the website — but it is an
unverifiable one, and it is the kind of claim a client will rely on. Either
constrain the hosting and keep the sentence, or soften it until you have.

**Proposed replacement:**

> **Where it is held**
>
> This website holds no client data. It is a static site with no database and
> no server-side processing, and the Corporate Tax estimator runs entirely in
> your browser.
>
> Data you send us by email is held in our mailbox and may be processed
> outside the United Arab Emirates by that provider. Where we process client
> data under a signed services agreement, the hosting location is set out in
> that agreement — ask us before you sign if the location matters to you, and
> we will confirm it in writing.

That is defensible today and does not depend on infrastructure you have not
built yet.

---

## 2. The PDPL is never named

The notice describes rights that broadly track the PDPL but never cites it,
which makes it hard for a reader to check the claim against the law.

**Proposed addition, as a new opening paragraph under "Your rights":**

> This notice is written to meet UAE Federal Decree-Law No. 45 of 2021 on the
> Protection of Personal Data (the PDPL) and its implementing decisions. Where
> the PDPL gives you a right that this notice does not mention, you still have
> it.

**Also worth adding, under "Why we are allowed to hold it":**

> We process personal data on the bases permitted by Article 4 of the PDPL —
> principally your consent, the performance of a contract with you, and our
> legitimate interests in responding to enquiries and running the practice.
> Where we rely on consent you may withdraw it at any time, and we will stop
> unless another basis applies.

⚠️ **Check before publishing:** I have cited Article 4 as the lawful-basis
article. Confirm the article number against the current consolidated text —
I could not reach FTA or MOJ sources from this environment to verify it, and
an incorrect statutory reference in a published privacy notice is worse than
no reference. If you would rather not cite an article number, drop the words
"Article 4 of" and the paragraph still reads correctly.

---

## 3. No data protection contact is identified

`src/pages/privacy.astro` routes everything to the general mailbox with no
role attached. The PDPL requires a Data Protection Officer only in defined
circumstances (broadly: high-risk or large-scale sensitive processing), which
almost certainly does not apply to a sole establishment — so **do not appoint
one just to have one**. Name a responsible role instead.

**Proposed replacement for the "Your rights" contact sentence:**

> Data protection questions and requests are handled by the practice owner.
> Write to [hello@numaratech.com](mailto:hello@numaratech.com), marked "Data
> protection", and we will respond within 30 days as the PDPL requires.

---

## 4. The complaints route is vague

Currently:

> you may raise it with the relevant data protection authority in your
> jurisdiction.

That tells a UAE resident nothing. The PDPL designates the **UAE Data Office**
(the UAE Data Protection Office, established under Federal Decree-Law No. 44
of 2021) as the supervisory authority.

**Proposed replacement:**

> If we cannot resolve a concern to your satisfaction, you may complain to the
> UAE Data Office, the authority responsible for personal data protection in
> the United Arab Emirates. If you are outside the UAE, you may also complain
> to the data protection authority where you live.

⚠️ **Check before publishing:** confirm the authority's current operating name
and complaints channel. The Data Office's public complaints mechanism has been
slower to stand up than the law itself, and I could not verify its current
status from this environment. If there is no live complaints channel, say so
plainly rather than pointing people at a door that does not open.

---

## 5. Free-zone caveat, if it applies

If you hold or later take a DIFC or ADGM licence, those free zones have their
own data protection regimes (DIFC Data Protection Law No. 5 of 2020; ADGM Data
Protection Regulations 2021) which displace the federal PDPL for entities
established there. You are DET mainland, so the federal PDPL is the right
instrument and no caveat is needed — noted only so the position is on the
record if the licence changes.

---

## What I need from you

1. Approve or amend §1 (residency) — or tell me you want the hosting
   constrained instead, and I will look at what Cloudflare offers.
2. Confirm or drop the Article 4 citation in §2.
3. Confirm the role wording in §3.
4. Confirm the UAE Data Office naming and whether a complaints channel is
   actually live, per §4.

None of this is applied until you say so.
