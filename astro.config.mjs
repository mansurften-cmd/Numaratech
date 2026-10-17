import { defineConfig } from 'astro/config';
import { appendFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { SITE_ORIGIN } from './site.config.mjs';

/**
 * Permanent redirects for every page requested without its trailing slash.
 * Cloudflare's static-asset server already redirects /about to /about/, but
 * with a 307 (temporary), which tells search engines the short address might
 * come back and splits ranking signals between the two. A 301 says it will
 * not. Generated from the pages Astro actually built, so a new page is
 * covered without anyone remembering. _redirects rules run before
 * Cloudflare's own handling, so these take precedence.
 */
const permanentSlashRedirects = {
  name: 'permanent-slash-redirects',
  hooks: {
    'astro:build:done': ({ dir, pages }) => {
      const lines = pages
        .map(({ pathname }) => `/${pathname}`)
        .filter((path) => path !== '/' && path.endsWith('/'))
        .flatMap((path) => [`${path.slice(0, -1)}  ${path}  301`, `${path}index.html  ${path}  301`]);
      appendFileSync(
        fileURLToPath(new URL('_redirects', dir)),
        `\n# Generated at build time (astro.config.mjs): 301 for missing trailing slashes.\n${lines.join('\n')}\n`
      );
    },
  },
};

// NUMARATECH — static build, deployed to Cloudflare Workers static assets.
// The origin lives in site.config.mjs and is imported here, in src/consts.ts
// and in src/pages/robots.txt.ts, so migrating domains is a single edit.
export default defineConfig({
  site: SITE_ORIGIN,
  integrations: [permanentSlashRedirects],
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
    inlineStylesheets: 'auto',
  },
  vite: {
    build: {
      // Emit every script as a separate file rather than inlining small ones.
      // Inlined <script> blocks are refused by our Content-Security-Policy
      // (`script-src 'self'`, deliberately without 'unsafe-inline'), which
      // silently killed the nav toggle, the scroll reveal, the Corporate Tax
      // estimator and the contact form in production. External files are
      // same-origin and therefore allowed.
      assetsInlineLimit: 0,
    },
  },
  // Fetch the next page when a visitor hovers or focuses a link (touchstart
  // on phones), so the click lands on a page that is already downloaded.
  // Astro bundles this as an external module, so script-src 'self' allows it.
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'hover',
  },
  compressHTML: true,
  devToolbar: { enabled: false },
});
