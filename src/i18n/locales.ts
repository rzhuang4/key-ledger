import data from './locales.json';

export type LocaleCode = (typeof data.locales)[number]['code'];

export type LocaleInfo = {
  code: LocaleCode;
  htmlLang: string;
  hreflang: string;
  label: string;
  dateLocale: string;
};

export const locales = data.locales as LocaleInfo[];

export const defaultLocale: LocaleCode = 'en';

export const localeCodes = locales.map((locale) => locale.code);

export function localeInfo(code: string): LocaleInfo {
  return locales.find((locale) => locale.code === code) ?? locales[0];
}

export function isLocale(code: string): code is LocaleCode {
  return locales.some((locale) => locale.code === code);
}
