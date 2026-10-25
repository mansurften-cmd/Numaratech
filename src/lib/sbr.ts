/**
 * Small Business Relief eligibility, as a pure function.
 *
 * The rules, from Ministerial Decision No. 73 of 2023 as amended by
 * Ministerial Decision No. 131 of 2026, and Article 21 of Federal Decree-Law
 * No. 47 of 2022:
 *
 *   1. The person is a Resident Person.
 *   2. The tax period starts on or after 1 June 2023 and ends on or before
 *      31 December 2029.
 *   3. Revenue does not exceed AED 3,000,000 in the tax period AND in every
 *      earlier tax period — one period over the threshold ends eligibility
 *      for every period after it.
 *   4. The person is not a Qualifying Free Zone Person.
 *   5. The person is not a member of a Multinational Enterprise Group
 *      (consolidated group revenue of AED 3.15 billion or more, per Cabinet
 *      Decision No. 44 of 2020).
 *
 * And the cost of electing: a tax loss, or net interest expenditure, incurred
 * in a period for which the relief is elected cannot be carried forward.
 *
 * No DOM here, so the same function runs in the page script and in the
 * verification harness. It answers "is the relief available"; whether to
 * elect it is a judgement the result frames but does not make.
 */

export const SBR = {
  revenueCap: 3_000_000,
  /** ISO dates. A period must start on or after `firstPeriodStart` and end
   *  on or before `lastPeriodEnd`. */
  firstPeriodStart: '2023-06-01',
  lastPeriodEnd: '2029-12-31',
} as const;

/** Unanswered questions are null; the result is then 'incomplete'. */
export type SbrInputs = {
  /** ISO date, YYYY-MM-DD, or '' when blank. */
  periodEnd: string;
  /** AED; null when blank or unreadable. */
  revenue: number | null;
  /** Did every earlier tax period (since 1 June 2023) have revenue at or
   *  below the threshold? 'first' when this is the first tax period. */
  earlier: 'yes' | 'no' | 'first' | null;
  resident: boolean | null;
  qfzp: boolean | null;
  mne: boolean | null;
  /** Does the business expect a tax loss this period? Not a condition — it
   *  is what electing would cost. */
  loss: boolean | null;
};

export type SbrTest = {
  key: 'period' | 'revenue' | 'earlier' | 'resident' | 'qfzp' | 'mne';
  label: string;
  /** true passes, false fails, null not yet answered. */
  ok: boolean | null;
  note: string;
};

export type SbrResult = {
  status: 'available' | 'not-available' | 'incomplete';
  tests: SbrTest[];
  /** Short headline for the result panel and the live region. */
  headline: string;
  /** What electing means for this business, when the relief is available. */
  consequences: string[];
};

const aed = (n: number) => `AED ${new Intl.NumberFormat('en-AE').format(n)}`;

const isIsoDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(`${s}T00:00:00Z`));

