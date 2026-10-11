// NUMARATECH advisory service lines, and the platform roadmap.
//
// The advisory structure mirrors the practice's own grouping: Accounting &
// Audit, Tax & Advisory, and Risk & Compliance. Each group has an overview and
// a set of services; the group page carries them all as anchored sections.

export type Service = {
  slug: string;
  name: string;
  /** Short line shown under the name in menus and lists. */
  strap: string;
  body: string;
  points: string[];
};

export type ServiceGroup = {
  slug: string;
  name: string;
  strap: string;
  /** Sentence used at the top of the group page. */
  lead: string;
  services: Service[];
};

export const SERVICE_GROUPS: ServiceGroup[] = [
  {
    // We are accounting and tax consultants, not registered auditors. Nothing in
    // this group may claim to perform a statutory audit or issue an opinion —
    // see /about/ and /terms/, which state the same boundary to clients.
    slug: 'accounting-audit',
    name: 'Accounting & Audit Support',
    strap: 'IFRS, outsourced CFO, audit support',
    lead:
      'Books that can carry a filing, and the work that gets them through someone else’s audit. From day-to-day bookkeeping to the year-end file your auditor asks for.',
    services: [
      {
        slug: 'audit-assurance',
        name: 'Audit File Preparation',
        strap: 'Year-end file, schedules & evidence',
        body:
          'The client side of an audit: the schedules, reconciliations and supporting evidence your appointed auditor will ask for, prepared before they ask rather than during fieldwork. We do not audit — we make the audit short.',
        points: [
          'Year-end audit file assembled and cross-referenced',
          'Lead schedules and reconciliations for every material balance',
          'Supporting evidence gathered ahead of fieldwork',
          'Statements prepared for a Qualifying Free Zone Person audit',
        ],
      },
      {
        slug: 'internal-audit',
        name: 'Internal Audit',
        strap: 'Risk, controls & governance review',
        body:
          'Independent testing of whether your controls actually operate, rather than whether they exist on paper. Scoped by risk, reported to whoever is accountable for it.',
        points: [
          'Risk-based internal audit planning',
          'Controls design and operating effectiveness testing',
          'Governance and delegation of authority review',
          'Follow-up on prior findings, tracked to closure',
        ],
      },
      {
        slug: 'external-audit',
        name: 'Audit Coordination',
        strap: 'Managing your appointed auditor',
        body:
          'Running the audit from your side once it starts: handling queries, tracking open points and closing the management letter. Your auditor forms the opinion; we make sure they get what they need to form it on time.',
        points: [
          'Appointing an auditor and agreeing scope and timetable',
          'Single point of contact for audit queries',
          'Group and component auditor coordination',
          'Management letter points tracked to closure',
        ],
      },
      {
        slug: 'accounting-bookkeeping',
        name: 'Accounting & Bookkeeping',
        strap: 'IFRS books, management accounts & VAT',
        body:
          'Bookkeeping and month-end close run to a timetable, producing management accounts you can act on and a ledger that supports both a VAT return and a tax computation.',
        points: [
          'Monthly or quarterly bookkeeping cycles',
          'Month-end and year-end close to a fixed timetable',
          'Management accounts with commentary',
          'Chart of accounts design and remediation',
        ],
      },
      {
        slug: 'cfo-services',
        name: 'CFO Services',
        strap: 'Fractional CFO, reporting & cash flow',
        body:
          'Senior finance capacity without a full-time hire. Cash flow forecasting, board reporting and the financial discipline a growing business needs before it can justify its own CFO.',
        points: [
          'Cash flow forecasting and working capital review',
          'Board and investor reporting packs',
          'Budgeting, variance analysis and KPI design',
          'Finance function structure and hiring support',
        ],
      },
      {
        slug: 'payroll-wps',
        name: 'Payroll & WPS',
        strap: 'Salary processing & WPS compliance',
        body:
          'Payroll processed and filed through the Wage Protection System, with end-of-service calculations handled correctly rather than approximated at the point of departure.',
        points: [
          'Monthly payroll processing and payslips',
          'WPS SIF file preparation and submission',
          'End-of-service gratuity computation',
          'Leave, allowance and deduction tracking',
        ],
      },
    ],
  },
  {
    slug: 'tax',
    name: 'Tax & Advisory',
    strap: 'Corporate Tax, VAT & Transfer Pricing',
    lead:
      'Positions taken deliberately and documented as they are taken — so the reasoning is still in the file when a question arrives eighteen months later.',
    services: [
      {
        slug: 'corporate-tax',
        name: 'Corporate Tax',
        strap: '9% CT, QFZP, Small Business Relief',
        body:
          'Registration through to filing, and support if the Federal Tax Authority asks a question. Reliefs are claimed on a basis we can evidence, not because they were available.',
        points: [
          'Registration and clarification of obligations',
          'Taxable income computation with adjustments evidenced',
          'Qualifying Free Zone Person and de minimis assessment',
          'Small Business Relief and tax group structuring',
          'Return preparation, review and filing',
          'FTA correspondence and enquiry support',
        ],
      },
      {
        slug: 'vat',
        name: 'VAT Services',
        strap: '5% VAT, returns & input tax recovery',
        body:
          'VAT registration, returns and the recovery position — including the apportionment work that decides how much input tax you are actually entitled to reclaim.',
        points: [
          'VAT registration, deregistration and group registration',
          'Periodic return preparation and filing',
          'Input tax recovery and apportionment reviews',
          'Place of supply and zero-rating analysis',
          'Voluntary disclosures and error correction',
        ],
      },
      {
        slug: 'transfer-pricing',
        name: 'Transfer Pricing',
        strap: "Arm's-length, Master & Local File",
        body:
          'Documentation that supports the prices actually charged between related parties, reconciled to the ledger rather than assembled separately from it.',
        points: [
          'Arm’s-length analysis and method selection',
          'Master File and Local File preparation',
          'Benchmarking studies and comparables',
          'Related party disclosure in the CT return',
          'Intra-group agreements review',
        ],
      },
      {
        slug: 'ubo-filing',
        name: 'UBO Filing',
        strap: 'Beneficial-ownership compliance',
        body:
          'Identifying and filing ultimate beneficial ownership, and keeping the register current as shareholdings change — which is where most breaches actually arise.',
        points: [
          'UBO identification and register preparation',
          'Initial and updated filings with the registrar',
          'Nominee director and shareholder disclosures',
          'Ongoing maintenance as ownership changes',
        ],
      },
    ],
  },
  {
    slug: 'risk-compliance',
    name: 'Risk & Compliance',
    strap: 'AML, ESR, UBO, goAML',
    lead:
      'The obligations that carry real penalties and are most often treated as paperwork. We build the framework and keep it current, rather than producing a policy nobody reads.',
    services: [
      {
        slug: 'risk-advisory',
        name: 'Risk Advisory',
        strap: 'GRC — enterprise risk & controls',
        body:
          'Governance, risk and controls work that starts from what could actually go wrong in your business, rather than from a generic register cloned from somewhere else.',
        points: [
          'Enterprise risk assessment and register',
          'Control framework design and documentation',
          'Policy and procedure development',
          'Governance structure and committee support',
        ],
      },
      {
        slug: 'compliance-services',
        name: 'Compliance Services',
        strap: 'AML, ESR, UBO, goAML',
        body:
          'The full obligation set for a UAE entity, handled together — because they share underlying data and are far cheaper to run as one exercise than four.',
        points: [
          'Economic Substance Regulations notification and reporting',
          'UBO register maintenance and filing',
          'goAML registration and ongoing reporting',
          'Regulatory correspondence and remediation',
        ],
      },
      {
        slug: 'aml-compliance',
        name: 'AML Compliance',
        strap: 'DNFBP, MLRO, sanctions screening',
        body:
          'Designated non-financial businesses and professions carry genuine anti-money-laundering duties. We build the framework, provide MLRO support, and keep screening current.',
        points: [
          'AML/CFT policy, risk assessment and procedures',
          'Customer due diligence and record-keeping frameworks',
          'Sanctions and PEP screening processes',
          'MLRO support and suspicious transaction reporting',
          'Staff training and periodic independent review',
        ],
      },
      {
        slug: 'annual-compliance',
        name: 'Annual Compliance',
        strap: 'ESR, UBO, audit & filing calendar',
        body:
          'One calendar covering every recurring obligation, generated from your financial year end rather than maintained by hand in a spreadsheet somebody owns.',
        points: [
          'Obligation calendar derived from your year end',
          'Licence renewal and establishment card tracking',
          'Coordinated audit, tax and regulatory deadlines',
          'Advance reminders with the work already scoped',
        ],
      },
      {
        slug: 'trademark-registration',
        name: 'Trademark Registration',
        strap: 'Trademark search, filing & renewal',
        // Filing before the Ministry of Economy on another person's behalf is
        // reserved to registered trademark agents. The copy describes the
        // search, preparation and portfolio work, and says plainly that the
        // filing goes through a registered agent where the law requires one —
        // true whether or not the practice holds that registration itself.
        body:
          'Searching, preparing and maintaining your marks with the Ministry of Economy, starting with the searches that establish whether a mark is available before you commit to it. Where the law requires it, the filing itself is made through a registered trademark agent.',
        points: [
          'Availability searches and class selection',
          'Application prepared, and filed through a registered trademark agent where required',
          'Renewals and portfolio maintenance',
          'Assignment and licensing records',
        ],
      },
    ],
  },
];

