// Web app manifest: the name and icon a phone uses when someone adds the
// site to their home screen. Not a PWA — display stays "browser".
import type { APIRoute } from 'astro';
import { SITE } from '../consts';

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: SITE.name,
      short_name: SITE.name,
      description: SITE.description,
      start_url: '/',
      display: 'browser',
      background_color: '#061A34',
      theme_color: '#061A34',
      icons: [
        { src: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        { src: '/icon-512.png', sizes: '512x512', type: 'image/png' },
      ],
    }),
    { headers: { 'Content-Type': 'application/manifest+json' } }
  );
