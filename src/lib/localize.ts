import { defaultLocale } from '../i18n/locales';

export type Localized = { text: string; fallback: boolean };

export function field(locale: string, english: string | undefined, translated: unknown): Localized {
  const source = english ?? '';
  if (locale === defaultLocale) return { text: source, fallback: false };
  if (typeof translated === 'string' && translated.trim()) return { text: translated, fallback: false };
  return { text: source, fallback: true };
}

type Copy = Record<string, unknown> | undefined;

function asCopy(value: unknown): Copy {
  return value && typeof value === 'object' && !Array.isArray(value) ? (value as Record<string, unknown>) : undefined;
}

function textAt(list: unknown, index: number): unknown {
  return Array.isArray(list) ? list[index] : undefined;
}

export type VehicleCopy = {
  title: Localized;
  description: Localized;
  summary: Localized;
  scope: Localized;
  diy: {
    summary: Localized;
    condition?: Localized;
    safetyNote: Localized;
    notes: { text: Localized; sourceIds: string[] }[];
    steps: { text: Localized; sourceIds: string[] }[];
  };
  comparisons?: {
    caption: Localized;
    sourceIds: string[];
    columns: { heading: Localized }[];
    rows: { action: Localized; values: Localized[] }[];
  };
  variants: {
    id: string;
    name: Localized;
    years: Localized;
    keyType: string;
    keyTypeNote: Localized;
    keyTypeSourceIds: string[];
    fccIds: { id: string; role: string; note?: Localized; sourceIds: string[] }[];
    fccUnverified?: Localized;
    oemPartNumbers: { number: string; note?: Localized; sourceIds: string[] }[];
    partsUnverified?: Localized;
    battery: {
      status: string;
      type?: string;
      note?: Localized;
      sourceIds?: string[];
    };
    frequency: {
      status: string;
      text?: string;
      note?: Localized;
      sourceIds?: string[];
    };
    sellerClaims: { text: Localized; sourceIds: string[] }[];
  }[];
  priceRanges: {
    channel: string;
    status: string;
    currency: string;
    retailer: string;
    checkedAt: string;
    stock: string;
    lowUsd?: number;
    highUsd?: number;
    note: Localized;
    sourceIds?: string[];
  }[];
  shopLinks: { retailer: string; url: string; label: Localized }[];
  ignitionKey?: {
    status: string;
    blade?: string;
    transponder?: string;
    note: Localized;
    sourceIds?: string[];
  };
  troubleshooting: { id: string; title: Localized; text: Localized; sourceIds: string[] }[];
  unverified: Localized[];
  sources: {
    id: string;
    title: Localized;
    url: string;
    publisher: Localized;
    accessed: string;
    note?: Localized;
  }[];
};

type RawVehicle = {
  title: string;
  description: string;
  summary: string;
  scope: string;
  i18n?: Record<string, unknown>;
  diy: {
    summary: string;
    condition?: string;
    safetyNote: string;
    notes?: { text: string; sourceIds: string[] }[];
    steps?: { text: string; sourceIds: string[] }[];
  };
  comparisons?: {
    caption: string;
    sourceIds: string[];
    columns: { heading: string }[];
    rows: { action: string; values: string[] }[];
  };
  variants: {
    id: string;
    name: string;
    years: string;
    keyType: string;
    keyTypeNote: string;
    keyTypeSourceIds: string[];
    fccIds: { id: string; role: string; note?: string; sourceIds: string[] }[];
    fccUnverified?: string;
    oemPartNumbers: { number: string; note?: string; sourceIds: string[] }[];
    partsUnverified?: string;
    battery: { status: string; type?: string; note?: string; sourceIds?: string[] };
    frequency: { status: string; text?: string; note?: string; sourceIds?: string[] };
    sellerClaims?: { text: string; sourceIds: string[] }[];
  }[];
  priceRanges: {
    channel: string;
    status: string;
    currency: string;
    retailer: string;
    checkedAt: string;
    stock: string;
    lowUsd?: number;
    highUsd?: number;
    note: string;
    sourceIds?: string[];
  }[];
  shopLinks: { retailer: string; url: string; label: string }[];
  ignitionKey?: {
    status: string;
    blade?: string;
    transponder?: string;
    note: string;
    sourceIds?: string[];
  };
  troubleshooting?: { id: string; title: string; text: string; sourceIds: string[] }[];
  unverified: string[];
  sources: { id: string; title: string; url: string; publisher: string; accessed: string; note?: string }[];
};

