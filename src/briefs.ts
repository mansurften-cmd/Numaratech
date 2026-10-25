// UAE Regulatory Brief — the weekly editions. Each entry has a matching page
// under src/pages/insights/regulatory-brief/. The index, the breadcrumbs,
// the sitemap and the share cards all read this list.
//
// Editions are compiled in the owner's Notion ("Regulatory Watch") and
// published here only after the owner has reviewed them. Before publishing,
// remove anything written for the internal record: notes on sources that
// could not be reached, and commentary on other firms' publications.

export type Brief = {
  slug: string;
  /** "Week to 18 October 2026". */
  title: string;
  /** ISO dates of the review window. */
  windowStart: string;
  windowEnd: string;
  /** ISO date the brief's facts are stated as at. */
  asAt: string;
  /** ISO date it was published on this site. */
  published: string;
  /** One or two sentences: the week's headline. */
  summary: string;
  /** Search-result description, under 160 characters. */
  description: string;
};

export const BRIEFS: Brief[] = [
  {
    slug: 'week-to-2026-10-18',
    title: 'Week to 18 October 2026',
    windowStart: '2026-10-12',
    windowEnd: '2026-10-18',
    asAt: '2026-10-19',
    published: '2026-10-25',
    summary:
      'No federal tax instrument was published. The DFSA fined a DIFC company USD 454,367 for company service provider work it was not registered to do, and ADGM consulted on regulating business centres.',
    description:
      'UAE regulatory brief, 12–18 October 2026: a DFSA penalty for unregistered company service provider work, an ADGM consultation, and deadlines to 18 November.',
  },
];

export const briefsNewestFirst = () =>
  [...BRIEFS].sort((a, b) => b.windowEnd.localeCompare(a.windowEnd));

export const findBrief = (slug: string) => BRIEFS.find((brief) => brief.slug === slug);

export const BRIEF_SERIES = {
  name: 'UAE Regulatory Brief',
  path: '/insights/regulatory-brief/',
} as const;
