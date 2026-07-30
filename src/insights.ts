// Insight index. Each entry has a matching page under src/pages/insights/.
// Keeping the metadata here means the home page, the index and the article
// header all read the same record.

export type Insight = {
  slug: string;
  title: string;
  summary: string;
  /** ISO date — used for <time datetime> and sorting. */
  date: string;
  readingMinutes: number;
  topic: string;
};

export const INSIGHTS: Insight[] = [
  {
    slug: 'first-corporate-tax-return-what-breaks',
    title: 'The first Corporate Tax return: where it actually breaks',
    summary:
      'Registration is the easy part. The failures we see are upstream — a chart of accounts that cannot support a tax computation, and adjustments nobody can evidence twelve months later.',
    date: '2026-06-18',
    readingMinutes: 7,
    topic: 'Corporate Tax',
  },
  {
    slug: 'closing-the-books-in-five-days',
    title: 'Closing the books in five days, not five weeks',
    summary:
      'A close is slow for structural reasons, not lazy ones. What to fix first when month-end runs long, in the order that actually compounds.',
    date: '2026-05-07',
    readingMinutes: 6,
    topic: 'Financial control',
  },
  {
    slug: 'audit-trail-as-a-design-requirement',
    title: 'The audit trail is a design requirement, not a report',
    summary:
      'If you can only reconstruct how a figure was derived by asking the person who made it, you do not have an audit trail. You have a dependency.',
    date: '2026-03-24',
    readingMinutes: 5,
    topic: 'Systems',
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
