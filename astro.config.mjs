import { defineConfig } from 'astro/config';
import { SITE_ORIGIN } from './site.config.mjs';

// NUMARATECH — static build, deployed to Cloudflare Workers static assets.
// The origin lives in site.config.mjs and is imported here, in src/consts.ts
// and in src/pages/robots.txt.ts, so migrating domains is a single edit.
export default defineConfig({
  site: SITE_ORIGIN,
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