export function localizeVehicle(data: RawVehicle, locale: string): VehicleCopy {
  const pack = asCopy(data.i18n?.[locale]);
  const diy = asCopy(pack?.diy);
  const comparisons = asCopy(pack?.comparisons);
  const variantPacks = Array.isArray(pack?.variants) ? pack.variants : [];
  const sourcePacks = Array.isArray(pack?.sources) ? pack.sources : [];

  return {
    title: field(locale, data.title, pack?.title),
    description: field(locale, data.description, pack?.description),
    summary: field(locale, data.summary, pack?.summary),
    scope: field(locale, data.scope, pack?.scope),
    diy: {
      summary: field(locale, data.diy.summary, diy?.summary),
      condition: data.diy.condition ? field(locale, data.diy.condition, diy?.condition) : undefined,
      safetyNote: field(locale, data.diy.safetyNote, diy?.safetyNote),
      notes: (data.diy.notes ?? []).map((note, index) => ({
        sourceIds: note.sourceIds,
        text: field(locale, note.text, asCopy(textAt(diy?.notes, index))?.text),
      })),
      steps: (data.diy.steps ?? []).map((step, index) => ({
        sourceIds: step.sourceIds,
        text: field(locale, step.text, asCopy(textAt(diy?.steps, index))?.text),
      })),
    },
    comparisons: data.comparisons
      ? {
          caption: field(locale, data.comparisons.caption, comparisons?.caption),
          sourceIds: data.comparisons.sourceIds,
          columns: data.comparisons.columns.map((column, index) => ({
            heading: field(locale, column.heading, asCopy(textAt(comparisons?.columns, index))?.heading),
          })),
          rows: data.comparisons.rows.map((row, index) => {
            const translated = asCopy(textAt(comparisons?.rows, index));
            return {
              action: field(locale, row.action, translated?.action),
              values: row.values.map((value, valueIndex) =>
                field(locale, value, textAt(translated?.values, valueIndex)),
              ),
            };
          }),
        }
      : undefined,
    variants: data.variants.map((variant) => {
      const translated = asCopy(variantPacks.find((item) => asCopy(item)?.id === variant.id));
      return {
        id: variant.id,
        name: field(locale, variant.name, translated?.name),
        years: field(locale, variant.years, translated?.years),
        keyType: variant.keyType,
        keyTypeNote: field(locale, variant.keyTypeNote, translated?.keyTypeNote),
        keyTypeSourceIds: variant.keyTypeSourceIds,
        fccIds: variant.fccIds.map((item, index) => ({
          id: item.id,
          role: item.role,
          sourceIds: item.sourceIds,
          note: item.note ? field(locale, item.note, textAt(translated?.fccNotes, index)) : undefined,
        })),
        fccUnverified: variant.fccUnverified
          ? field(locale, variant.fccUnverified, translated?.fccUnverified)
          : undefined,
        oemPartNumbers: variant.oemPartNumbers.map((item, index) => ({
          number: item.number,
          sourceIds: item.sourceIds,
          note: item.note ? field(locale, item.note, textAt(translated?.partNotes, index)) : undefined,
        })),
        partsUnverified: variant.partsUnverified
          ? field(locale, variant.partsUnverified, translated?.partsUnverified)
          : undefined,
        battery: {
          status: variant.battery.status,
          type: variant.battery.type,
          sourceIds: variant.battery.sourceIds,
          note: variant.battery.note
            ? field(locale, variant.battery.note, translated?.batteryNote)
            : undefined,
        },
        frequency: {
          status: variant.frequency.status,
          text: variant.frequency.text,
          sourceIds: variant.frequency.sourceIds,
          note: variant.frequency.note
            ? field(locale, variant.frequency.note, translated?.frequencyNote)
            : undefined,
        },
        sellerClaims: (variant.sellerClaims ?? []).map((claim, index) => ({
          sourceIds: claim.sourceIds,
          text: field(locale, claim.text, textAt(translated?.sellerClaims, index)),
        })),
      };
    }),
    priceRanges: data.priceRanges.map((row, index) => ({
      channel: row.channel,
      status: row.status,
      currency: row.currency,
      retailer: row.retailer,
      checkedAt: row.checkedAt,
      stock: row.stock,
      lowUsd: row.lowUsd,
      highUsd: row.highUsd,
      sourceIds: row.sourceIds,
      note: field(locale, row.note, textAt(pack?.priceNotes, index)),
    })),
    shopLinks: data.shopLinks.map((link, index) => ({
      retailer: link.retailer,
      url: link.url,
      label: field(locale, link.label, textAt(pack?.shopLabels, index)),
    })),
    ignitionKey: data.ignitionKey
      ? {
          status: data.ignitionKey.status,
          blade: data.ignitionKey.blade,
          transponder: data.ignitionKey.transponder,
          sourceIds: data.ignitionKey.sourceIds,
          note: field(locale, data.ignitionKey.note, pack?.ignitionKeyNote),
        }
      : undefined,
    troubleshooting: (data.troubleshooting ?? []).map((item) => {
      const translated = asCopy(
        (Array.isArray(pack?.troubleshooting) ? pack.troubleshooting : []).find(
          (row) => asCopy(row)?.id === item.id,
        ),
      );
      return {
        id: item.id,
        sourceIds: item.sourceIds,
        title: field(locale, item.title, translated?.title),
        text: field(locale, item.text, translated?.text),
      };
    }),
    unverified: data.unverified.map((item, index) => field(locale, item, textAt(pack?.unverified, index))),
    sources: data.sources.map((source) => {
      const translated = asCopy(sourcePacks.find((item) => asCopy(item)?.id === source.id));
      return {
        id: source.id,
        url: source.url,
        accessed: source.accessed,
        title: field(locale, source.title, translated?.title),
        publisher: field(locale, source.publisher, translated?.publisher),
        note: source.note ? field(locale, source.note, translated?.note) : undefined,
      };
    }),
  };
}
