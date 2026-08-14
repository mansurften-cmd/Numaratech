/**
 * The one place the production origin is written down.
 *
 * astro.config.mjs cannot import from src/consts.ts (it runs before the TS
 * pipeline), and public/robots.txt is a static file that cannot import
 * anything at all. That is why the origin used to appear three times and had
 * to be kept in sync by hand. Everything now reads this file:
 *
 *   astro.config.mjs      imports SITE_ORIGIN directly
 *   src/consts.ts         re-exports it as SITE.url
 *   src/pages/robots.txt.ts   generates robots.txt from it at build time
 *
 * Migrating to numaratech.com is a one-line edit here. See LAUNCH.md for the
 * rest of the sequence — the origin is not the only thing that has to change.
 */
export const SITE_ORIGIN = 'https://numaratech.mansurften.workers.dev';

/**
 * True while we are serving from the temporary workers.dev host. Drives the
 * blanket Disallow in robots.txt and the noindex X-Robots-Tag, so indexing
 * cannot be switched on by accident before the real domain exists.
 */
export const IS_TEMPORARY_HOST = new URL(SITE_ORIGIN).hostname.endsWith('.workers.dev');
