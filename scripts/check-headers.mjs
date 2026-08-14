/**
 * Resolves public/_headers the way Cloudflare does and asserts the result for
 * representative request paths.
 *
 * This exists because a _headers rule that matches nothing fails silently:
 * there is no error, the header simply never appears. `/*.html` was such a
 * rule — the site builds with trailingSlash 'always', so no request path ever
 * ends in .html and HTML shipped without its cache header for as long as that
 * rule existed.
 *
 * Matching per Cloudflare's docs: every matching rule contributes its headers,
 * and where the same header is set more than once the last matching rule wins.
 * https://developers.cloudflare.com/workers/static-assets/headers/
 *
 * Run: node scripts/check-headers.mjs
 */
import { readFileSync } from 'node:fs';

const SOURCE = 'public/_headers';

/** Parse into [{ pattern, headers: Map }] in file order. */
function parse(text) {
  const rules = [];
  let current = null;

  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    if (!line.trim() || line.trim().startsWith('#')) continue;

    if (!/^\s/.test(line)) {
      current = { pattern: line.trim(), headers: new Map() };
      rules.push(current);
      continue;
    }
    const idx = line.indexOf(':');
    if (idx === -1 || !current) continue;
    current.headers.set(line.slice(0, idx).trim(), line.slice(idx + 1).trim());
  }
  return rules;
}

/** Cloudflare splat matching: * matches any run of characters, including /. */
function matches(pattern, path) {
  const rx = new RegExp(
    '^' + pattern.split('*').map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('.*') + '$'
  );
  return rx.test(path);
}

function resolve(rules, path) {
  const out = new Map();
  const hit = [];
  for (const rule of rules) {
    if (!matches(rule.pattern, path)) continue;
    hit.push(rule.pattern);
    for (const [k, v] of rule.headers) out.set(k, v); // later wins
  }
  return { headers: out, hit };
}

const rules = parse(readFileSync(SOURCE, 'utf8'));
const failures = [];
const note = (ok, msg) => {
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${msg}`);
  if (!ok) failures.push(msg);
};

// Every rule must actually be reachable by some real request path. This is the
// check that would have caught /*.html.
const REAL_PATHS = [
  '/',
  '/about/',
  '/advisory/tax/',
  '/contact/',
  '/insights/closing-the-books-in-five-days/',
  '/fonts/inter-latin-variable.woff2',
  '/_astro/Nav.astro_astro_type_script_index_0_lang.abc123.js',
  '/robots.txt',
  '/sitemap.xml',
  '/favicon.svg',
];

for (const rule of rules) {
  const reachable = REAL_PATHS.some((p) => matches(rule.pattern, p));
  note(reachable, `rule "${rule.pattern}" matches at least one real request path`);
}

// Security headers must reach every page.
const REQUIRED = [
  'Content-Security-Policy',
  'Strict-Transport-Security',
  'X-Content-Type-Options',
  'Referrer-Policy',
  'X-Frame-Options',
  'Permissions-Policy',
  'Cross-Origin-Opener-Policy',
];
for (const path of ['/', '/about/', '/contact/', '/advisory/tax/']) {
  const { headers } = resolve(rules, path);
  for (const h of REQUIRED) note(headers.has(h), `${path} sends ${h}`);
}

// CSP must stay tight in the ways that matter.
const csp = resolve(rules, '/').headers.get('Content-Security-Policy') ?? '';
note(/script-src 'self'(;|$)/.test(csp), "CSP script-src is 'self' with nothing added");
note(!/script-src[^;]*unsafe-inline/.test(csp), "CSP script-src has no 'unsafe-inline'");
note(!/script-src[^;]*unsafe-eval/.test(csp), "CSP script-src has no 'unsafe-eval'");
note(/object-src 'none'/.test(csp), "CSP object-src is 'none'");
note(/frame-ancestors 'none'/.test(csp), "CSP frame-ancestors is 'none'");
note(/base-uri 'self'/.test(csp), "CSP base-uri is 'self'");
note(/font-src 'self'(;|$)/.test(csp), 'CSP font-src is self-hosted only (no Google Fonts)');

// Caching: HTML revalidates, hashed assets are immutable.
const html = resolve(rules, '/about/').headers.get('Cache-Control') ?? '';
note(/must-revalidate/.test(html), `HTML revalidates (/about/ -> "${html}")`);

for (const p of ['/_astro/x.abc123.js', '/fonts/inter.woff2']) {
  const cc = resolve(rules, p).headers.get('Cache-Control') ?? '';
  note(/immutable/.test(cc), `${p} is immutable (-> "${cc}")`);
}

console.log(`\n${failures.length === 0 ? 'OK' : 'FAILED'} — ${failures.length} problem(s)`);
process.exit(failures.length ? 1 : 0);
