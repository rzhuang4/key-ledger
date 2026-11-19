import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'yaml';
import affiliates from '../src/config/affiliates.json' with { type: 'json' };

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const vehicleDir = join(root, 'src/content/vehicles');
const retailers = affiliates.retailers;
const keyTypes = new Set([
  'flip-key',
  'remote-head-key',
  'smart-prox',
  'transponder-only',
  'separate-remote',
]);
const channels = ['dealer', 'locksmith', 'online-diy'];
const dateRe = /^\d{4}-\d{2}-\d{2}$/;
const slugRe = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function isObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

function collectSourceIds(node, found) {
  if (Array.isArray(node)) {
    node.forEach((item) => collectSourceIds(item, found));
    return;
  }
  if (!isObject(node)) return;
  for (const [key, value] of Object.entries(node)) {
    if (key === 'i18n') continue;
    if (key === 'sourceIds') found.push(value);
    else if (key === 'sourceId' && typeof value === 'string') found.push([value]);
    else collectSourceIds(value, found);
  }
}

export function validateVehicle(data, fileName) {
  const errors = [];
  const fail = (message) => errors.push(`${fileName}: ${message}`);

  if (!isObject(data)) {
    fail('file must contain a YAML object');
    return errors;
  }

  const required = [
    'make',
    'makeSlug',
    'model',
    'modelSlug',
    'yearStart',
    'yearEnd',
    'yearSlug',
    'market',
    'title',
    'description',
    'summary',
    'scope',
    'reviewed',
    'programmingFacts',
    'diy',
    'variants',
    'priceRanges',
    'shopLinks',
    'unverified',
    'sources',
  ];
  for (const key of required) {
    if (data[key] === undefined || data[key] === null || data[key] === '') {
      fail(`missing required field "${key}"`);
    }
  }
  if (errors.length) return errors;

  if (typeof data.makeSlug !== 'string' || !slugRe.test(data.makeSlug)) {
    fail('makeSlug must be lowercase kebab-case');
  }
  if (typeof data.modelSlug !== 'string' || !slugRe.test(data.modelSlug)) {
    fail('modelSlug must be lowercase kebab-case');
  }
  if (!Number.isInteger(data.yearStart) || !Number.isInteger(data.yearEnd)) {
    fail('yearStart and yearEnd must be integers');
  } else if (data.yearStart > data.yearEnd || data.yearStart < 1980 || data.yearEnd > 2035) {
    fail('year range is invalid');
  }
  const expectedSlug =
    data.yearStart === data.yearEnd ? String(data.yearStart) : `${data.yearStart}-${data.yearEnd}`;
  if (data.yearSlug !== expectedSlug) {
    fail(`yearSlug must be "${expectedSlug}"`);
  }
  const expectedFile = `${data.makeSlug}-${data.modelSlug}-${expectedSlug}.yaml`;
  if (fileName !== expectedFile && fileName !== 'self-test.yaml') {
    fail(`file name must be ${expectedFile}`);
  }
  if (data.market !== 'US') fail('market must be "US"');
  if (typeof data.title !== 'string' || data.title.length < 20) fail('title is too short');
  if (typeof data.description !== 'string' || data.description.length < 50 || data.description.length > 180) {
    fail(`description must be 50–180 characters (got ${data.description?.length ?? 0})`);
  }
  if (typeof data.summary !== 'string' || data.summary.length < 40) fail('summary is too short');
  if (typeof data.scope !== 'string' || data.scope.length < 20) fail('scope is too short');
  if (typeof data.reviewed !== 'string' || !dateRe.test(data.reviewed)) {
    fail('reviewed must be YYYY-MM-DD');
  }

  const facts = data.programmingFacts;
  if (!isObject(facts)) {
    fail('programmingFacts must be an object');
  } else {
    if (!['yes', 'no', 'needs-tool', 'unknown'].includes(facts.onboardStatus)) {
      fail('programmingFacts.onboardStatus must be yes, no, needs-tool, or unknown');
    }
    if (![0, 1, 2, 'unknown'].includes(facts.minimumWorkingKeys)) {
      fail('programmingFacts.minimumWorkingKeys must be 0, 1, 2, or unknown');
    }
    if (!['covered', 'not-covered', 'unknown'].includes(facts.pushButtonProcedure)) {
      fail('programmingFacts.pushButtonProcedure must be covered, not-covered, or unknown');
    }
    if (!['required', 'not-required', 'unknown'].includes(facts.ignitionKeyInCylinder)) {
      fail('programmingFacts.ignitionKeyInCylinder must be required, not-required, or unknown');
    }
    const needsSource =
      facts.onboardStatus !== 'unknown' ||
      facts.minimumWorkingKeys !== 'unknown' ||
      facts.pushButtonProcedure !== 'unknown' ||
      facts.ignitionKeyInCylinder !== 'unknown';
    if (needsSource && (!Array.isArray(facts.sourceIds) || facts.sourceIds.length === 0)) {
      fail('programmingFacts needs sourceIds when a fact is not unknown');
    }
  }
  if (data.ignitionKey) {
    const key = data.ignitionKey;
    if (!['verified', 'unverified', 'unknown'].includes(key.status)) {
      fail('ignitionKey.status must be verified, unverified, or unknown');
    }
    if (!key.note) fail('ignitionKey needs a note');
    if (key.status === 'verified' && (!Array.isArray(key.sourceIds) || key.sourceIds.length === 0)) {
      fail('ignitionKey needs sourceIds when status is verified');
    }
    if (key.status !== 'verified' && (key.blade || key.transponder === 'none' || key.transponder === 'present')) {
      fail('ignitionKey must not name a blade or a transponder result unless status is verified');
    }
  }
  if (data.troubleshooting) {
    if (!Array.isArray(data.troubleshooting)) fail('troubleshooting must be a list');
    else {
      data.troubleshooting.forEach((item, index) => {
        if (!item?.id || !item?.title || !item?.text) fail(`troubleshooting[${index}] needs id, title, and text`);
        if (!Array.isArray(item?.sourceIds) || item.sourceIds.length === 0) {
          fail(`troubleshooting[${index}] needs sourceIds`);
        }
      });
    }
  }
  if (Array.isArray(data.variants)) {
    data.variants.forEach((variant, index) => {
      if (!variant?.buttons) return;
      if (!Number.isInteger(variant.buttons.count) || variant.buttons.count < 1) {
        fail(`variants[${index}].buttons.count must be a positive integer`);
      }
      if (!Array.isArray(variant.buttons.sourceIds) || variant.buttons.sourceIds.length === 0) {
        fail(`variants[${index}].buttons needs sourceIds`);
      }
    });
  }

  const diy = data.diy;
  if (!isObject(diy)) {
    fail('diy must be an object');
  } else {
    if (!['yes', 'no', 'needs-tool'].includes(diy.status)) {
      fail('diy.status must be yes, no, or needs-tool');
    }
    if (typeof diy.summary !== 'string' || diy.summary.length < 20) fail('diy.summary is missing');
    if (typeof diy.safetyNote !== 'string' || !/locksmith/i.test(diy.safetyNote)) {
      fail('diy.safetyNote is required and must mention a locksmith');
    }
    if (!Array.isArray(diy.sourceIds) || diy.sourceIds.length === 0) {
      fail('diy.sourceIds must list at least one source');
    }
    const steps = diy.steps ?? [];
    if (!Array.isArray(steps)) fail('diy.steps must be a list when present');
    if (diy.status === 'yes') {
      if (steps.length === 0) fail('diy.status "yes" requires at least one step');
      steps.forEach((step, index) => {
        if (!isObject(step) || typeof step.text !== 'string' || !step.text.trim()) {
          fail(`diy.steps[${index}] needs text`);
        }
        if (!Array.isArray(step?.sourceIds) || step.sourceIds.length === 0) {
          fail(`diy.steps[${index}] needs sourceIds`);
        }
      });
    } else if (steps.length > 0) {
      fail('on-board steps are only allowed when diy.status is "yes"');
    }
  }

  if (!Array.isArray(data.variants) || data.variants.length === 0) {
    fail('variants must contain at least one key');
  } else {
    data.variants.forEach((variant, index) => {
      const where = `variants[${index}]`;
      if (!isObject(variant)) {
        fail(`${where} must be an object`);
        return;
      }
      for (const key of ['id', 'name', 'years', 'keyType', 'keyTypeNote', 'keyTypeSourceIds', 'battery', 'frequency']) {
        if (variant[key] === undefined) fail(`${where} missing ${key}`);
      }
      if (variant.keyType && !keyTypes.has(variant.keyType)) fail(`${where}.keyType is not a known type`);
      const fcc = variant.fccIds ?? [];
      if (!Array.isArray(fcc) || (fcc.length === 0 && !variant.fccUnverified)) {
        fail(`${where} needs fccIds or fccUnverified`);
      }
      fcc.forEach((entry, fccIndex) => {
        if (!isObject(entry) || !entry.id || !Array.isArray(entry.sourceIds) || entry.sourceIds.length === 0) {
          fail(`${where}.fccIds[${fccIndex}] needs an id and sourceIds`);
        }
      });
      const parts = variant.oemPartNumbers ?? [];
      if (!Array.isArray(parts) || (parts.length === 0 && !variant.partsUnverified)) {
        fail(`${where} needs oemPartNumbers or partsUnverified`);
      }
      parts.forEach((entry, partIndex) => {
        if (!isObject(entry) || !entry.number || !Array.isArray(entry.sourceIds) || entry.sourceIds.length === 0) {
          fail(`${where}.oemPartNumbers[${partIndex}] needs a number and sourceIds`);
        }
      });
      if (!isObject(variant.battery) || !['verified', 'unverified'].includes(variant.battery.status)) {
        fail(`${where}.battery.status must be verified or unverified`);
      } else if (variant.battery.status === 'verified') {
        if (!variant.battery.type || !Array.isArray(variant.battery.sourceIds) || variant.battery.sourceIds.length === 0) {
          fail(`${where}.battery needs a type and sourceIds`);
        }
      } else if (!variant.battery.note) {
        fail(`${where}.battery unverified note is missing`);
      }
      if (!isObject(variant.frequency) || !['verified', 'unverified'].includes(variant.frequency.status)) {
        fail(`${where}.frequency.status must be verified or unverified`);
      } else if (variant.frequency.status === 'verified') {
        if (!variant.frequency.text || !Array.isArray(variant.frequency.sourceIds) || variant.frequency.sourceIds.length === 0) {
          fail(`${where}.frequency needs text and sourceIds`);
        }
      } else if (!variant.frequency.note) {
        fail(`${where}.frequency unverified note is missing`);
      }
    });
  }

  if (!Array.isArray(data.priceRanges)) {
    fail('priceRanges must be a list');
  } else {
    for (const channel of channels) {
      if (!data.priceRanges.some((row) => row?.channel === channel)) {
        fail(`priceRanges missing channel "${channel}"`);
      }
    }
    data.priceRanges.forEach((row, index) => {
      const where = `priceRanges[${index}]`;
      if (!isObject(row)) {
        fail(`${where} must be an object`);
        return;
      }
      if (!channels.includes(row.channel)) fail(`${where}.channel is invalid`);
      if (!row.note || typeof row.note !== 'string') fail(`${where}.note is required`);
      if (row.currency !== 'USD') fail(`${where}.currency must be USD`);
      if (!row.retailer || typeof row.retailer !== 'string') fail(`${where}.retailer is required`);
      if (typeof row.checkedAt !== 'string' || !dateRe.test(row.checkedAt)) {
        fail(`${where}.checkedAt must be YYYY-MM-DD`);
      }
      if (!['in-stock', 'out-of-stock', 'unknown', 'service', 'not-listed'].includes(row.stock)) {
        fail(`${where}.stock must be in-stock, out-of-stock, unknown, service, or not-listed`);
      }
      if (row.stock === 'service' && row.channel === 'online-diy') {
        fail(`${where} online hardware cannot use stock service`);
      }
      if (row.variantId !== undefined) {
        const ids = new Set((Array.isArray(data.variants) ? data.variants : []).map((variant) => variant?.id));
        if (typeof row.variantId !== 'string' || !ids.has(row.variantId)) {
          fail(`${where}.variantId does not match a variant`);
        }
      }
      const hasNumber = row.lowUsd !== undefined || row.highUsd !== undefined;
      if (row.status === 'verified') {
        if (!hasNumber) fail(`${where} verified price needs lowUsd or highUsd`);
        if (!Array.isArray(row.sourceIds) || row.sourceIds.length === 0) {
          fail(`${where} verified price needs sourceIds`);
        }
        if (row.stock === 'unknown') fail(`${where} verified price needs a stock status from the source`);
        if (row.lowUsd !== undefined && row.highUsd !== undefined && row.lowUsd > row.highUsd) {
          fail(`${where} lowUsd is above highUsd`);
        }
      } else if (row.status === 'unverified') {
        if (hasNumber) fail(`${where} unverified price must not include a dollar amount`);
        if (row.stock !== 'unknown') fail(`${where} unverified price must use stock unknown`);
      } else {
        fail(`${where}.status must be verified or unverified`);
      }
    });
  }

  if (!Array.isArray(data.sources) || data.sources.length === 0) {
    fail('sources must contain at least one source');
  }
  const sourceIds = new Set();
  if (Array.isArray(data.sources)) {
    data.sources.forEach((source, index) => {
      if (!isObject(source)) {
        fail(`sources[${index}] must be an object`);
        return;
      }
      if (!source.id || !source.title || !source.publisher) {
        fail(`sources[${index}] needs id, title, and publisher`);
      }
      if (typeof source.url !== 'string' || !/^https?:\/\//.test(source.url)) {
        fail(`sources[${index}] needs an http(s) URL`);
      }
      if (typeof source.accessed !== 'string' || !dateRe.test(source.accessed)) {
        fail(`sources[${index}].accessed must be YYYY-MM-DD`);
      }
      if (source.id) {
        if (sourceIds.has(source.id)) fail(`duplicate source id "${source.id}"`);
        sourceIds.add(source.id);
      }
    });
  }

  const cited = [];
  collectSourceIds(data, cited);
  const used = new Set();
  cited.forEach((list) => {
    if (!Array.isArray(list) || list.length === 0) {
      fail('a sourceIds list is empty');
      return;
    }
    list.forEach((id) => {
      used.add(id);
      if (!sourceIds.has(id)) fail(`unknown source id "${id}"`);
    });
  });
  for (const id of sourceIds) {
    if (!used.has(id)) fail(`source "${id}" is never cited`);
  }

  if (isObject(data.comparisons)) {
    const columnCount = data.comparisons.columns?.length ?? 0;
    data.comparisons.rows?.forEach((row, index) => {
      if (!Array.isArray(row.values) || row.values.length !== columnCount) {
        fail(`comparisons.rows[${index}] must have one value per column`);
      }
    });
  }

  if (!Array.isArray(data.shopLinks)) {
    fail('shopLinks must be a list');
  } else {
    data.shopLinks.forEach((link, index) => {
      const retailer = retailers[link?.retailer];
      if (!retailer) fail(`shopLinks[${index}] retailer is not in src/config/affiliates.json`);
      else if (typeof link.url !== 'string' || !link.url.startsWith(retailer.baseUrl)) {
        fail(`shopLinks[${index}] URL must start with ${retailer?.baseUrl}`);
      }
      if (!link?.label) fail(`shopLinks[${index}] needs a label`);
    });
  }

  if (!Array.isArray(data.unverified)) fail('unverified must be a list of strings');
  else {
    data.unverified.forEach((item, index) => {
      if (typeof item !== 'string' || !item.trim()) fail(`unverified[${index}] must be text`);
    });
  }

  return errors;
}

