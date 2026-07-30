import { defineConfig } from 'astro/config';

// NUMARATECH — static build, deployed to Cloudflare Pages.
// Update `site` to the production hostname before the first deploy; it is used
// for canonical URLs, the sitemap and Open Graph tags.
export default defineConfig({
  site: 'https://numaratech.com',
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
  compressHTML: true,
  devToolbar: { enabled: false },
});
