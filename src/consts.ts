// NUMARATECH — single source of truth for site metadata and navigation.
// Note the spelling: NUMARATECH, all caps, one word, with an A.

export const SITE = {
  name: 'NUMARATECH',
  /**
   * Full registered name, used in the footer and on the legal pages. The trading
   * name everywhere else is simply NUMARATECH.
   */
  legalName: 'NUMARATECH FOR ACCOUNTING AND TAX CONSULTANTS',
  tagline: 'Finance and compliance for UAE business — advisory and platform.',
  description:
    'NUMARATECH is a UAE accounting and tax consultancy, and the team behind a platform for Corporate Tax, financial statements and client workflow. Advisory when you need judgement; software when you need it repeatable.',
  url: 'https://numaratech.com',
  locale: 'en_AE',
  email: 'hello@numaratech.com',
  phoneDisplay: '+971 4 000 0000',
  phoneHref: '+97140000000',
  address: {
    line1: 'Business Bay',
    city: 'Dubai',
    country: 'United Arab Emirates',
  },
} as const;

/**
 * The full, gated UAE Corporate Tax calculator, which lives outside this site.
 *
 * Point `url` at whichever deployment is current — the Base44 build or the
 * Cloudflare one. Every link to the full calculator on this site reads this
 * value, so switching hosts is a one-line change.
 *
 * Set `url` to an empty string to hide every link to it site-wide; the free
 * on-site estimator continues to work either way.
 */
export const CALCULATOR = {
  url: 'https://numaratech.base44.app',
  /** Shown as the link text. */
  label: 'Open the full Corporate Tax calculator',
  /** One line explaining what the full tool adds over the on-site estimator. */
  note:
    'Handles free zone qualifying income, groups, loss relief and instalments, and saves your workings.',
  /** True if the external tool asks for contact details before showing results. */
  gated: true,
} as const;

/** Whether a link to the external calculator should be rendered at all. */
export const hasCalculator = () => CALCULATOR.url.trim() !== '';

/**
 * Contact form delivery, via Web3Forms (https://web3forms.com).
 *
 * The form posts straight from the visitor's browser to Web3Forms, which
 * forwards the message to your mailbox. There is no server-side code and no
 * server secret — which is why this site deploys as pure static assets.
 *
 * `accessKey` is a PUBLIC key. Web3Forms is designed for it to sit in
 * client-side markup, so committing it here is expected and not a leak. It is
 * not a credential for anything other than delivering to your own address.
 *
 * To activate the form: enter your email at https://web3forms.com, paste the
 * access key they send you below, and redeploy. While it is blank the contact
 * page hides the form and shows the direct email details instead — a visible
 * gap rather than a form that silently discards enquiries.
 */
export const WEB3FORMS = {
  accessKey: '',
  endpoint: 'https://api.web3forms.com/submit',
  /** Subject line on the email that reaches you. */
  subject: 'Website enquiry — NUMARATECH',
} as const;

/** True once an access key is present, so the form can be rendered. */
export const hasContactForm = () => WEB3FORMS.accessKey.trim() !== '';

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

// Two offerings, kept deliberately separate: the licensed advisory practice and
// the software platform. Advisory comes first — it is the regulated business.
//
// The advisory children mirror the practice's own three groups. Each group page
// carries its services as anchored sections, so the menu stays at three entries
// rather than listing all seventeen.
export const NAV: NavItem[] = [
  {
    label: 'Advisory',
    href: '/advisory/',
    children: [
      {
        label: 'Accounting & Audit',
        href: '/advisory/accounting-audit/',
        note: 'IFRS, outsourced CFO, statutory audit',
      },
      {
        label: 'Tax & Advisory',
        href: '/advisory/tax/',
        note: 'Corporate Tax, VAT & Transfer Pricing',
      },
      {
        label: 'Risk & Compliance',
        href: '/advisory/risk-compliance/',
        note: 'AML, ESR, UBO, goAML',
      },
    ],
  },
  {
    label: 'Platform',
    href: '/platform/',
    children: [
      {
        label: 'Corporate Tax Engine',
        href: '/platform/corporate-tax/',
        note: 'Compute, reconcile and file UAE Corporate Tax',
      },
      {
        label: 'FS Studio',
        href: '/platform/fs-studio/',
        note: 'IFRS financial statements from your ledger',
      },
      {
        label: 'Roadmap',
        href: '/platform/#roadmap',
        note: 'What we intend to build next',
      },
      {
        label: 'Implementation and support',
        href: '/services/',
        note: 'Getting the platform running on your ledger',
      },
    ],
  },
  { label: 'Business case', href: '/business-case/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
];

export const FOOTER_NAV = [
  {
    heading: 'Advisory',
    links: [
      { label: 'Overview', href: '/advisory/' },
      { label: 'Accounting & Audit', href: '/advisory/accounting-audit/' },
      { label: 'Tax & Advisory', href: '/advisory/tax/' },
      { label: 'Risk & Compliance', href: '/advisory/risk-compliance/' },
    ],
  },
  {
    heading: 'Platform',
    links: [
      { label: 'Overview', href: '/platform/' },
      { label: 'Corporate Tax Engine', href: '/platform/corporate-tax/' },
      { label: 'FS Studio', href: '/platform/fs-studio/' },
      { label: 'Roadmap', href: '/platform/#roadmap' },
      { label: 'Implementation and support', href: '/services/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Business case', href: '/business-case/' },
      { label: 'Insights', href: '/insights/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    heading: 'Legal',
    links: [
      { label: 'Privacy notice', href: '/privacy/' },
      { label: 'Terms of use', href: '/terms/' },
    ],
  },
] as const;

/**
 * Publicly documented UAE Corporate Tax parameters used by the on-site
 * estimator. These are statutory figures, not NUMARATECH opinion — they are
 * kept here so a single edit updates every page that cites them.
 *
 * Review against the current Federal Tax Authority guidance before each
 * release; tax law changes and this file is the place it must be reflected.
 */
export const UAE_CT = {
  /** Headline rate applied to taxable income above the threshold. */
  standardRate: 0.09,
  /** Taxable income up to and including this amount is taxed at 0%. */
  zeroBandCeiling: 375_000,
  /** Revenue ceiling for electing Small Business Relief. */
  smallBusinessReliefRevenueCap: 3_000_000,
  currency: 'AED',
  /** Regime applies to financial years beginning on or after this date. */
  effectiveFrom: '1 June 2023',
} as const;