function minimalValid() {
  return {
    make: 'Example',
    makeSlug: 'example',
    model: 'Sample',
    modelSlug: 'sample',
    yearStart: 2001,
    yearEnd: 2002,
    yearSlug: '2001-2002',
    market: 'US',
    title: 'Example Sample key fob notes for the self test',
    description: 'Self-test description that is long enough to pass the meta description length rule easily.',
    summary: 'This self-test record exists only in memory so the checker can prove a complete file passes.',
    scope: 'Memory fixture only. It is not a vehicle page.',
    reviewed: '2026-11-19',
    programmingFacts: {
      onboardStatus: 'unknown',
      minimumWorkingKeys: 'unknown',
      pushButtonProcedure: 'unknown',
      ignitionKeyInCylinder: 'unknown',
      sourceIds: ['src'],
    },
    diy: {
      status: 'needs-tool',
      summary: 'A scan tool is required. This sentence is only a fixture.',
      safetyNote: 'Stop and use a locksmith if you do not have the tool.',
      sourceIds: ['src'],
    },
    variants: [
      {
        id: 'one',
        name: 'Remote',
        years: '2001-2002',
        keyType: 'separate-remote',
        keyTypeNote: 'Fixture.',
        keyTypeSourceIds: ['src'],
        fccIds: [{ id: 'TEST001', role: 'oem', sourceIds: ['src'] }],
        oemPartNumbers: [{ number: '1', sourceIds: ['src'] }],
        battery: { status: 'unverified', note: 'Not researched.' },
        frequency: { status: 'verified', text: '315 MHz', sourceIds: ['src'] },
      },
    ],
    priceRanges: channels.map((channel) => ({
      channel,
      status: 'unverified',
      currency: 'USD',
      retailer: 'none',
      checkedAt: '2026-11-19',
      stock: 'unknown',
      note: 'Not researched.',
    })),
    shopLinks: [],
    unverified: ['Dealer price.'],
    sources: [
      {
        id: 'src',
        title: 'Fixture',
        url: 'https://example.com/fixture',
        publisher: 'Example',
        accessed: '2026-11-19',
      },
    ],
  };
}

