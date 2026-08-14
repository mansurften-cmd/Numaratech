/**
 * robots.txt, generated so the sitemap URL and the indexing posture both come
 * from site.config.mjs rather than from a hand-maintained static file. This
 * replaces public/robots.txt, which hardcoded the origin.
 */
import type { APIRoute } from 'astro';
import { SITE_ORIGIN, IS_TEMPORARY_HOST } from '../../site.config.mjs';

const temporary = `# Pre-launch build on a temporary host.
#
# numaratech.com is not yet purchased. Until it is, this origin must not
# accumulate index history that would later have to be unpicked — so indexing
# is blocked entirely rather than merely canonicalised away.
#
# This block is emitted because site.config.mjs still points at a *.workers.dev
# origin. Point SITE_ORIGIN at the real domain and it is replaced automatically
# by the allow-all block below. Keep a permanent Disallow on the workers.dev
# host itself — see LAUNCH.md.
User-agent: *
Disallow: /
`;

const live = `User-agent: *
Allow: /
`;

export const GET: APIRoute = () =>
  new Response(`${IS_TEMPORARY_HOST ? temporary : live}
Sitemap: ${SITE_ORIGIN}/sitemap.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
