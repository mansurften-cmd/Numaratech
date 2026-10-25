// Fixed fees. The single source for every price on the site: the /fees/
// page, each service page's fee block, and the structured data offers.
//
// SET BY CLAUDE ON 25 OCTOBER 2026, AT THE OWNER'S REQUEST, AS STARTING
// FIGURES FOR THE OWNER TO CHANGE. They are based on what the practice has
// actually invoiced in 2025–26 (Notion, Payment Tracker: Corporate Tax
// registration AED 600–750, VAT registration AED 500–750, VAT returns about
// AED 700, bookkeeping AED 600 a month, goAML registration AED 1,500) and on
// the figures quoted in the practice's own fee discussions (a Small Business
// Relief return at about AED 1,000). Change a number here and every page
// that shows it follows.
//
// A price on a finance firm's site is a promise. Each one is the fee for a
// straightforward case — one entity, records in order — and the terms on
// the /fees/ page say so. "from" marks a fee that rises with volume or
// complexity; the fixed figure is always confirmed in writing first.

export type Fee = {
  id: string;
  /** What the fee buys, as it reads in the fee table. */
  label: string;
  amount: number;
  /** True when the amount is a starting point rather than the whole fee. */
  from: boolean;
  unit: 'one-off' | 'per return' | 'a month';
  /** One line on what sets the fee, shown under the label. */
  note: string;
  /** The dedicated page, where there is one. */
  href?: string;
};

export const FEES: Fee[] = [
  {
    id: 'ct-registration',
    label: 'Corporate Tax registration',
    amount: 750,
    from: false,
    unit: 'one-off',
    note: 'One entity, through to the registration certificate.',
    href: '/advisory/tax/corporate-tax-registration/',
  },
  {
    id: 'ct-return-sbr',
    label: 'Corporate Tax return with Small Business Relief',
    amount: 1_000,
    from: false,
    unit: 'per return',
    note: 'Eligibility checked, the election made, the return filed.',
    href: '/advisory/tax/corporate-tax-return/',
  },
  {
    id: 'ct-return-full',
    label: 'Corporate Tax return with full computation',
    amount: 2_500,
    from: true,
    unit: 'per return',
    note: 'Set by the number of adjustments and reliefs in the computation.',
    href: '/advisory/tax/corporate-tax-return/',
  },
  {
    id: 'ct-deregistration',
    label: 'Corporate Tax deregistration',
    amount: 750,
    from: false,
    unit: 'one-off',
    note: 'Once the final return is filed and the licence cancelled.',
  },
  {
    id: 'vat-registration',
    label: 'VAT registration',
    amount: 750,
    from: false,
    unit: 'one-off',
    note: 'Threshold checked, application made, certificate obtained.',
    href: '/advisory/tax/vat-registration/',
  },
  {
    id: 'vat-return',
    label: 'VAT return',
    amount: 750,
    from: true,
    unit: 'per return',
    note: 'Set by the number of transactions in the period.',
    href: '/advisory/tax/vat-return-filing/',
  },
  {
    id: 'vat-deregistration',
    label: 'VAT deregistration',
    amount: 750,
    from: false,
    unit: 'one-off',
    note: 'Application and the final return.',
  },
  {
    id: 'bookkeeping',
    label: 'Bookkeeping and management accounts',
    amount: 750,
    from: true,
    unit: 'a month',
    note: 'Set by monthly transaction volume and the number of bank accounts.',
    href: '/advisory/accounting-audit/bookkeeping/',
  },
  {
    id: 'goaml-registration',
    label: 'goAML registration',
    amount: 1_500,
    from: false,
    unit: 'one-off',
    note: 'Supervisor and goAML registration, through to approval.',
    href: '/advisory/risk-compliance/goaml-registration/',
  },
];

export const findFee = (id: string): Fee => {
  const fee = FEES.find((entry) => entry.id === id);
  if (!fee) throw new Error(`No fee with id "${id}" in src/fees.ts`);
  return fee;
};

const nf = new Intl.NumberFormat('en-AE');

/** "AED 750" or "from AED 2,500". */
export const feeAmount = (fee: Fee) => `${fee.from ? 'from ' : ''}AED ${nf.format(fee.amount)}`;

/** "AED 750 per return", "from AED 750 a month", "AED 750" for one-off. */
export const feeText = (fee: Fee) => (fee.unit === 'one-off' ? feeAmount(fee) : `${feeAmount(fee)} ${fee.unit}`);

/** The terms every fee is quoted under. Shown on /fees/ and on each
 *  service page, so a price is never shown without them. */
export const FEE_TERMS = [
  'Each fee is for a straightforward case: one entity, with its records in order. If yours needs more, we tell you the fixed fee in writing before any work starts — never after.',
  'Fees do not include penalties already imposed by the Federal Tax Authority or any other authority, or VAT where it applies to our fee.',
  'Work outside the agreed scope is quoted, and agreed, before it is done.',
];
