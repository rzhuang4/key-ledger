import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const sourceIds = z.array(z.string().min(1)).min(1);

const source = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  url: z.string().url(),
  publisher: z.string().min(1),
  accessed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  note: z.string().min(1).optional(),
});

const cited = z.object({
  text: z.string().min(1),
  sourceIds,
});

const vehicles = defineCollection({
  loader: glob({ pattern: '**/*.{yaml,yml}', base: './src/content/vehicles' }),
  schema: z.object({
    make: z.string().min(1),
    makeSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    model: z.string().min(1),
    modelSlug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
    yearStart: z.number().int(),
    yearEnd: z.number().int(),
    yearSlug: z.string().regex(/^\d{4}(?:-\d{4})?$/),
    market: z.literal('US'),
    title: z.string().min(20),
    description: z.string().min(50).max(180),
    summary: z.string().min(40),
    scope: z.string().min(20),
    reviewed: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    programmingFacts: z.object({
      onboardStatus: z.enum(['yes', 'no', 'needs-tool', 'unknown']),
      minimumWorkingKeys: z.union([z.literal(0), z.literal(1), z.literal(2), z.literal('unknown')]),
      pushButtonProcedure: z.enum(['covered', 'not-covered', 'unknown']),
      ignitionKeyInCylinder: z.enum(['required', 'not-required', 'unknown']),
      sourceIds: z.array(z.string()),
    }),
    ignitionKey: z
      .object({
        status: z.enum(['verified', 'unverified', 'unknown']),
        blade: z.string().min(1).optional(),
        transponder: z.enum(['none', 'present', 'unknown']).optional(),
        note: z.string().min(1),
        sourceIds: z.array(z.string()).optional(),
      })
      .optional(),
    troubleshooting: z
      .array(
        z.object({
          id: z.string().min(1),
          title: z.string().min(1),
          text: z.string().min(1),
          sourceIds,
        }),
      )
      .optional(),
    diy: z.object({
      status: z.enum(['yes', 'no', 'needs-tool']),
      heroAnswer: z.string().min(1).optional(),
      heroNotice: z.string().min(1).optional(),
      bottomLine: z.string().min(1).optional(),
      priceCaution: z.string().min(1).optional(),
      priceCautionSourceIds: z.array(z.string().min(1)).min(1).optional(),
      summary: z.string().min(20),
      condition: z.string().min(1).optional(),
      safetyNote: z.string().min(20),
      sourceIds,
      notes: z.array(cited).optional(),
      steps: z
        .array(
          z.object({
            text: z.string().min(1),
            sourceIds,
          }),
        )
        .optional(),
    }),
    comparisons: z
      .object({
        caption: z.string().min(1),
        sourceIds,
        columns: z.array(z.object({ sourceId: z.string().min(1), heading: z.string().min(1) })).min(2),
        rows: z
          .array(
            z.object({
              action: z.string().min(1),
              values: z.array(z.string().min(1)).min(2),
            }),
          )
          .min(1),
      })
      .optional(),
    variants: z
      .array(
        z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        fccLine: z.string().min(1).optional(),
          years: z.string().min(1),
          yearStart: z.number().int().optional(),
          yearEnd: z.number().int().optional(),
          fitment: z.string().min(1).optional(),
          heroLabel: z.string().min(1).optional(),
          keyType: z.enum([
            'flip-key',
            'remote-head-key',
            'smart-prox',
            'transponder-only',
            'separate-remote',
          ]),
          keyTypeNote: z.string().min(1),
          keyTypeSourceIds: sourceIds,
          buttons: z
            .object({
              count: z.number().int().positive(),
              sourceIds,
            })
            .optional(),
          fccIds: z
            .array(
              z.object({
                id: z.string().min(1),
                role: z.enum(['oem', 'aftermarket-example', 'seller-listed']),
                note: z.string().min(1).optional(),
                sourceIds,
              }),
            )
            .default([]),
          fccUnverified: z.string().min(1).optional(),
          oemPartNumbers: z
            .array(
              z.object({
                number: z.string().min(1),
                note: z.string().min(1).optional(),
                summary: z.boolean().optional(),
                sourceIds,
              }),
            )
            .default([]),
          partsUnverified: z.string().min(1).optional(),
          battery: z.union([
            z.object({
              status: z.literal('verified'),
              type: z.string().min(1),
              note: z.string().min(1).optional(),
              sourceIds,
            }),
            z.object({
              status: z.literal('unverified'),
              note: z.string().min(1),
            }),
          ]),
          frequency: z.union([
            z.object({
              status: z.literal('verified'),
              text: z.string().min(1),
              note: z.string().min(1).optional(),
              sourceIds,
            }),
            z.object({
              status: z.literal('unverified'),
              note: z.string().min(1),
            }),
          ]),
          sellerClaims: z.array(cited).optional(),
        }),
      )
      .min(1),
    priceVerdict: z.string().min(1).optional(),
    priceRanges: z
      .array(
        z.object({
          channel: z.enum(['dealer', 'locksmith', 'online-diy']),
          channelName: z.string().min(1).optional(),
          status: z.enum(['verified', 'unverified']),
          currency: z.literal('USD'),
          retailer: z.string().min(1),
          checkedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
          stock: z.enum(['in-stock', 'out-of-stock', 'unknown', 'service', 'not-listed']),
          stockBasis: z.enum(['shopify-js', 'json-ld', 'woocommerce-store-api']).optional(),
          variantId: z.string().min(1).optional(),
          heroNote: z.string().min(1).optional(),
          lowUsd: z.number().nonnegative().optional(),
          highUsd: z.number().nonnegative().optional(),
          note: z.string().min(1),
          sourceIds: z.array(z.string()).optional(),
        }),
      )
      .min(3),
    scopeCards: z
      .array(
        z.object({
          label: z.string().min(1),
          text: z.string().min(1),
          sourceIds,
        }),
      )
      .optional(),
    shopLinks: z.array(
      z.object({
        retailer: z.string().min(1),
        url: z.string().url(),
        label: z.string().min(1),
      }),
    ),
    unverified: z.array(z.string().min(1)),
    sources: z.array(source).min(1),
    i18n: z.record(z.string(), z.any()).optional(),
  }),
});

export const collections = { vehicles };
