// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const site = process.env.SITE_URL || 'https://example.com';

function normalizeBase(value) {
  if (!value || value === '/') return '/';
  const withLead = value.startsWith('/') ? value : `/${value}`;
  return withLead.endsWith('/') ? withLead : `${withLead}/`;
}

if (!process.env.SITE_URL) {
  console.warn(
    '\n[key-ledger] SITE_URL is not set. Canonical URLs and sitemap.xml will use https://example.com. Set SITE_URL before a public deploy.\n',
  );
}

// https://astro.build/config
export default defineConfig({
  site,
  base: normalizeBase(process.env.BASE_PATH),
  trailingSlash: 'always',
  integrations: [
    sitemap(),
  ],
});
