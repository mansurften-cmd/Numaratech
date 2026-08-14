/**
 * One Open Graph card per page, rasterised at build time.
 *
 * The headline here is the share headline, which is deliberately not always
 * the <title>: "About" is a fine tab label and a useless thing to see in a
 * timeline. Anything not listed falls back to the site card, so a new page
 * still shares with a branded image rather than a blank one.
 */
import type { APIRoute, GetStaticPaths } from 'astro';
import { renderOgPng, ogSlug } from '../../og';
import { SERVICE_GROUPS } from '../../services';
import { INSIGHTS } from '../../insights';

const CARDS: { path: string; title: string; kicker?: string }[] = [
  { path: '/', title: 'Finance that can be defended.', kicker: 'Advisory and platform' },
  { path: '/advisory/', title: 'Judgement, on the record.', kicker: 'Advisory' },
  { path: '/platform/', title: 'It computes and it evidences. It does not decide.', kicker: 'Platform' },
  { path: '/platform/corporate-tax/', title: 'Trial balance to filed return.', kicker: 'Corporate Tax Engine' },
  { path: '/platform/fs-studio/', title: 'IFRS statements, generated.', kicker: 'FS Studio' },
  { path: '/services/', title: 'Licensing the software is the easy part.', kicker: 'Implementation' },
  { path: '/business-case/', title: 'What the close actually costs.', kicker: 'Business case' },
  { path: '/about/', title: 'A practice that builds its own tools.', kicker: 'About' },
  { path: '/insights/', title: 'What we have written down.', kicker: 'Insights' },
  { path: '/contact/', title: 'Tell us what is due, and when.', kicker: 'Contact' },
  { path: '/privacy/', title: 'What we collect, and why.', kicker: 'Privacy' },
  { path: '/terms/', title: 'The terms you are reading this under.', kicker: 'Legal' },
  // Astro reports the 404 route's pathname as /404, so the slug must match
  // what Base.astro derives — not the .html filename it is emitted under.
  { path: '/404', title: 'That page is not here.', kicker: 'Not found' },
  // Advisory groups and insights come from their own sources, so adding either
  // gets a card without anyone remembering to edit this file.
  ...SERVICE_GROUPS.map((group) => ({
    path: `/advisory/${group.slug}/`,
    title: group.strap,
    kicker: group.name,
  })),
  ...INSIGHTS.map((insight) => ({
    path: `/insights/${insight.slug}/`,
    title: insight.title,
    kicker: insight.topic,
  })),
];

export const getStaticPaths: GetStaticPaths = () =>
  CARDS.map((card) => ({
    params: { slug: ogSlug(card.path) },
    props: { title: card.title, kicker: card.kicker },
  }));

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgPng({
    title: props.title as string,
    kicker: props.kicker as string | undefined,
  });
  return new Response(new Uint8Array(png), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, immutable',
    },
  });
};
