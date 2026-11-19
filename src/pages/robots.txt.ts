import type { APIRoute } from 'astro';

export const GET: APIRoute = ({ site }) => {
  const base = import.meta.env.BASE_URL ?? '/';
  const origin = site ?? 'https://example.com';
  const root = new URL(base, origin);
  const sitemap = new URL('sitemap-index.xml', root).href;
  const body = `User-agent: *\nAllow: ${base}\n\nSitemap: ${sitemap}\n`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
