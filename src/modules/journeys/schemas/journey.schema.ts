import { z } from 'zod';

export const createJourneySchema = z.object({
  title: z.string().min(1).max(120),
  description: z.string().min(1),
  orderIndex: z.number().int().min(0),
  colorHex: z.string().regex(/^#[0-9A-F]{6}$/i),
  gradientColor: z.string().regex(/^#[0-9A-F]{6}$/i).optional(),
  isUnlockedByDefault: z.boolean().default(false),
});

export const updateJourneySchema = createJourneySchema.partial();

export const journeyResponseSchema = z.object({
  id: z.string().uuid(),
  slug: z.string(),
  title: z.string(),
  description: z.string(),
  orderIndex: z.number(),
  colorHex: z.string(),
  gradientCss: z.string().nullable(),
  isUnlockedByDefault: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const journeyWithProgressSchema = journeyResponseSchema.extend({
  userProgress: z.object({
    status: z.enum(['LOCKED', 'UNLOCKED', 'COMPLETED']),
    startedAt: z.date().nullable(),
    completedAt: z.date().nullable(),
  }).nullable(),
});

export type CreateJourneyDto = z.infer<typeof createJourneySchema>;
export type UpdateJourneyDto = z.infer<typeof updateJourneySchema>;
export type JourneyResponseDto = z.infer<typeof journeyResponseSchema>;
export type JourneyWithProgressDto = z.infer<typeof journeyWithProgressSchema>;

export const listJourneysSchema = z.object({
  userId: z.string().optional(),
});

export type ListJourneysDto = z.infer<typeof listJourneysSchema>;
