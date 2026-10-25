// Dedicated pages for the services people search for by name: "Corporate
// Tax registration in Dubai", "VAT return filing", and so on. A search
// engine ranks a page about one thing above a section of a page about
// several, so each of these has its own URL under its group:
// /advisory/<group>/<slug>/. The group page still lists every service and
// links here from the matching section.
//
// Facts checked 25 October 2026. Where a rule is stated, it is one that is
// settled and widely published; penalty amounts are quoted only where they
// are certain (the AED 10,000 late-registration penalties), because the
// wider penalty schedule was overhauled from 14 April 2026 (Cabinet
// Decision No. 129 of 2025). Prices come from src/fees.ts.
//
// Filing is described as preparing and submitting through the client's own
// EmaraTax account, and FTA questions as answers prepared with the client —
// support to the client, not acting as its registered tax agent (AUDIT R8).
// Do not strengthen this without the FTA tax-agent registration.

import { findFee, feeAmount, feeText } from './fees';

export type KeyService = {
  /** URL segment under the group. */
  slug: string;
  /** Group slug in src/services.ts. */
  group: 'tax' | 'accounting-audit' | 'risk-compliance';
  /** The matching section on the group page, which links here. */
  anchors: string[];
  /** Short name, for menus, breadcrumbs and the fee table. */
  name: string;
  /** The visible headline, with the place name people search for. */
  title: string;
  /** Search-result title, under 60 characters with the brand suffix. */
  seoTitle: string;
  /** Meta description, 70–160 characters. */
  description: string;
  lead: string;
  /** Fees in src/fees.ts, shown first in the stat strip under `label`.
   *  Prose can name a fee as {fee:<id>}; the page fills it in, so every
   *  amount on the page comes from src/fees.ts. */
  fees: { id: string; label: string }[];
  stats: { label: string; value: string }[];
  who: { title: string; intro: string; items: string[] };
  included: string[];
  need: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  /** Other pages on this site worth reading next. */
  related: { label: string; href: string }[];
  sources: { label: string; href: string }[];
};

const FTA_CT_GUIDES = {
  label: 'Corporate Tax guides and public clarifications, Federal Tax Authority',
  href: 'https://tax.gov.ae/en/taxes/corporate.tax/corporate.tax.guides.references.aspx',
};
const FTA_VAT_GUIDES = {
  label: 'VAT guides and public clarifications, Federal Tax Authority',
  href: 'https://tax.gov.ae/en/taxes/vat/guides.references.aspx',
};
const FTA_LEGISLATION = {
  label: 'Tax legislation register, Federal Tax Authority',
  href: 'https://tax.gov.ae/en/legislation.aspx',
};