export function checkSbr(input: SbrInputs): SbrResult {
  const tests: SbrTest[] = [];

  // 1. Tax period window. ISO dates compare correctly as strings.
  if (!isIsoDate(input.periodEnd)) {
    tests.push({ key: 'period', label: 'Tax period', ok: null, note: 'Enter the date the tax period ends.' });
  } else if (input.periodEnd > SBR.lastPeriodEnd) {
    tests.push({
      key: 'period',
      label: 'Tax period',
      ok: false,
      note: 'The relief is available only for tax periods ending on or before 31 December 2029.',
    });
  } else if (input.periodEnd < SBR.firstPeriodStart) {
    tests.push({
      key: 'period',
      label: 'Tax period',
      ok: false,
      note: 'Corporate Tax applies to tax periods starting on or after 1 June 2023; this period ends before then.',
    });
  } else {
    tests.push({ key: 'period', label: 'Tax period', ok: true, note: 'Ends on or before 31 December 2029.' });
  }

  // 2. This period's revenue.
  if (input.revenue === null) {
    tests.push({ key: 'revenue', label: 'Revenue this period', ok: null, note: 'Enter revenue for the period.' });
  } else if (input.revenue > SBR.revenueCap) {
    tests.push({
      key: 'revenue',
      label: 'Revenue this period',
      ok: false,
      note: `${aed(input.revenue)} is above the ${aed(SBR.revenueCap)} threshold.`,
    });
  } else {
    tests.push({
      key: 'revenue',
      label: 'Revenue this period',
      ok: true,
      note: `${aed(input.revenue)} is within the ${aed(SBR.revenueCap)} threshold.`,
    });
  }

  // 3. Every earlier period.
  tests.push(
    input.earlier === null
      ? { key: 'earlier', label: 'Earlier periods', ok: null, note: 'Answer whether any earlier period was over the threshold.' }
      : input.earlier === 'no'
        ? {
            key: 'earlier',
            label: 'Earlier periods',
            ok: false,
            note: 'An earlier period above the threshold ends eligibility for every later period.',
          }
        : {
            key: 'earlier',
            label: 'Earlier periods',
            ok: true,
            note: input.earlier === 'first' ? 'This is the first tax period.' : 'Every earlier period was within the threshold.',
          }
  );

  // 4–6. Who the person is.
  tests.push(
    input.resident === null
      ? { key: 'resident', label: 'Resident Person', ok: null, note: 'Answer whether the business is a UAE Resident Person.' }
      : input.resident
        ? { key: 'resident', label: 'Resident Person', ok: true, note: 'The relief is for Resident Persons.' }
        : { key: 'resident', label: 'Resident Person', ok: false, note: 'Only a Resident Person may elect the relief.' }
  );
  tests.push(
    input.qfzp === null
      ? { key: 'qfzp', label: 'Qualifying Free Zone Person', ok: null, note: 'Answer whether the business is a Qualifying Free Zone Person.' }
      : input.qfzp
        ? {
            key: 'qfzp',
            label: 'Qualifying Free Zone Person',
            ok: false,
            note: 'A Qualifying Free Zone Person cannot elect the relief.',
          }
        : { key: 'qfzp', label: 'Qualifying Free Zone Person', ok: true, note: 'Not a Qualifying Free Zone Person.' }
  );
  tests.push(
    input.mne === null
      ? { key: 'mne', label: 'Multinational group', ok: null, note: 'Answer whether the business is in a large multinational group.' }
      : input.mne
        ? {
            key: 'mne',
            label: 'Multinational group',
            ok: false,
            note: 'A member of a multinational group with consolidated revenue of AED 3.15 billion or more cannot elect.',
          }
        : { key: 'mne', label: 'Multinational group', ok: true, note: 'Not a member of a large multinational group.' }
  );

  const failed = tests.filter((test) => test.ok === false);
  const open = tests.filter((test) => test.ok === null);

  if (failed.length) {
    return {
      status: 'not-available',
      tests,
      headline:
        failed.length === 1
          ? `Small Business Relief is not available: ${failed[0].label.toLowerCase()}.`
          : `Small Business Relief is not available: ${failed.length} conditions are not met.`,
      consequences: [],
    };
  }
  if (open.length) {
    return {
      status: 'incomplete',
      tests,
      headline: `${open.length} of ${tests.length} questions still to answer.`,
      consequences: [],
    };
  }

  const consequences = [
    'If elected, the business is treated as having no taxable income for the period, so no Corporate Tax is due for it.',
    'The election is made in the Corporate Tax return, period by period. The business must still be registered and must still file.',
  ];
  consequences.push(
    input.loss === true
      ? 'You expect a tax loss. Electing would forfeit it: a loss incurred in a period for which the relief is elected cannot be carried forward. With no tax due either way, not electing and keeping the loss may be worth more.'
      : 'A tax loss, or net interest expenditure, incurred in a period for which the relief is elected cannot be carried forward. Losses from earlier periods in which it was not elected are not affected.'
  );
  consequences.push(
    'The Federal Tax Authority can deny the relief where a business has been artificially separated to stay under the threshold.'
  );

  return {
    status: 'available',
    tests,
    headline: 'Small Business Relief appears to be available for this period.',
    consequences,
  };
}
