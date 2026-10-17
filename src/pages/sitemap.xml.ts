import type { APIRoute } from 'astro';
import { SITE } from '../consts';
import { INSIGHTS } from '../insights';

// Hand-rolled rather than pulled from @astrojs/sitemap: the site is small
// enough that an explicit list is clearer than a build integration, and the
// priorities are a deliberate editorial choice.
const STATIC_ROUTES: { path: string; priority: string; changefreq: string }[] = [
  { path: '/', priority: '1.0', changefreq: 'monthly' },
  { path: '/advisory/', priority: '0.9', changefreq: 'monthly' },
  { path: '/advisory/accounting-audit/', priority: '0.8', changefreq: 'monthly' },
  { path: '/advisory/tax/', priority: '0.8', changefreq: 'monthly' },
  { path: '/advisory/risk-compliance/', priority: '0.8', changefreq: 'monthly' },
  { path: '/platform/', priority: '0.9', changefreq: 'monthly' },
  { path: '/platform/corporate-tax/', priority: '0.9', changefreq: 'monthly' },
  { path: '/platform/fs-studio/', priority: '0.8', changefreq: 'monthly' },
  { path: '/services/', priority: '0.8', changefreq: 'monthly' },
  { path: '/business-case/', priority: '0.8', changefreq: 'monthly' },
  { path: '/about/', priority: '0.7', changefreq: 'yearly' },
  { path: '/insights/', priority: '0.7', changefreq: 'weekly' },
  { path: '/contact/', priority: '0.7', changefreq: 'yearly' },
  { path: '/privacy/', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms/', priority: '0.3', changefreq: 'yearly' },
];

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.url)).origin;
  // No lastmod on the static routes: stamping every page with the build date
  // tells search engines all of them changed on every deploy, and Google
  // ignores lastmod from sites whose dates are not accurate. Insights carry
  // their real publication or correction date.

  const entries = [
    ...STATIC_ROUTES.map((route) => ({
      loc: `${origin}${route.path}`,
      lastmod: undefined as string | undefined,
      changefreq: route.changefreq,
      priority: route.priority,
    })),
    ...INSIGHTS.map((insight) => ({
      loc: `${origin}/insights/${insight.slug}/`,
      lastmod: insight.updated ?? insight.date,
      changefreq: 'yearly',
      priority: '0.6',
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries
  .map(
    (entry) => `  <url>
    <loc>${entry.loc}</loc>
${entry.lastmod ? `    <lastmod>${entry.lastmod}</lastmod>\n` : ''}    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;

  return new Response(body, {
    headers: {
      'content-type': 'application/xml; charset=utf-8',
      'cache-control': 'public, max-age=3600',
    },
  });
};
