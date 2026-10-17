/**
 * RFC 9116 security.txt: where to report a vulnerability. The terms already
 * invite reports to the main mailbox; this makes that discoverable to the
 * tools researchers use. Expires is required by the RFC and must be under a
 * year away, so it is regenerated on every build.
 */
import type { APIRoute } from 'astro';
import { SITE } from '../../consts';

export const GET: APIRoute = ({ site }) => {
  const origin = (site ?? new URL(SITE.url)).origin;
  const expires = new Date(Date.now() + 300 * 24 * 60 * 60 * 1000);
  expires.setUTCHours(0, 0, 0, 0);
  const body = [
    `Contact: mailto:${SITE.email}`,
    `Contact: ${origin}/contact/`,
    `Expires: ${expires.toISOString()}`,
    'Preferred-Languages: en',
    `Canonical: ${origin}/.well-known/security.txt`,
    `Policy: ${origin}/terms/`,
    '',
  ].join('\n');
  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
