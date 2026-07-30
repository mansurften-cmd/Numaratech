// NUMARATECH — single source of truth for site metadata and navigation.
// Note the spelling: NUMARATECH, all caps, one word, with an A.

export const SITE = {
  name: 'NUMARATECH',
  /** Used in <title> suffixes and structured data. */
  legalName: 'NUMARATECH',
  tagline: 'Finance and compliance infrastructure for UAE business.',
  description:
    'NUMARATECH builds the systems UAE businesses and accounting firms use to close their books, compute Corporate Tax, and file with confidence.',
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

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string; note?: string }[];
};

export const NAV: NavItem[] = [
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
        label: 'Client Portal',
        href: '/platform/client-portal/',
        note: 'One place for documents, queries and approvals',
      },
    ],
  },
  { label: 'Services', href: '/services/' },
  { label: 'Insights', href: '/insights/' },
  { label: 'About', href: '/about/' },
];

export const FOOTER_NAV = [
  {
    heading: 'Platform',
    links: [
      { label: 'Overview', href: '/platform/' },
      { label: 'Corporate Tax Engine', href: '/platform/corporate-tax/' },
      { label: 'FS Studio', href: '/platform/fs-studio/' },
      { label: 'Client Portal', href: '/platform/client-portal/' },
    ],
  },
  {
    heading: 'Company',
    links: [
      { label: 'About', href: '/about/' },
      { label: 'Services', href: '/services/' },
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
