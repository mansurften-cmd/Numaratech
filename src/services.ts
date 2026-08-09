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
    slug: 'accounting-audit',
    name: 'Accounting & Audit',
    strap: 'IFRS, outsourced CFO, statutory audit',
    lead:
      'Books that can carry a filing, and the assurance work that tests them. From day-to-day bookkeeping through to a statutory audit opinion.',
    services: [
      {
        slug: 'audit-assurance',
        name: 'Audit & Assurance',
        strap: 'MoE-registered statutory & QFZP audit',
        body:
          'Statutory audit performed by an auditor registered with the Ministry of Economy, including the audited financial statements a Qualifying Free Zone Person must hold to keep that status.',
        points: [
          'MoE-registered statutory audit',
          'QFZP audit supporting the 0% qualifying income position',
          'Free zone authority reporting requirements',
          'Audit of group and consolidated statements',
        ],
      },
      {
        slug: 'internal-audit',
        name: 'Internal Audit',
        strap: 'Risk, controls & governance assurance',
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
        name: 'External Audit',
        strap: 'Statutory ISA audit & IFRS opinion',
        body:
          'A full-scope audit under International Standards on Auditing, concluding in an opinion on financial statements prepared under IFRS or IFRS for SMEs.',
        points: [
          'ISA-compliant audit approach and documentation',
          'Opinion on IFRS or IFRS for SMEs statements',
          'Management letter on control observations',
          'Coordination with group auditors where relevant',
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
        strap: 'Brand & IP registration with the MoE',
        body:
          'Registering and maintaining your marks with the Ministry of Economy, including the searches that establish whether a mark is available before you commit to it.',
        points: [
          'Availability searches and class selection',
          'Application and prosecution with the MoE',
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
   platform page says so. Do not promote an item to 'live' until it is.        */

export type Product = {
  slug: string;
  name: string;
  strap: string;
  stage: 'live' | 'idea';
  body: string;
  points: string[];
  href?: string;
};

export const PRODUCTS: Product[] = [
  {
    slug: 'corporate-tax',
    name: 'Corporate Tax Engine',
    strap: 'Trial balance to filed return',
    stage: 'live',
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
    stage: 'live',
    href: '/platform/fs-studio/',
    body:
      'Financial statements derived from the mapped ledger rather than retyped into a template. Change a mapping and every affected note moves with it.',
    points: [
      'IFRS and IFRS for SMEs presentation sets',
      'Notes that recompute when the mapping changes',
      'Comparatives locked to the prior filed position',
    ],
  },
  {
    slug: 'e-invoicing-bridge',
    name: 'e-Invoicing Bridge',
    strap: 'Ledger to the UAE mandate',
    stage: 'idea',
    body:
      'Middleware between your accounting system and the UAE e-invoicing regime — validating, formatting and transmitting, with a durable record of what was sent and acknowledged.',
    points: [
      'Connects existing ledgers without replacing them',
      'Validation before transmission, not after rejection',
      'Acknowledgement and exception tracking',
    ],
  },
  {
    slug: 'vat-engine',
    name: 'VAT Engine',
    strap: 'Returns from the mapped ledger',
    stage: 'idea',
    body:
      'VAT returns computed from the same mapped ledger the tax engine reads, with input tax recovery and apportionment handled as a position you take rather than a number you type.',
    points: [
      'Return computed from source transactions',
      'Input tax recovery and apportionment workings',
      'Reconciliation between the return and the ledger',
    ],
  },
  {
    slug: 'transfer-pricing-studio',
    name: 'Transfer Pricing Studio',
    strap: 'Master and Local File, reconciled',
    stage: 'idea',
    body:
      'Transfer pricing documentation generated from related party data already in the ledger, so the file agrees with the accounts instead of being built alongside them.',
    points: [
      'Related party transactions pulled from the ledger',
      'Master File and Local File structure maintained',
      'Documentation that reconciles to the filed return',
    ],
  },
  {
    slug: 'compliance-console',
    name: 'Compliance & Obligation Console',
    strap: 'Every deadline, derived',
    stage: 'idea',
    body:
      'One console for ESR, UBO, AML and filing obligations across a portfolio, with each deadline generated from the entity record rather than maintained by hand.',
    points: [
      'Obligations derived from year end and licence data',
      'Portfolio view across every entity you manage',
      'Evidence of what was filed, when, and by whom',
    ],
  },
];

export const LIVE_PRODUCTS = PRODUCTS.filter((p) => p.stage === 'live');
export const IDEA_PRODUCTS = PRODUCTS.filter((p) => p.stage === 'idea');