function assertSelfTest() {
  const validErrors = validateVehicle(minimalValid(), 'self-test.yaml');
  if (validErrors.length) {
    throw new Error(`Self-test valid fixture failed:\n${validErrors.join('\n')}`);
  }

  const missingNote = minimalValid();
  delete missingNote.diy.safetyNote;
  const noteErrors = validateVehicle(missingNote, 'self-test.yaml');
  if (!noteErrors.some((error) => error.includes('safetyNote'))) {
    throw new Error('Self-test did not fail a missing safety note');
  }

  const missingSources = minimalValid();
  delete missingSources.sources;
  const sourceErrors = validateVehicle(missingSources, 'self-test.yaml');
  if (!sourceErrors.some((error) => error.includes('sources'))) {
    throw new Error('Self-test did not fail missing sources');
  }

  const priced = minimalValid();
  priced.priceRanges = priced.priceRanges.map((row) =>
    row.channel === 'dealer' ? { ...row, status: 'verified', lowUsd: 10 } : row,
  );
  const priceErrors = validateVehicle(priced, 'self-test.yaml');
  if (!priceErrors.some((error) => error.includes('sourceIds'))) {
    throw new Error('Self-test did not fail a verified price without a source');
  }

  const guessed = minimalValid();
  guessed.priceRanges = guessed.priceRanges.map((row) =>
    row.channel === 'locksmith' ? { ...row, lowUsd: 50 } : row,
  );
  const guessedErrors = validateVehicle(guessed, 'self-test.yaml');
  if (!guessedErrors.some((error) => error.includes('must not include a dollar amount'))) {
    throw new Error('Self-test did not fail an unverified price that included a number');
  }

  const steps = minimalValid();
  steps.diy.status = 'yes';
  const stepErrors = validateVehicle(steps, 'self-test.yaml');
  if (!stepErrors.some((error) => error.includes('at least one step'))) {
    throw new Error('Self-test did not fail on-board status without steps');
  }

}

