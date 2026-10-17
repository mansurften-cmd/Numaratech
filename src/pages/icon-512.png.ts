// Large icon for the web app manifest (Android home screen, install prompts).
import type { APIRoute } from 'astro';
import { iconPng } from '../icon';

export const GET: APIRoute = () =>
  new Response(iconPng(512), { headers: { 'Content-Type': 'image/png' } });
