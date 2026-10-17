/**
 * The brand mark as a standalone icon: the Monogram N from Logomark.astro —
 * two white uprights and a light-teal diagonal — on the deep navy ground.
 * One drawing for every icon the site ships (favicon.svg is the same shape,
 * written out by hand because public/ files cannot import), rasterised at
 * build time by resvg, which the Open Graph cards already use.
 */
import { Resvg } from '@resvg/resvg-js';

export const ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
  <rect width="40" height="40" fill="#061A34"/>
  <rect x="7" y="7" width="3.5" height="26" fill="#FFFFFF"/>
  <rect x="29.5" y="7" width="3.5" height="26" fill="#FFFFFF"/>
  <path d="M8.75 7 L31.25 33" stroke="#4FB3CC" stroke-width="3.5" fill="none"/>
</svg>`;

export function iconPng(size: number): Uint8Array<ArrayBuffer> {
  // Copied into a plain Uint8Array: Response's body type rejects Node's Buffer.
  return new Uint8Array(new Resvg(ICON_SVG, { fitTo: { mode: 'width', value: size } }).render().asPng());
}