function validateAffiliateConfig() {
  const errors = [];
  const expected = ['carandtruckremotes', 'carkeysexpress', 'tomskey', 'amazon'];
  for (const id of expected) {
    const entry = retailers[id];
    if (!entry) {
      errors.push(`affiliates.json: missing retailer ${id}`);
      continue;
    }
    if (typeof entry.affiliateQuery !== 'string') {
      errors.push(`affiliates.json: ${id}.affiliateQuery must be a string`);
    } else if (/^[?&]/.test(entry.affiliateQuery.trim())) {
      errors.push(`affiliates.json: ${id}.affiliateQuery must not start with ? or &`);
    }
    if (typeof entry.baseUrl !== 'string' || !entry.baseUrl.startsWith('https://')) {
      errors.push(`affiliates.json: ${id}.baseUrl must be https`);
    }
    if (!entry.name) errors.push(`affiliates.json: ${id}.name is missing`);
  }
  return errors;
}


function validateDirectory() {
  const names = readdirSync(vehicleDir).filter((name) => name.endsWith('.yaml') || name.endsWith('.yml'));
  if (names.length === 0) return { errors: ['src/content/vehicles: no vehicle files found'], warnings: [] };
  const errors = [];
  const warnings = [];
  for (const name of names) {
    let data;
    try {
      data = parse(readFileSync(join(vehicleDir, name), 'utf8'));
    } catch (error) {
      errors.push(`${name}: invalid YAML (${error.message})`);
      continue;
    }
    errors.push(...validateVehicle(data, name));
  }
  return { errors, warnings };
}

assertSelfTest();
const directory = validateDirectory();
const errors = [...validateAffiliateConfig(), ...directory.errors];
if (directory.warnings.length) {
  console.warn(`Translation warnings (${directory.warnings.length}), build is not blocked:`);
  for (const warning of directory.warnings) console.warn(`- ${warning}`);
}
if (errors.length) {
  console.error(`Vehicle check failed (${errors.length}):`);
  for (const error of errors) console.error(`- ${error}`);
  process.exit(1);
}
const count = readdirSync(vehicleDir).filter((name) => name.endsWith('.yaml') || name.endsWith('.yml')).length;
console.log(`Vehicle check passed (${count} file${count === 1 ? '' : 's'}, self-test included).`);
