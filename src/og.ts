/**
 * Open Graph card rendering.
 *
 * Every page set twitter:card "summary_large_image" but no page defined an
 * og:image, so every share rendered blank (A6). Cards are composed here from
 * the brand tokens and rasterised at build time — one per page, carrying that
 * page's title — rather than hand-made as images.
 *
 * Pipeline is pure npm so it runs in Cloudflare's build container, which has
 * no browser: satori lays the card out to SVG, resvg rasterises it to PNG.
 *
 * Fonts are the static Inter instances from @fontsource/inter, read as WOFF.
 * The site itself still serves the variable font in public/fonts — satori's
 * OpenType parser cannot read a variable font's fvar axis, and cannot read
 * woff2 at all. Both packages are devDependencies: nothing extra is shipped to
 * the browser, and no font is fetched from a third party.
 */
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

export const OG_WIDTH = 1200;
export const OG_HEIGHT = 630;

const NAVY_DEEP = '#061A34';
const TEAL_LIGHT = '#4FB3CC';
const PAPER_TEXT = '#C9D6E4';

let fontsPromise: Promise<{ regular: ArrayBuffer; bold: ArrayBuffer }> | null = null;

/** Read once per build, not once per card. */
function interFonts() {
  fontsPromise ??= (async () => {
    const load = async (weight: 400 | 700) => {
      const path = require.resolve(`@fontsource/inter/files/inter-latin-${weight}-normal.woff`);
      const buf = await readFile(path);
      return Uint8Array.from(buf).buffer;
    };
    const [regular, bold] = await Promise.all([load(400), load(700)]);
    return { regular, bold };
  })();
  return fontsPromise;
}

/** satori accepts React-element-shaped plain objects; no JSX needed here. */
const el = (type: string, props: Record<string, unknown>) => ({ type, props });

const monogram = () =>
  el('svg', {
    width: 64,
    height: 64,
    viewBox: '0 0 40 40',
    children: [
      el('rect', { x: 7, y: 7, width: 3.5, height: 26, fill: '#FFFFFF' }),
      el('rect', { x: 29.5, y: 7, width: 3.5, height: 26, fill: '#FFFFFF' }),
      el('path', { d: 'M8.75 7 L31.25 33', stroke: TEAL_LIGHT, strokeWidth: 3.5, fill: 'none' }),
    ],
  });

export type OgCard = { title: string; kicker?: string };

function card({ title, kicker }: OgCard) {
  return el('div', {
    style: {
      width: OG_WIDTH,
      height: OG_HEIGHT,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      background: NAVY_DEEP,
      padding: '64px 72px',
      // The wireframe rule the site uses instead of a gradient wash.
      borderTop: `10px solid ${TEAL_LIGHT}`,
    },
    children: [
      el('div', {
        style: { display: 'flex', alignItems: 'center', gap: 22 },
        children: [
          monogram(),
          el('div', {
            style: { display: 'flex', flexDirection: 'column', gap: 8 },
            children: [
              el('div', {
                style: { fontSize: 34, fontWeight: 700, color: '#FFFFFF', letterSpacing: 2 },
                children: 'NUMARATECH',
              }),
              el('div', {
                style: { fontSize: 15, color: TEAL_LIGHT, letterSpacing: 5 },
                children: 'ACCOUNTING · TAX · ADVISORY',
              }),
            ],
          }),
        ],
      }),
      el('div', {
        style: { display: 'flex', flexDirection: 'column', gap: 20 },
        children: [
          kicker
            ? el('div', {
                style: { fontSize: 20, color: TEAL_LIGHT, letterSpacing: 4 },
                children: kicker.toUpperCase(),
              })
            : el('div', { style: { display: 'flex' }, children: '' }),
          el('div', {
            style: {
              fontSize: title.length > 52 ? 58 : 72,
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.06,
              letterSpacing: -1.5,
            },
            children: title,
          }),
        ],
      }),
      el('div', {
        style: { fontSize: 21, color: PAPER_TEXT },
        children: 'United Arab Emirates',
      }),
    ],
  });
}

export async function renderOgPng(input: OgCard): Promise<Buffer> {
  const { regular, bold } = await interFonts();
  const svg = await satori(card(input) as never, {
    width: OG_WIDTH,
    height: OG_HEIGHT,
    fonts: [
      { name: 'Inter', data: regular, weight: 400, style: 'normal' },
      { name: 'Inter', data: bold, weight: 700, style: 'normal' },
    ],
  });
  return Buffer.from(
    new Resvg(svg, { fitTo: { mode: 'width', value: OG_WIDTH } }).render().asPng()
  );
}

/**
 * Route path to card slug: '/' -> 'index', '/advisory/tax/' -> 'advisory-tax'.
 * Used by the endpoint and by Base.astro, so a page and its card can never
 * disagree about the filename.
 */
export function ogSlug(pathname: string): string {
  const trimmed = pathname.replace(/^\/+|\/+$/g, '');
  return trimmed === '' ? 'index' : trimmed.replace(/\//g, '-');
}
