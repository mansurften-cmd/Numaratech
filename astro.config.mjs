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
  compressHTML: true,
  devToolbar: { enabled: false },
});