export const KEY_SERVICES: KeyService[] = [
  {
    slug: 'corporate-tax-registration',
    group: 'tax',
    anchors: ['corporate-tax'],
    name: 'Corporate Tax registration',
    title: 'Corporate Tax registration in Dubai.',
    seoTitle: 'Corporate Tax Registration in Dubai, UAE',
    description:
      'Corporate Tax registration in Dubai for a fixed {fee:ct-registration}: who must register, the documents, the deadline, and what to do if you are already late.',
    lead:
      'Every UAE company has to register for Corporate Tax — including one that will pay nothing. We prepare the application, handle the passcodes and the questions, and hand you the certificate.',
    fees: [{ id: 'ct-registration', label: 'Fixed fee' }],
    stats: [
      { label: 'New company deadline', value: '3 months from incorporation' },
      { label: 'Late registration', value: 'AED 10,000 penalty' },
      { label: 'Filed on', value: 'EmaraTax' },
    ],
    who: {
      title: 'Who has to register.',
      intro: 'Registration does not depend on whether tax is payable. These all register:',
      items: [
        'Every company incorporated in the UAE, on the mainland or in a free zone.',
        'Free zone companies that expect the 0% rate on qualifying income.',
        'Companies that will elect Small Business Relief.',
        'Foreign companies effectively managed in the UAE, or with a permanent establishment here.',
        'Individuals whose business turnover in the UAE exceeds AED 1 million in a calendar year.',
      ],
    },
    included: [
      'Confirming the obligation, the deadline and the financial year end the registration will carry.',
      'Setting up, or tidying, your EmaraTax account and its authorised signatory.',
      'Preparing the application with its supporting documents, and submitting it through your EmaraTax account.',
      'Preparing the answers to any questions the Federal Tax Authority raises on the application.',
      'Sending you the registration certificate, and the date your first return is due.',
      'If you are late: whether a penalty waiver may be open to you, and the date that decides it.',
    ],
    need: [
      'Trade licence, and the memorandum and articles of association (or equivalent).',
      'Passport and Emirates ID of the owners and the authorised signatory.',
      'Proof of the signatory’s authority, if not named in the licence or constitution.',
      'Your financial year end.',
      'An email address and mobile number that can receive one-time passcodes while we file — the step that most often holds an application up.',
    ],
    steps: [
      {
        title: 'Check',
        body: 'We confirm you must register, by when, and whether anything in your tax record has to be updated first.',
      },
      {
        title: 'Prepare',
        body: 'We assemble the documents and agree a time for the passcodes, so the application goes in complete and in one sitting.',
      },
      {
        title: 'File',
        body: 'We submit the application through your EmaraTax account and prepare the reply to any request for more information.',
      },
      {
        title: 'Hand over',
        body: 'You receive the certificate and a note of your first tax period and return deadline.',
      },
    ],
    faqs: [
      {
        q: 'We will pay no Corporate Tax. Do we still need to register?',
        a: 'Yes. Registration is required whether or not tax is payable — a free zone company expecting 0%, or a company electing Small Business Relief, still registers and files a return each year.',
      },
      {
        q: 'When is the deadline for a new company?',
        a: 'A company incorporated on or after 1 March 2024 must apply within three months of its incorporation, under FTA Decision No. 3 of 2024. Companies that existed before then had deadlines set by the month their licence was issued, all of which have passed.',
      },
      {
        q: 'We missed the deadline. What happens?',
        a: 'Late registration carries a penalty of AED 10,000. The Federal Tax Authority has waived it where the first Corporate Tax return is filed within seven months of the end of the first tax period, so register now and find out when your first return must go in to keep that option open. We check it as part of the registration.',
      },
      {
        q: 'Is this the same as VAT registration?',
        a: 'No. Corporate Tax and VAT are registered separately, with different thresholds. A company can need one, both, or — below the VAT threshold — only Corporate Tax.',
      },
    ],
    related: [
      { label: 'Corporate Tax return filing', href: '/advisory/tax/corporate-tax-return/' },
      { label: 'Small Business Relief Check (free)', href: '/platform/small-business-relief-check/' },
      { label: 'The first Corporate Tax return: where it actually breaks', href: '/insights/first-corporate-tax-return-what-breaks/' },
    ],
    sources: [FTA_CT_GUIDES, FTA_LEGISLATION],
  },
  {
    slug: 'corporate-tax-return',
    group: 'tax',
    anchors: ['corporate-tax'],
    name: 'Corporate Tax return filing',
    title: 'Corporate Tax return filing in Dubai.',
    seoTitle: 'Corporate Tax Return Filing in Dubai, UAE',
    description:
      'UAE Corporate Tax returns prepared and filed for a fixed fee: Small Business Relief returns for {fee:ct-return-sbr}, full computations {fee:ct-return-full}.',
    lead:
      'A return is due within nine months of every tax period, including the ones with no tax to pay. We prepare the computation from your accounts, take each relief deliberately, and file — with the workings kept.',
    fees: [
      { id: 'ct-return-sbr', label: 'Small Business Relief return' },
      { id: 'ct-return-full', label: 'Full computation' },
    ],
    stats: [
      { label: 'Due', value: '9 months after period end' },
      { label: 'Rate', value: '9% above AED 375,000' },
    ],
    who: {
      title: 'Who has to file.',
      intro: 'Every business registered for Corporate Tax files a return for every tax period, including:',
      items: [
        'Companies with nothing to pay because their profit is under the AED 375,000 zero band.',
        'Companies electing Small Business Relief.',
        'Free zone companies claiming the 0% rate on qualifying income.',
        'Companies with a loss — which is exactly when a correct return matters most.',
      ],
    },
    included: [
      'Reviewing your financial statements as the starting point for the computation.',
      'The adjustments between accounting profit and taxable income, each one documented.',
      'Reliefs taken deliberately: Small Business Relief, free zone qualifying income, loss relief.',
      'A decision, in writing, on whether to elect Small Business Relief — including what it would cost.',
      'Preparing the return and submitting it through your EmaraTax account, with the amount and date of any payment due.',
      'The computation and its workings, filed with your records for the seven years the law requires.',
    ],
    need: [
      'Financial statements for the period — audited, if your business is one that must have them audited.',
      'The trial balance and general ledger behind them.',
      'Last year’s return and computation, if there was one.',
      'Details of related-party transactions and any payments to connected persons.',
      'User access to your EmaraTax account, so we can prepare and submit the return through it.',
    ],
    steps: [
      {
        title: 'Review',
        body: 'We start from your financial statements and ask the questions that decide the computation.',
      },
      {
        title: 'Compute',
        body: 'Adjustments, reliefs and losses, each recorded with the reason it was taken.',
      },
      {
        title: 'Agree',
        body: 'You see the computation and the tax before anything is filed.',
      },
      {
        title: 'File',
        body: 'We submit the return through your EmaraTax account, confirm any payment due, and keep the working papers.',
      },
    ],
    faqs: [
      {
        q: 'When is my return due?',
        a: 'Within nine months of the end of the tax period. For a year ending 31 December, that is 30 September of the following year. Any tax due is payable by the same date.',
      },
      {
        q: 'Should I elect Small Business Relief?',
        a: 'Only if it helps. The relief removes the tax for the period, but a loss made in a period for which it is elected cannot be carried forward. If you have a loss, a full return can be worth more. Our free Small Business Relief Check shows the trade-off.',
      },
      {
        q: 'Do I need audited financial statements?',
        a: 'Some businesses must have them — including Qualifying Free Zone Persons and the largest companies. Most small businesses need financial statements but not an audit. We tell you which applies before we start.',
      },
      {
        q: 'What makes a return cost more than the starting fee?',
        a: 'The number of adjustments and reliefs, and the state of the records. A company with clean statements and few adjustments pays the starting fee. We quote the fixed fee after seeing your accounts, before we begin.',
      },
    ],
    related: [
      { label: 'Small Business Relief Check (free)', href: '/platform/small-business-relief-check/' },
      { label: 'Corporate Tax estimator (free)', href: '/platform/corporate-tax/#estimator' },
      { label: 'Small Business Relief runs to 2029', href: '/insights/small-business-relief-extended-to-2029/' },
    ],
    sources: [FTA_CT_GUIDES, FTA_LEGISLATION],
  },
  {
    slug: 'vat-registration',
    group: 'tax',
    anchors: ['vat'],
    name: 'VAT registration',
    title: 'VAT registration in Dubai.',
    seoTitle: 'VAT Registration in Dubai, UAE',
    description:
      'UAE VAT registration for a fixed {fee:vat-registration}: the AED 375,000 threshold, voluntary registration, exports, documents, and what to do if you are late.',
    lead:
      'VAT registration is required once taxable supplies pass AED 375,000 in twelve months. We test the threshold properly, register you, and tell you on day one about any penalty already running.',
    fees: [{ id: 'vat-registration', label: 'Fixed fee' }],
    stats: [
      { label: 'Mandatory above', value: 'AED 375,000' },
      { label: 'Voluntary from', value: 'AED 187,500' },
      { label: 'Late registration', value: 'AED 10,000 penalty' },
    ],
    who: {
      title: 'Who has to register.',
      intro: 'The test is the value of taxable supplies and imports, not profit:',
      items: [
        'Mandatory: supplies above AED 375,000 in the last twelve months, or expected to pass it in the next 30 days.',
        'Voluntary: supplies, or expenses, above AED 187,500 — useful for a new business with input VAT to recover.',
        'Zero-rated supplies, such as many exports, count towards the threshold.',
        'A business whose supplies are all zero-rated can apply for an exception from registration — but then cannot recover input VAT.',
      ],
    },
    included: [
      'Testing the threshold on your actual supplies, month by month.',
      'Checking your tax record on EmaraTax, and amending it first where it is out of date.',
      'Preparing the application, submitting it through your EmaraTax account, and preparing the reply to any questions on it.',
      'Your registration certificate, tax period and first return date.',
      'A note on how your main supplies are treated: standard-rated, zero-rated or exempt.',
    ],
    need: [
      'Trade licence, and memorandum and articles of association.',
      'Passport and Emirates ID of the owners and the authorised signatory.',
      'Revenue for each of the last twelve months, with a sample of sales invoices.',
      'Bank account details in the company’s name.',
      'If you import or export goods: customs registration details.',
    ],
    steps: [
      {
        title: 'Test',
        body: 'We work out whether, and from when, you must register — and whether a late-registration penalty already applies.',
      },
      {
        title: 'Fix the record',
        body: 'If your EmaraTax record is out of date, we amend it first; the VAT application cannot proceed until it is approved.',
      },
      {
        title: 'Apply',
        body: 'We submit the application through your EmaraTax account and prepare the reply to any request for more information.',
      },
      {
        title: 'Set up',
        body: 'You receive the certificate, your tax periods, and what to put on an invoice from now on.',
      },
    ],
    faqs: [
      {
        q: 'We only sell to clients outside the UAE. Do we need to register?',
        a: 'Probably. Many exports of services are zero-rated, but zero-rated supplies still count towards the AED 375,000 threshold. If all your supplies are zero-rated you can apply for an exception from registration instead — at the cost of recovering no input VAT.',
      },
      {
        q: 'We should have registered months ago. What now?',
        a: 'Register now. Late registration carries a penalty of AED 10,000, and VAT is due from the date you should have been registered. We tell you the position on the first day, so the cost is known rather than discovered.',
      },
      {
        q: 'How long does registration take?',
        a: 'Usually a few weeks from a complete application. It takes longer if the Federal Tax Authority asks for more information, or if the tax record has to be amended first.',
      },
    ],
    related: [
      { label: 'VAT return filing', href: '/advisory/tax/vat-return-filing/' },
      { label: 'Corporate Tax registration', href: '/advisory/tax/corporate-tax-registration/' },
    ],
    sources: [FTA_VAT_GUIDES, FTA_LEGISLATION],
  },
  {
    slug: 'vat-return-filing',
    group: 'tax',
    anchors: ['vat'],
    name: 'VAT return filing',
    title: 'VAT return filing in Dubai.',
    seoTitle: 'VAT Return Filing in Dubai, UAE',
    description:
      'UAE VAT returns prepared, reconciled and filed for a fixed fee, {fee:vat-return} per return, by the 28th day after each tax period ends.',
    lead:
      'A VAT return is due 28 days after every tax period, whether or not there is tax to pay. We reconcile it to your ledger before it is filed, so the figures still hold when the Corporate Tax return uses the same turnover.',
    fees: [{ id: 'vat-return', label: 'Fixed fee, per return' }],
    stats: [
      { label: 'Due', value: '28 days after period end' },
      { label: 'Usual period', value: 'quarterly' },
      { label: 'Rate', value: '5% standard' },
    ],
    who: {
      title: 'Who this is for.',
      intro: 'Every VAT-registered business files, every period. Most often we take over from:',
      items: [
        'Owners filing their own returns from bank statements, without a reconciled ledger.',
        'Businesses with exports, imports or reverse-charge purchases, where the treatment is easy to get wrong.',
        'Businesses whose VAT returns and Corporate Tax return report different turnover.',
        'Anyone who has missed a return and needs the position put right.',
      ],
    },
    included: [
      'Reconciling sales and purchases to the ledger and the bank.',
      'Checking that input VAT is recoverable: a valid tax invoice, for a business purpose.',
      'Reverse charge on imported goods and services, and zero-rating evidence for exports.',
      'Preparing the return and submitting it through your EmaraTax account, with the amount and date of any payment.',
      'A short note each period on anything that changed or needs your decision.',
    ],
    need: [
      'Sales and purchase records for the period, or access to your accounting system.',
      'Bank statements for the period.',
      'Tax invoices for purchases where you are reclaiming VAT.',
      'Customs declarations for any imports or exports.',
    ],
    steps: [
      {
        title: 'Collect',
        body: 'Records arrive by a set date after the period ends, or we pull them from your accounting system.',
      },
      {
        title: 'Reconcile',
        body: 'Sales, purchases and VAT agreed to the ledger and the bank before anything is filed.',
      },
      {
        title: 'Agree',
        body: 'You see the return and the amount payable or reclaimable.',
      },
      {
        title: 'File',
        body: 'We submit it through your EmaraTax account by the 28th day after the period ends, and confirm the payment due.',
      },
    ],
    faqs: [
      {
        q: 'When is the return due?',
        a: 'By the 28th day after the end of the tax period. For a quarter ending 31 March, that is 28 April. Payment is due by the same date.',
      },
      {
        q: 'Do I file if there was no activity?',
        a: 'Yes. A nil return is still a return, and a missed one is still late.',
      },
      {
        q: 'We have missed returns. Can you help?',
        a: 'Yes. We prepare the missing returns and correct any errors through a voluntary disclosure where needed. Penalties for late filing and errors were overhauled from 14 April 2026, and making the disclosure before the Federal Tax Authority finds the error generally costs less.',
      },
      {
        q: 'What sets the fee for a return?',
        a: 'The number of transactions, the number of bank accounts, and whether imports, exports or apportionment are involved. We quote the fixed fee per return before we start.',
      },
    ],
    related: [
      { label: 'VAT registration', href: '/advisory/tax/vat-registration/' },
      { label: 'Bookkeeping and accounting', href: '/advisory/accounting-audit/bookkeeping/' },
    ],
    sources: [FTA_VAT_GUIDES, FTA_LEGISLATION],
  },
  {
    slug: 'bookkeeping',
    group: 'accounting-audit',
    anchors: ['accounting-bookkeeping'],
    name: 'Bookkeeping and accounting',
    title: 'Bookkeeping and accounting in Dubai.',
    seoTitle: 'Bookkeeping & Accounting Services in Dubai',
    description:
      'Monthly bookkeeping and management accounts in Dubai, {fee:bookkeeping} a month: IFRS books that carry your VAT returns and Corporate Tax computation.',
    lead:
      'Books kept to a monthly timetable, reconciled to the bank, and built to carry a VAT return and a Corporate Tax computation — not reconstructed at the year end.',
    fees: [{ id: 'bookkeeping', label: 'Fixed fee, a month' }],
    stats: [
      { label: 'Standard', value: 'IFRS or IFRS for SMEs' },
      { label: 'Close', value: 'monthly, to a timetable' },
      { label: 'Records kept', value: '7 years for Corporate Tax' },
    ],
    who: {
      title: 'Who this is for.',
      intro: 'Most of our bookkeeping clients come to us at one of these points:',
      items: [
        'A new company that needs its books set up properly from the first month.',
        'An owner who has been keeping the books alongside running the business, and wants them back.',
        'A business whose year-end accounts take months because the books are not kept during the year.',
        'A company registering for VAT, which needs a ledger that can support a return every quarter.',
      ],
    },
    included: [
      'Recording sales, purchases and expenses, coded for VAT and for Corporate Tax.',
      'Bank and card reconciliations every month.',
      'Receivables and payables kept current, with an ageing you can act on.',
      'A month-end close to a fixed date, and management accounts with a short commentary.',
      'Year-end financial statements under IFRS, or IFRS for SMEs where it is permitted.',
      'A chart of accounts that supports the VAT return and the tax computation, set up once.',
    ],
    need: [
      'Access to your bank statements, or a feed into the accounting system.',
      'Sales invoices and purchase bills, as they arise or by a set date each month.',
      'Your accounting software login, or we set one up for you.',
      'A contact who can answer questions on unusual transactions.',
    ],
    steps: [
      {
        title: 'Set up',
        body: 'Chart of accounts, opening balances and bank feeds — once, properly.',
      },
      {
        title: 'Monthly',
        body: 'Transactions recorded and reconciled to the bank by a fixed day each month.',
      },
      {
        title: 'Report',
        body: 'Management accounts and a short note on what moved and why.',
      },
      {
        title: 'Year end',
        body: 'Financial statements ready for the Corporate Tax return, or for your auditor.',
      },
    ],
    faqs: [
      {
        q: 'Which accounting standard do the books follow?',
        a: 'International Financial Reporting Standards. A business with revenue up to AED 50 million may use IFRS for SMEs for Corporate Tax purposes, which is simpler and usually sufficient.',
      },
      {
        q: 'How long do records have to be kept?',
        a: 'For Corporate Tax, seven years after the end of the tax period they relate to. That includes the ledger, invoices, bank records and the asset and liability registers.',
      },
      {
        q: 'What sets the monthly fee?',
        a: 'The number of transactions and bank accounts each month, and whether payroll or multiple currencies are involved. We quote a fixed monthly fee after seeing a typical month.',
      },
    ],
    related: [
      { label: 'VAT return filing', href: '/advisory/tax/vat-return-filing/' },
      { label: 'Closing the books in five days, not five weeks', href: '/insights/closing-the-books-in-five-days/' },
    ],
    sources: [FTA_CT_GUIDES, FTA_LEGISLATION],
  },
  {
    slug: 'goaml-registration',
    group: 'risk-compliance',
    anchors: ['compliance-services'],
    name: 'goAML registration',
    title: 'goAML registration in the UAE.',
    seoTitle: 'goAML Registration for DNFBPs in the UAE',
    description:
      'goAML and AML supervisor registration for UAE DNFBPs — real estate, precious metals, accountants, corporate service providers — for a fixed {fee:goaml-registration}.',
    lead:
      'A designated non-financial business has to register with its supervisor and on goAML, the Financial Intelligence Unit’s system, before it can report — and its bank may ask to see it. We have done it for ourselves, rejection included.',
    fees: [{ id: 'goaml-registration', label: 'Fixed fee' }],
    stats: [
      { label: 'Who', value: 'DNFBPs' },
      { label: 'System', value: 'goAML, via SACM sign-on' },
      { label: 'Asked for by', value: 'supervisors and banks' },
    ],
    who: {
      title: 'Who has to register.',
      intro: 'Designated non-financial businesses and professions under UAE anti-money-laundering law, including:',
      items: [
        'Real estate brokers and agents.',
        'Dealers in precious metals and precious stones.',
        'Accountants and auditors.',
        'Corporate service providers and trust service providers.',
        'Lawyers and notaries, for the transactions the law specifies.',
      ],
    },
    included: [
      'Confirming that your activity makes you a DNFBP, and which supervisor you register with.',
      'Setting up the SACM account — the single sign-on into goAML — with its authenticator.',
      'Preparing the application, including the compliance officer appointment.',
      'Submitting it, following up, and correcting and resubmitting if it is rejected.',
      'A note of your reporting duties once registered, and the references your bank will ask for.',
    ],
    need: [
      'Trade licence, showing the licensed activity.',
      'Passport and Emirates ID of the owner and the proposed compliance officer.',
      'The compliance officer’s contact details, and a phone with an authenticator app.',
      'The registered email address, which receives the system’s messages.',
    ],
    steps: [
      {
        title: 'Confirm',
        body: 'Whether your activity is in scope, and who supervises it.',
      },
      {
        title: 'Set up',
        body: 'The SACM account and authenticator, with the credentials recorded safely.',
      },
      {
        title: 'Apply',
        body: 'The registration submitted with the compliance officer appointment and supporting documents.',
      },
      {
        title: 'Follow through',
        body: 'Follow-up until approval — including a resubmission if the first attempt is rejected.',
      },
    ],
    faqs: [
      {
        q: 'Is a goAML registration the same as an AML policy?',
        a: 'No. Registration lets you report suspicious transactions and shows the supervisor you exist. You also need an AML framework — a risk assessment, customer due diligence and record keeping — which we can build separately.',
      },
      {
        q: 'Why would the application be rejected?',
        a: 'Usually something in the details or the documents. Ours was rejected the first time and approved on resubmission. Expect a round of correction, and allow for it.',
      },
      {
        q: 'Does the bank really ask for it?',
        a: 'Ours did: its due-diligence form for DNFBP customers asks whether the business is registered on goAML.',
      },
    ],
    related: [
      { label: 'Risk & Compliance services', href: '/advisory/risk-compliance/' },
      { label: 'UAE Regulatory Brief', href: '/insights/regulatory-brief/' },
    ],
    sources: [
      { label: 'Anti-money laundering, Ministry of Economy and Tourism', href: 'https://www.moet.gov.ae/en/aml' },
    ],
  },
  {
    slug: 'free-zone-corporate-tax',
    group: 'tax',
    anchors: ['corporate-tax'],
    name: 'Free zone Corporate Tax',
    title: 'Free zone Corporate Tax, and the 0% rate.',
    seoTitle: 'Free Zone Corporate Tax & QFZP Returns, UAE',
    description:
      'Free zone Corporate Tax in the UAE: whether you are a Qualifying Free Zone Person, the de minimis test, and the return, {fee:qfzp-return}.',
    lead:
      'A free zone company pays 0% only on qualifying income, and only while it meets every condition, every year. We test the conditions, split the income, and prepare the return — with the evidence the 0% rests on.',
    fees: [{ id: 'qfzp-return', label: 'Fixed fee, per return' }],
    stats: [
      { label: 'Qualifying income', value: '0%' },
      { label: 'Other taxable income', value: '9% above AED 375,000' },
      { label: 'De minimis', value: 'lower of 5% and AED 5m' },
    ],
    who: {
      title: 'Who this is for.',
      intro: 'Any company licensed in a UAE free zone, and in particular:',
      items: [
        'Free zone companies that want the 0% rate on their qualifying income.',
        'Free zone companies with mainland customers, where some income may not qualify.',
        'Groups with a free zone company alongside mainland or overseas companies.',
        'Free zone companies that have been told they "do not pay tax" — and still have to register, be audited and file.',
      ],
    },
    included: [
      'Testing each condition for Qualifying Free Zone Person status: substance in the free zone, qualifying income, arm’s length pricing, audited financial statements, and the de minimis limit.',
      'Classifying revenue as qualifying or non-qualifying, line by line, with the reasoning recorded.',
      'The de minimis test: non-qualifying revenue within the lower of 5% of total revenue and AED 5 million.',
      'Related-party transactions reviewed against the arm’s length standard.',
      'Preparing the Corporate Tax return and submitting it through your EmaraTax account.',
      'A file of the evidence the 0% position depends on, kept for the seven years the law requires.',
    ],
    need: [
      'Free zone licence, showing the licensed activities.',
      'Audited financial statements for the period.',
      'A revenue listing by customer: where each customer is, and what was supplied.',
      'Staff, premises and assets in the free zone — the substance the regime looks for.',
      'Agreements with related parties.',
    ],
    steps: [
      { title: 'Test', body: 'Each condition for qualifying status, checked before the year closes where possible.' },
      { title: 'Classify', body: 'Revenue split into qualifying and non-qualifying, with the de minimis test run.' },
      { title: 'Compute', body: '0% on qualifying income, 9% on the rest above the zero band, each line evidenced.' },
      { title: 'File', body: 'You approve the return; we submit it through your EmaraTax account and keep the file.' },
    ],
    faqs: [
      {
        q: 'Is every free zone company taxed at 0%?',
        a: 'No. 0% applies only to qualifying income, and only for a Qualifying Free Zone Person — a free zone company that meets every condition for the period. Other taxable income is taxed at 9%.',
      },
      {
        q: 'What happens if we fail a condition?',
        a: 'The company loses Qualifying Free Zone Person status and is taxed at the standard rates for a minimum of five years. That is why the test is worth running before the year ends, not after.',
      },
      {
        q: 'Do we need audited accounts?',
        a: 'Yes. Audited financial statements are one of the conditions for Qualifying Free Zone Person status.',
      },
      {
        q: 'Can a free zone company elect Small Business Relief instead?',
        a: 'A Qualifying Free Zone Person cannot. A free zone company that is not one may, if it meets the conditions — our free Small Business Relief Check tests them.',
      },
    ],
    related: [
      { label: 'Audit file preparation', href: '/advisory/accounting-audit/audit-file-preparation/' },
      { label: 'Corporate Tax return filing', href: '/advisory/tax/corporate-tax-return/' },
      { label: 'Small Business Relief Check (free)', href: '/platform/small-business-relief-check/' },
    ],
    sources: [
      FTA_CT_GUIDES,
      {
        label: 'Ministerial Decision No. 139 of 2023 on Qualifying and Excluded Activities, Ministry of Finance',
        href: 'https://mof.gov.ae/wp-content/uploads/2023/06/Ministerial-Decision-No.-139-of-2023-Regarding-Qualifying-Activities-and-Excluded-Activities.pdf',
      },
    ],
  },
  {
    slug: 'tax-deregistration',
    group: 'tax',
    anchors: ['corporate-tax', 'vat'],
    name: 'Corporate Tax and VAT deregistration',
    title: 'Corporate Tax and VAT deregistration.',
    seoTitle: 'Corporate Tax & VAT Deregistration, UAE',
    description:
      'Closing a UAE company? Corporate Tax and VAT deregistration for a fixed {fee:ct-deregistration} each: the final returns, the deadlines, and the approval.',
    lead:
      'Cancelling a trade licence does not close your tax registrations. Until the Federal Tax Authority approves deregistration, returns keep falling due — and so do the penalties for missing them.',
    fees: [
      { id: 'ct-deregistration', label: 'Corporate Tax deregistration' },
      { id: 'vat-deregistration', label: 'VAT deregistration' },
    ],
    stats: [
      { label: 'Corporate Tax deadline', value: '3 months after the business stops' },
      { label: 'Before approval', value: 'every return filed, all tax paid' },
    ],
    who: {
      title: 'Who this is for.',
      intro: 'Businesses that are:',
      items: [
        'Closing, liquidating or cancelling their trade licence.',
        'Merging into another company, or transferring the business.',
        'No longer making taxable supplies, or whose supplies have fallen below the VAT voluntary registration threshold of AED 187,500.',
        'Carrying a registration they no longer need, with returns still falling due.',
      ],
    },
    included: [
      'Confirming the date the business stopped, which starts the deregistration clock.',
      'The final Corporate Tax return to that date, and the final VAT return.',
      'Settling the position: tax due, any penalties, and any refund owed to you.',
      'The deregistration applications, submitted through your EmaraTax account.',
      'Preparing the replies to any questions until the Federal Tax Authority approves.',
    ],
    need: [
      'The licence cancellation, liquidation or board documents showing when the business stopped.',
      'Final financial statements, to the date the business stopped.',
      'Bank statements to the date of closure.',
      'User access to your EmaraTax account.',
    ],
    steps: [
      { title: 'Confirm', body: 'The cessation date, and which registrations have to be closed.' },
      { title: 'Final returns', body: 'The last Corporate Tax and VAT returns, and the tax position settled.' },
      { title: 'Apply', body: 'Deregistration applications submitted through your EmaraTax account.' },
      { title: 'Approval', body: 'Replies to any questions prepared with you, until the registrations are closed.' },
    ],
    faqs: [
      {
        q: 'We cancelled the licence. Are we done?',
        a: 'No. The Federal Tax Authority does not treat a cancelled or expired licence as the end of a tax registration. Until deregistration is approved, returns keep falling due.',
      },
      {
        q: 'When do we have to apply?',
        a: 'For Corporate Tax, within three months of the business ceasing — for a company, usually its dissolution or liquidation. For VAT, the deadline runs from when the business stops making taxable supplies, and it is shorter. Late deregistration carries penalties under both.',
      },
      {
        q: 'What if we still owe tax or penalties?',
        a: 'They have to be paid, and every return filed, before the Federal Tax Authority will approve deregistration.',
      },
    ],
    related: [
      { label: 'Corporate Tax return filing', href: '/advisory/tax/corporate-tax-return/' },
      { label: 'VAT return filing', href: '/advisory/tax/vat-return-filing/' },
    ],
    sources: [FTA_CT_GUIDES, FTA_VAT_GUIDES],
  },
  {
    slug: 'ubo-filing',
    group: 'tax',
    anchors: ['ubo-filing'],
    name: 'UBO filing',
    title: 'UBO filing in Dubai.',
    seoTitle: 'UBO Register & Filing in Dubai, UAE',
    description:
      'Ultimate beneficial owner registers prepared and filed with your licensing authority in Dubai for a fixed {fee:ubo-filing}, and kept current as ownership changes.',
    lead:
      'Every UAE company has to know who ultimately owns and controls it, keep that on a register, and file it with its licensing authority. We trace the owners, prepare the registers, file them, and update them when anything changes.',
    fees: [{ id: 'ubo-filing', label: 'Fixed fee' }],
    stats: [
      { label: 'Ownership test', value: '25% or more' },
      { label: 'Filed with', value: 'your licensing authority' },
      { label: 'Updated', value: 'whenever ownership changes' },
    ],
    who: {
      title: 'Who has to file.',
      intro: 'Companies licensed on the mainland and in the free zones outside the financial free zones, including:',
      items: [
        'Companies owned directly by individuals.',
        'Companies owned through other companies or trusts, where the ultimate owner has to be traced.',
        'Companies with nominee shareholders or directors.',
        'Any company whose shareholders, shareholdings or managers have changed since the last filing.',
      ],
    },
    included: [
      'Tracing ownership to the individuals who own or control 25% or more, or who control the company in another way.',
      'Where nobody meets that test, identifying the person the rules treat as the beneficial owner.',
      'The registers: beneficial owners, partners or shareholders, and nominee directors.',
      'Filing with your licensing authority, through its portal.',
      'Updating the registers and the filing when ownership or management changes.',
    ],
    need: [
      'Trade licence and memorandum of association.',
      'Share register, and the ownership chain behind any corporate shareholder.',
      'Passport, and Emirates ID or address, for each beneficial owner.',
      'Any nominee agreements.',
    ],
    steps: [
      { title: 'Trace', body: 'Ownership followed through every layer to the individuals at the end of it.' },
      { title: 'Prepare', body: 'The three registers drafted and agreed with you.' },
      { title: 'File', body: 'Submitted to your licensing authority through its portal.' },
      { title: 'Maintain', body: 'Updated when shares, owners or managers change.' },
    ],
    faqs: [
      {
        q: 'Who counts as a beneficial owner?',
        a: 'An individual who ultimately owns or controls 25% or more of the company, directly or through other companies, or who controls it by other means. If nobody meets that test, the rules treat a senior manager as the beneficial owner.',
      },
      {
        q: 'What if ownership changes?',
        a: 'The registers have to be updated and the licensing authority told promptly. The deadline is short, and fines for failing to keep the registers rise on repeat.',
      },
      {
        q: 'Does this apply in DIFC or ADGM?',
        a: 'The financial free zones run their own beneficial ownership rules. The federal rules cover the mainland and the other free zones.',
      },
    ],
    related: [
      { label: 'goAML registration', href: '/advisory/risk-compliance/goaml-registration/' },
      { label: 'Risk & Compliance services', href: '/advisory/risk-compliance/' },
    ],
    sources: [
      {
        label: 'Ultimate and intermediate beneficial owners: guide, Jebel Ali Free Zone',
        href: 'https://www.jafza.ae/resource-centre/guides/all-you-need-to-know-about-ultimate-beneficial-owners-and-intermediate-beneficial-owners/',
      },
    ],
  },
  {
    slug: 'payroll-wps',
    group: 'accounting-audit',
    anchors: ['payroll-wps'],
    name: 'Payroll and WPS',
    title: 'Payroll and WPS in Dubai.',
    seoTitle: 'Payroll & WPS Services in Dubai, UAE',
    description:
      'Monthly payroll processed and paid through the Wage Protection System in Dubai, with end-of-service gratuity computed correctly, {fee:payroll-wps} a month.',
    lead:
      'Salaries paid on time through the Wage Protection System, payslips issued, and end-of-service gratuity calculated under the law rather than approximated on the employee’s last day.',
    fees: [{ id: 'payroll-wps', label: 'Fixed fee, a month' }],
    stats: [
      { label: 'Paid through', value: 'the Wage Protection System' },
      { label: 'Gratuity', value: '21 days a year, then 30' },
      { label: 'Payslips', value: 'every month' },
    ],
    who: {
      title: 'Who this is for.',
      intro: 'Employers who would rather not run payroll themselves, especially:',
      items: [
        'Mainland companies registered with the Ministry of Human Resources and Emiratisation, which pay salaries through WPS.',
        'Free zone companies, under their own free zone’s rules.',
        'Small teams where payroll currently sits with the owner.',
        'Any employer with a leaver whose gratuity needs to be computed correctly.',
      ],
    },
    included: [
      'Monthly payroll: salaries, allowances, overtime, leave and deductions.',
      'The WPS salary file prepared for your bank or exchange house each month.',
      'Payslips for every employee.',
      'End-of-service gratuity computed under the UAE Labour Law, for every leaver.',
      'A gratuity provision for your accounts.',
      'Payroll journals posted to your books.',
    ],
    need: [
      'Employment contracts, or a list of salaries and allowances.',
      'Joiners, leavers, leave and overtime each month, by a set date.',
      'Your bank’s or exchange house’s WPS details.',
    ],
    steps: [
      { title: 'Collect', body: 'Changes for the month — joiners, leavers, leave, overtime — by a set date.' },
      { title: 'Calculate', body: 'Gross to net for every employee, and any gratuity due.' },
      { title: 'Approve', body: 'You see the payroll summary before anything is paid.' },
      { title: 'Pay', body: 'The WPS file goes to your bank or exchange house; payslips go to your staff.' },
    ],
    faqs: [
      {
        q: 'How is end-of-service gratuity calculated?',
        a: 'Under the UAE Labour Law: 21 days’ basic wage for each of the first five years of service, and 30 days’ basic wage for each year after that, capped at two years’ wage in total. Days of unpaid absence are not counted.',
      },
      {
        q: 'Does WPS apply in free zones?',
        a: 'WPS is the system for employers registered with the Ministry of Human Resources and Emiratisation. Free zones set their own payroll rules; we follow the one that applies to you.',
      },
      {
        q: 'What sets the monthly fee?',
        a: 'The number of employees, and how much changes each month. We quote a fixed monthly fee after seeing your payroll.',
      },
    ],
    related: [
      { label: 'Bookkeeping and accounting', href: '/advisory/accounting-audit/bookkeeping/' },
      { label: 'Accounting & Audit Support', href: '/advisory/accounting-audit/' },
    ],
    sources: [{ label: 'Ministry of Human Resources and Emiratisation', href: 'https://www.mohre.gov.ae/' }],
  },
  {
    slug: 'audit-file-preparation',
    group: 'accounting-audit',
    anchors: ['audit-assurance', 'external-audit'],
    name: 'Audit file preparation',
    title: 'Audit file preparation in Dubai.',
    seoTitle: 'Audit Preparation & Support in Dubai, UAE',
    description:
      'The year-end file your auditor asks for, prepared before fieldwork: schedules, reconciliations and evidence, {fee:audit-file-prep}. We do not audit.',
    lead:
      'We are not your auditor. We are the people who get the file ready before your auditor arrives — so fieldwork is short, the queries are few, and the opinion lands on time.',
    fees: [{ id: 'audit-file-prep', label: 'Fixed fee, per year end' }],
    stats: [
      { label: 'Our role', value: 'your side of the audit' },
      { label: 'We do not', value: 'audit or sign opinions' },
      { label: 'You receive', value: 'a cross-referenced year-end file' },
    ],
    who: {
      title: 'Who this is for.',
      intro: 'Companies that have to be audited, or choose to be:',
      items: [
        'Qualifying Free Zone Persons, for whom audited accounts are a condition of the 0% rate.',
        'Companies whose licensing authority asks for audited accounts.',
        'Companies whose bank, investors or shareholders require an audit.',
        'Any company whose last audit ran long because the file was built during fieldwork.',
      ],
    },
    included: [
      'Lead schedules for every material balance, tied to the trial balance.',
      'Bank, receivable, payable and intercompany reconciliations.',
      'Supporting evidence gathered and indexed before fieldwork.',
      'Fixed asset register and depreciation schedule.',
      'Draft financial statements under IFRS, or IFRS for SMEs.',
      'One point of contact for the auditor’s queries, tracked to closure.',
    ],
    need: [
      'Trial balance and general ledger for the year.',
      'Bank statements for the year.',
      'Contracts, loan agreements and significant invoices.',
      'Last year’s audited financial statements.',
    ],
    steps: [
      { title: 'Plan', body: 'Agree the timetable with you and your auditor, and what the file will contain.' },
      { title: 'Prepare', body: 'Schedules, reconciliations and evidence assembled before fieldwork starts.' },
      { title: 'Support', body: 'Auditor queries answered from the file, and tracked.' },
      { title: 'Close', body: 'Adjustments posted and management letter points followed to closure.' },
    ],
    faqs: [
      {
        q: 'Can you audit our accounts?',
        a: 'No. A firm that prepares the records cannot independently audit them. We prepare the file and work alongside the auditor you appoint; the opinion is theirs.',
      },
      {
        q: 'Can you help us appoint an auditor?',
        a: 'Yes — we can help you appoint one and agree the scope and timetable. The auditor stays independent of us.',
      },
      {
        q: 'What sets the fee?',
        a: 'The size of the balance sheet, the number of bank accounts and companies, and the state of the records. We quote a fixed fee after seeing the trial balance.',
      },
    ],
    related: [
      { label: 'Free zone Corporate Tax', href: '/advisory/tax/free-zone-corporate-tax/' },
      { label: 'Bookkeeping and accounting', href: '/advisory/accounting-audit/bookkeeping/' },
      { label: 'The audit trail is a design requirement', href: '/insights/audit-trail-as-a-design-requirement/' },
    ],
    sources: [FTA_CT_GUIDES],
  },
];

export const keyServicePath = (service: KeyService) => `/advisory/${service.group}/${service.slug}/`;

/** Dedicated pages for a group-page section, by its anchor. */
export const keyServicesFor = (group: string, anchor: string) =>
  KEY_SERVICES.filter((service) => service.group === group && service.anchors.includes(anchor));

/** One line for lists: the fee, or "from" the lowest where a page has
 *  several (a Small Business Relief return and a full one, say). */
export const feeSummary = (service: KeyService) => {
  const fees = service.fees.map((entry) => findFee(entry.id));
  if (fees.length === 1) return feeText(fees[0]);
  const low = fees.reduce((a, b) => (b.amount < a.amount ? b : a));
  return feeText({ ...low, from: true });
};

/** Fills {fee:<id>} tokens from src/fees.ts. An unknown id fails the build. */
export const fillFees = (text: string) =>
  text.replace(/\{fee:([a-z0-9-]+)\}/g, (_, id: string) => feeAmount(findFee(id)));

