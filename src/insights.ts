// Insight index. Each entry has a matching page under src/pages/insights/.
// Keeping the metadata here means the home page, the index and the article
// header all read the same record.

import { findPerson, bylineOf, type Person } from './people';

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date — used for <time datetime> and sorting. */
  date: string;
  /** Search-result description, when the summary is longer than the 160
   *  characters a result shows. Falls back to the summary. */
  description?: string;
  /** ISO date of the last substantive correction, if any. Shown in the
   *  byline and emitted as schema.org dateModified. */
  updated?: string;
  readingMinutes: number;
  topic: string;
  /**
   * Byline: the id of an entry in src/people.ts. Rendered on the article,
   * linked to the profile on /about/, and used as the schema.org Person
   * `author` (A10). Without one the practice is the author — an
   * organisation is a valid author, and attributing to a person who did not
   * write it would be worse than attributing to the firm that did.
   */
  authorId?: string;
};

/** Shown when an entry names no individual. */
export const DEFAULT_AUTHOR = 'The NUMARATECH team';

export const authorPersonOf = (insight: Insight): Person | undefined =>
  insight.authorId ? findPerson(insight.authorId) : undefined;

export const authorOf = (insight: Insight): string => {
  const person = authorPersonOf(insight);
  return person ? bylineOf(person) : DEFAULT_AUTHOR;
};

export const INSIGHTS: Insight[] = [
  {
    slug: 'small-business-relief-extended-to-2029',
    title: 'Small Business Relief runs to 2029. Check before you elect.',
    summary:
      'Ministerial Decision No. 131 of 2026 extends the relief to tax periods ending on or before 31 December 2029. The threshold is unchanged, the test is still cumulative, and electing still has a cost.',
    description:
      'UAE Small Business Relief is extended to tax periods ending by 31 December 2029. Who can elect, the cumulative AED 3m test, and what electing costs.',
    date: '2026-10-25',
    readingMinutes: 5,
    topic: 'Corporate Tax',
    authorId: 'mansur-kothambawala',
  },
  {
    slug: 'first-corporate-tax-return-what-breaks',
    title: 'The first Corporate Tax return: where it actually breaks',
    summary:
      'Registration is the easy part. The failures we see are upstream — a chart of accounts that cannot support a tax computation, and adjustments nobody can evidence twelve months later.',
    description:
      'Where first UAE Corporate Tax returns actually fail: a chart of accounts that cannot carry a computation, and adjustments nobody can evidence a year later.',
    date: '2026-06-18',
    updated: '2026-10-13',
    readingMinutes: 7,
    topic: 'Corporate Tax',
    authorId: 'mansur-kothambawala',
  },
  {
    slug: 'closing-the-books-in-five-days',
    title: 'Closing the books in five days, not five weeks',
    summary:
      'A close is slow for structural reasons, not lazy ones. What to fix first when month-end runs long, in the order that actually compounds.',
    date: '2026-05-07',
    readingMinutes: 6,
    topic: 'Financial control',
    authorId: 'mansur-kothambawala',
  },
  {
    slug: 'audit-trail-as-a-design-requirement',
    title: 'The audit trail is a design requirement, not a report',
    summary:
      'If you can only reconstruct how a figure was derived by asking the person who made it, you do not have an audit trail. You have a dependency.',
    date: '2026-03-24',
    readingMinutes: 5,
    topic: 'Systems',
    authorId: 'mansur-kothambawala',
  },
];

export const insightsNewestFirst = () =>
  [...INSIGHTS].sort((a, b) => b.date.localeCompare(a.date));

export const findInsight = (slug: string) =>
  INSIGHTS.find((entry) => entry.slug === slug);

export const formatInsightDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
