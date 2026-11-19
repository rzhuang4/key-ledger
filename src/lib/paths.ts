import { defaultLocale, isLocale, locales } from '../i18n/locales';

/** Site path that respects Astro `base` (GitHub project pages). */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  const cleaned = path.replace(/^\/+/, '');
  return cleaned ? `${base}${cleaned}` : base;
}

export function stripBase(pathname: string): string {
  const base = import.meta.env.BASE_URL ?? '/';
  if (base !== '/' && pathname.startsWith(base)) {
    return pathname.slice(base.length - 1);
  }
  return pathname;
}

/** Path after the locale prefix, without leading or trailing slashes. */
export function contentPath(pathname: string): string {
  const parts = stripBase(pathname).split('/').filter(Boolean);
  if (parts[0] && isLocale(parts[0]) && parts[0] !== defaultLocale) {
    return parts.slice(1).join('/');
  }
  return parts.join('/');
}

export function localeHref(locale: string, path = ''): string {
  const rest = path.replace(/^\/+|\/+$/g, '');
  const prefix = locale === defaultLocale ? '' : locale;
  const joined = [prefix, rest].filter(Boolean).join('/');
  return href(joined ? `${joined}/` : '/');
}

export function localeAlternates(path: string): { code: string; hreflang: string; href: string }[] {
  return locales.map((locale) => ({
    code: locale.code,
    hreflang: locale.hreflang,
    href: localeHref(locale.code, path),
  }));
}
