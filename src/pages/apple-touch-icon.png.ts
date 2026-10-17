// iOS home-screen icon, 180 x 180. iOS rounds the corners itself.
import type { APIRoute } from 'astro';
import { iconPng } from '../icon';

export const GET: APIRoute = () =>
  new Response(iconPng(180), { headers: { 'Content-Type': 'image/png' } });
