// Case studies. Each has a page at /case-studies/<slug>/ and is linked from
// the service pages it illustrates.
//
// Written 25 October 2026 from the practice's own records in Notion (the
// GrowFactor sub-contracting tasks, the 3 August 2026 meeting notes, the
// Payment Tracker, and the practice's own goAML registration tracker).
// Anonymised: no client, partner or person is named, figures that could
// identify a business are rounded, and dates are given to the month. Only
// outcomes the records show as done are claimed.
//
// Before adding one: the client must not be identifiable, and the
// engagement terms must allow it to be described. Where work came through
// another firm, that firm's agreement is needed too.

export type CaseStudy = {
  slug: string;
  title: string;
  /** One sentence for lists and the meta description (under 160). */
  summary: string;
  /** Who the client was, described without identifying them. */
  client: string;
  service: string;
  /** Dedicated service page this illustrates. */
  serviceHref: string;
  period: string;
  situation: string[];
  work: string[];
  outcome: string[];
  /** The general point — why a reader with a similar business should care. */
  lesson: string;
  /** A tool or article the lesson points to. */
  related?: { label: string; href: string };
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'late-corporate-tax-registrations',
    title: 'Three Corporate Tax registrations, two of them late',
    summary:
      'Three UAE companies needed Corporate Tax registration, two of them past the deadline. All three are registered, with the date that can save the penalty tracked.',
    client: 'Three UAE companies whose owners were not always in the UAE',
    service: 'Corporate Tax registration',
    serviceHref: '/advisory/tax/corporate-tax-registration/',
    period: 'October 2026',
    situation: [
      'Two of the companies had already passed their Corporate Tax registration deadline. The Federal Tax Authority sends one-time passcodes to the registered email address and mobile number, and the owners were not always in the UAE — a number that is switched off or not roaming stops the application dead.',
      'A late registration carries a penalty of AED 10,000. The Federal Tax Authority has waived it where the first Corporate Tax return is filed within seven months of the end of the first tax period, so the late registration was not the end of the matter — the first return date was.',
    ],
    work: [
      'Collected the licence, constitutional documents and owner identification for each company, and confirmed who would be the authorised signatory.',
      'Agreed a time with each owner to receive the passcodes, and kept the number active long enough to complete the application in one sitting.',
      'Submitted each application through the company\u2019s own EmaraTax account, and saved each certificate to the client folder.',
      'Put each company into a single tracker: registration status, certificate, financial year end, and the first-return date that decides whether the penalty can be waived.',
    ],
    outcome: [
      'All three companies registered for Corporate Tax, with certificates on file.',
      'For the two late registrations, the first-return date that decides the waiver is recorded in the tracker, ahead of the ordinary nine-month deadline.',
    ],
    lesson:
      'A missed registration is rarely the most expensive mistake; missing the next date is. If you are registering late, find out when your first return must be filed to keep the waiver open, and work back from it.',
  },
  {
    slug: 'full-return-to-keep-a-loss',
    title: 'Not electing Small Business Relief, to keep a loss',
    summary:
      'A company under the AED 3m threshold could have elected Small Business Relief. It filed a full return instead, and kept a tax loss of about AED 180,000.',
    client: 'A UAE company with revenue under AED 3 million and a loss for the year',
    service: 'Corporate Tax return',
    serviceHref: '/advisory/tax/corporate-tax-return/',
    period: '2026',
    situation: [
      'The company was eligible for Small Business Relief: a simpler return, no Corporate Tax to pay, and no need to prepare a full computation. On the face of it, the cheaper choice.',
      'But it had made a loss of about AED 180,000. A tax loss incurred in a period for which the relief is elected cannot be carried forward. With no tax due either way, electing would have cost the company the loss and saved it nothing.',
    ],
    work: [
      'Tested eligibility for the relief, then set out both options side by side: the relief return, and a full return with the loss computed.',
      'Prepared the full Corporate Tax computation from the financial statements, with the adjustments documented.',
      'Filed the full return, so the loss is recorded and available to set against future taxable income.',
      'Agreed to make the same decision deliberately each year, rather than electing the relief by default.',
    ],
    outcome: [
      'A tax loss of about AED 180,000 carried forward. Once the company is profitable it can reduce taxable income in later years, within the limit the law sets.',
      'A standing rule for this client: relief or full return is decided each period, on the numbers.',
    ],
    lesson:
      'Small Business Relief is optional, and it is not free. If your business is making a loss, check what electing gives up before you elect — our free Small Business Relief Check shows it.',
    related: { label: 'Run the Small Business Relief Check', href: '/platform/small-business-relief-check/' },
  },
  {
    slug: 'vat-registration-after-record-amendment',
    title: 'A VAT registration that had to wait for a record amendment',
    summary:
      'A services company selling abroad needed VAT registration, but its tax record had to be amended first. Both are done, and its exports are zero-rated.',
    client: 'A UAE services company invoicing clients outside the UAE and GCC',
    service: 'VAT registration',
    serviceHref: '/advisory/tax/vat-registration/',
    period: 'June to October 2026',
    situation: [
      'The company needed to register for VAT, and was already late. Its existing tax record on EmaraTax was out of date, and the VAT application could not proceed until the record was amended — an amendment that can take up to 20 business days to approve.',
      'Almost all of its revenue came from clients outside the UAE and GCC, so most of its supplies were likely to be zero-rated: registration mattered, but the tax at stake was small. The late registration penalty, AED 10,000, was not.',
    ],
    work: [
      'Told the client on the first day that the late registration penalty could not be avoided, so it was a known cost rather than a surprise later.',
      'Filed the tax record amendment the same evening the client approved it, to start the approval clock at once.',
      'Applied for VAT registration as soon as the amendment was approved.',
      'Prepared the VAT returns that followed, with supplies to overseas clients treated as zero-rated where the conditions were met.',
    ],
    outcome: [
      'Tax record amended and VAT registration completed.',
      'VAT returns filed, with the export services reported as zero-rated.',
    ],
    lesson:
      'Registration is often blocked by something upstream — an out-of-date tax record, a changed shareholder, a missing Emirates ID. Check the record before you apply, and keep it current afterwards: failing to report a change carries its own penalty.',
  },
  {
    slug: 'our-own-goaml-registration',
    title: 'Our own goAML registration: rejected once, then approved',
    summary:
      'An accounting practice is a designated non-financial business, so we registered on goAML ourselves. The first application was rejected; the second approved.',
    client: 'NUMARATECH — the practice itself',
    service: 'goAML registration',
    serviceHref: '/advisory/risk-compliance/goaml-registration/',
    period: 'July to October 2026',
    situation: [
      'Accountants are a designated non-financial business or profession under UAE anti-money-laundering law, so the practice had to register with its supervisor and on goAML, the Financial Intelligence Unit’s reporting system, and appoint a compliance officer.',
      'Our first application, submitted in July 2026, was rejected.',
    ],
    work: [
      'Resubmitted the application in August 2026, with the compliance officer appointment and the supporting letter.',
      'Set up access the way the system actually works: the SACM account is the single sign-on into goAML, protected by an authenticator code, with no separate goAML username.',
      'Kept the reference numbers and the helpdesk contacts in one tracker, so every follow-up call could quote them.',
    ],
    outcome: [
      'Registration approved in October 2026.',
      'The approval was needed straight away: our own bank asked for the goAML registration in its DNFBP due-diligence form.',
    ],
    lesson:
      'If your business is a DNFBP — a real estate broker, a dealer in precious metals or stones, an accountant, a corporate service provider — expect your bank to ask for the registration. Allow time for at least one round of correction.',
  },
];

export const findCaseStudy = (slug: string) => CASE_STUDIES.find((study) => study.slug === slug);

export const caseStudiesFor = (serviceHref: string) =>
  CASE_STUDIES.filter((study) => study.serviceHref === serviceHref);