export const findGroup = (slug: string) =>
  SERVICE_GROUPS.find((group) => group.slug === slug);

/** Every service across all groups, for counts and search-style listings. */
export const ALL_SERVICES = SERVICE_GROUPS.flatMap((g) => g.services);

/* -------------------------------------------------------------------------
   Platform roadmap
   -------------------------------------------------------------------------
   `stage` is shown to visitors verbatim. Nothing marked 'idea' is described as
   though it exists — these are explicitly things we intend to build, and the
   platform page says so.

   'private beta' means running for real users but not yet a commercial
   engagement. Do not promote anything to 'live' until it is in production with
   a paying client: a stage claim on a finance product is a factual claim about
   the business, not marketing copy.                                           */

export type Product = {
  slug: string;
  name: string;
  strap: string;
  stage: 'private beta' | 'live' | 'idea';
  body: string;
  points: string[];
  href?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: 'corporate-tax',
    name: 'Corporate Tax Engine',
    strap: 'Trial balance to filed return',
    stage: 'private beta',
    href: '/platform/corporate-tax/',
    body:
      'Reads the trial balance, applies the adjustments you have defined, computes the liability, and keeps the working papers attached to every line.',
    points: [
      'Adjustment library you control, versioned by period',
      'Zero band, relief elections and instalments in one computation',
      'Printable computation with references to source entries',
    ],
  },
  {
    slug: 'fs-studio',
    name: 'FS Studio',
    strap: 'IFRS statements, generated',
    stage: 'private beta',
    href: '/platform/fs-studio/',
    body:
      'Financial statements derived from the mapped ledger rather than retyped into a template. Change a mapping and every affected note moves with it.',
    points: [
      'IFRS and IFRS for SMEs presentation sets',
      'Notes that recompute when the mapping changes',
      'Comparatives locked to the prior filed position',
    ],
  },
  /* Roadmap, revised 11 October 2026. The earlier four (e-invoicing bridge,
     VAT engine, transfer pricing studio, obligation console) were dropped by
     the owner. These seven share one shape: bring your own data, get a
     derived answer, nothing leaves the browser unless you choose to send it.
     The first three are a sequence — score the ledger, open the workbook,
     propose the mapping — and each creates the need for the next. */
  {
    slug: 'trial-balance-readiness',
    name: 'Trial Balance Readiness Score',
    strap: 'Can your ledger carry a computation?',
    stage: 'idea',
    body:
      'Upload a trial balance and get a scored report on whether it can support a Corporate Tax computation — mixed accounts, entertainment not split, no related-party tagging, provisions missing. Most implementations stall on the ledger, not the software; this says so before anyone is engaged.',
    points: [
      'Runs in the browser; the trial balance is never uploaded to us',
      'Each finding names the account and the rule it fails',
      'The same checks our own implementation starts with',
    ],
  },
  {
    slug: 'workbook-autopsy',
    name: 'Workbook Autopsy',
    strap: 'How the year-end file actually derives its figure',
    stage: 'idea',
    body:
      'Open the workbook the computation currently lives in and map how the final figure is really produced: formula dependencies, numbers typed inside formulas, circular logic, links to files nobody can find, sheets nothing reads. The result is a picture of the dependency, not a verdict on the person who built it.',
    points: [
      'Dependency map from the filed figure back to every input',
      'Hard-coded values and overrides listed with their cell',
      'Hand-over document generated from the map',
    ],
  },
  {
    slug: 'chart-of-accounts-mapper',
    name: 'Chart of Accounts Mapper',
    strap: 'One structure for the statements and the return',
    stage: 'idea',
    body:
      'The step after the readiness score. Upload the chart; get a proposed mapping to a structure that carries both statutory presentation and the tax computation, the accounts that have to be split, and an exportable new chart. What you change, before anything is connected.',
    points: [
      'Proposed mapping for every account, with the reason',
      'Split list: the accounts that mix deductible and non-deductible',
      'Exports to the ledger formats SMEs actually use',
    ],
  },
  {
    slug: 'bank-statement-health-check',
    name: 'Bank Statement Health Check',
    strap: 'Does the bank agree with the books?',
    stage: 'idea',
    body:
      'Bring a statement export and a ledger export. The check reconciles them and flags what a year end would otherwise find in December: unmatched items, round-sum cash movements, entries outstanding for months, gaps in the sequence. A reconciliation report, not a judgement.',
    points: [
      'Statement-to-ledger matching with the exceptions listed',
      'Ageing of every unmatched item',
      'Repeatable each month, so December holds no surprises',
    ],
  },
  {
    slug: 'vat-return-sanity-check',
    name: 'VAT Return Sanity Check',
    strap: 'Recompute the boxes before you file',
    stage: 'idea',
    body:
      'Upload the period’s sales and purchase listings. The check recomputes each box of the return, tests the reverse charge, zero-rating and blocked input tax patterns, and shows where your figure and the recomputed one differ — with the transactions behind the difference.',
    points: [
      'Box-by-box recomputation from the listings',
      'Pattern tests for the errors that FTA audits find',
      'Differences traced to the transactions that cause them',
    ],
  },
  {
    slug: 'registration-deadline-finder',
    name: 'Registration & Deadline Finder',
    strap: 'Your first tax period, derived from your licence',
    stage: 'idea',
    body:
      'Licence date, year end and entity type in; registration position, first tax period, filing date and payment date out — each with the published rule it comes from. Built for the businesses that set their first period wrong, or registered late and paid for it.',
    points: [
      'Dates derived from the rules, with the source cited',
      'What to check against your EmaraTax record',
      'Re-run when the year end or licence changes',
    ],
  },
  {
    slug: 'small-business-relief-check',
    name: 'Small Business Relief Check',
    strap: 'Whether to elect, and what it costs you',
    stage: 'idea',
    body:
      'Revenue, group membership, free zone status and entity type in; eligibility out, together with the consequence most people miss — the losses and interest you give up by electing. An extension of the estimator on this site, and still not advice.',
    points: [
      'Eligibility tested against every published condition',
      'The election’s cost shown, not just its saving',
      'Carries into the Corporate Tax Engine as a position you took',
    ],
  },
];

/** Products that actually exist, whatever stage they are at. Derived from the
 *  absence of 'idea' rather than the presence of 'live', so promoting a product
 *  from private beta to live does not silently empty this list. */
export const BUILT_PRODUCTS = PRODUCTS.filter((p) => p.stage !== 'idea');
export const IDEA_PRODUCTS = PRODUCTS.filter((p) => p.stage === 'idea');
