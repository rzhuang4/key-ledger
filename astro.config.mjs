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
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: {
          en: 'en',
          'zh-hant': 'zh-Hant',
          'zh-hans': 'zh-Hans',
          ja: 'ja',
          ko: 'ko',
          es: 'es',
          'pt-br': 'pt-BR',
          de: 'de',
          fr: 'fr',
        },
      },
      serialize(item) {
        if (item.links?.length) {
          const english = item.links.find((link) => link.lang === 'en');
          if (english && !item.links.some((link) => link.lang === 'x-default')) {
            item.links.push({ lang: 'x-default', url: english.url });
          }
        }
        return item;
      },
    }),
  ],
});
