/**
 * The demo entity used by every illustrative figure on the site.
 *
 * /platform/ and /platform/corporate-tax/ previously carried two different
 * datasets for the same fictional company — adjustments of 66,150 in the
 * mockup against 75,000 in the calculator's defaults, so the two pages showed
 * different taxable income for the same accounting profit (A13). Both footed
 * internally, which is exactly why nobody noticed.
 *
 * Everything below is derived from ADJUSTMENTS and the statutory parameters in
 * consts.ts. Nothing here is a typed-in total, so the figures cannot drift
 * apart again.
 *
 * These are illustrative figures for a fictional entity. They are not a
 * client's numbers and are not a worked example anyone should rely on — every
 * surface that renders them carries an "Illustrative figures" caption.
 */
import { UAE_CT } from './consts';

/** Corporate Tax on a pre-tax figure: flat rate above the zero band. */
export function corporateTax(taxableIncome: number): number {
  const chargeable = Math.max(0, taxableIncome - UAE_CT.zeroBandCeiling);
  return chargeable * UAE_CT.standardRate;
}

/* -------------------------------------------------------------------------
   Corporate Tax Engine demo — /platform/ mockup and the calculator defaults
   ------------------------------------------------------------------------- */

export const DEMO_ACCOUNTING_PROFIT = 1_250_000;

/** Named adjustments with their journal references. The total is summed. */
export const ADJUSTMENTS = [
  { label: 'Entertainment — 50% disallowed', amount: 32_400, ref: 'JE-114' },
  { label: 'Depreciation — accounting vs tax', amount: 18_750, ref: 'JE-207' },
  { label: 'Provision — not yet incurred', amount: 15_000, ref: 'JE-291' },
  { label: 'Interest — cap not exceeded', amount: 0, ref: null },
] as const;

export const DEMO_ADJUSTMENTS_TOTAL = ADJUSTMENTS.reduce((sum, a) => sum + a.amount, 0);
export const DEMO_TAXABLE_INCOME = DEMO_ACCOUNTING_PROFIT + DEMO_ADJUSTMENTS_TOTAL;
export const DEMO_ZERO_BAND = Math.min(DEMO_TAXABLE_INCOME, UAE_CT.zeroBandCeiling);
export const DEMO_CHARGEABLE = Math.max(0, DEMO_TAXABLE_INCOME - UAE_CT.zeroBandCeiling);
export const DEMO_TAX = corporateTax(DEMO_TAXABLE_INCOME);
export const DEMO_EFFECTIVE_RATE = DEMO_TAX / DEMO_TAXABLE_INCOME;

/* -------------------------------------------------------------------------
   FS Studio demo — statement of profit or loss
   -------------------------------------------------------------------------
   The statement ran Revenue -> ... -> "Profit for the year" with no tax line,
   while the notes panel beside it listed "7 · Income tax" (A7). For a 31
   December year end the first UAE Corporate Tax period begins 1 January 2024,
   so both columns are within the regime and both carry a charge. */

type PlYear = { revenue: number; costOfSales: number; adminExpenses: number };

const PL_INPUT: Record<'y2025' | 'y2024', PlYear> = {
  y2025: { revenue: 8_420_000, costOfSales: 5_180_000, adminExpenses: 1_915_000 },
  y2024: { revenue: 7_105_000, costOfSales: 4_466_000, adminExpenses: 1_702_000 },
};

function derivePl(y: PlYear) {
  const grossProfit = y.revenue - y.costOfSales;
  const profitBeforeTax = grossProfit - y.adminExpenses;
  const incomeTax = corporateTax(profitBeforeTax);
  return {
    ...y,
    grossProfit,
    profitBeforeTax,
    incomeTax,
    profitForTheYear: profitBeforeTax - incomeTax,
  };
}

export const DEMO_PL = {
  current: derivePl(PL_INPUT.y2025),
  prior: derivePl(PL_INPUT.y2024),
};

/** Grouping thousands the way the statements do. Negatives in brackets. */
export const fig = (n: number): string => {
  const rounded = Math.round(n);
  const s = Math.abs(rounded).toLocaleString('en-AE');
  return rounded < 0 ? `(${s})` : s;
};

/** Bracketed presentation for amounts that are deductions on the face. */
export const neg = (n: number): string => `(${Math.round(Math.abs(n)).toLocaleString('en-AE')})`;
