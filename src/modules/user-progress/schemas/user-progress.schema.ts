import { z } from 'zod';

export const startMissionSchema = z.object({
  userId: z.string().uuid(),
  missionId: z.string().uuid(),
});

export const completeMissionSchema = z.object({
  userId: z.string().uuid(),
  missionId: z.string().uuid(),
  score: z.number().int().min(0).max(100).optional(),
  earnedXp: z.number().int().min(0).optional(),
});

export const startJourneySchema = z.object({
  userId: z.string().uuid(),
  journeyId: z.string().uuid(),
});

export const completeJourneySchema = z.object({
  userId: z.string().uuid(),
  journeyId: z.string().uuid(),
});

export const userStatsResponseSchema = z.object({
  userId: z.string().uuid(),
  totalXp: z.number(),
  currentStreak: z.number(),
  longestStreak: z.number(),
  lastActiveDate: z.date().nullable(),
});

export const missionProgressResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  missionId: z.string().uuid(),
  status: z.enum(['LOCKED', 'UNLOCKED', 'DONE']),
  score: z.number().nullable(),
  earnedXp: z.number(),
  startedAt: z.date().nullable(),
  finishedAt: z.date().nullable(),
});

export const journeyProgressResponseSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  journeyId: z.string().uuid(),
  status: z.enum(['LOCKED', 'UNLOCKED', 'COMPLETED']),
  startedAt: z.date().nullable(),
  completedAt: z.date().nullable(),
});

export type StartMissionDto = z.infer<typeof startMissionSchema>;
export type CompleteMissionDto = z.infer<typeof completeMissionSchema>;
export type StartJourneyDto = z.infer<typeof startJourneySchema>;
export type CompleteJourneyDto = z.infer<typeof completeJourneySchema>;
export type UserStatsResponseDto = z.infer<typeof userStatsResponseSchema>;
export type MissionProgressResponseDto = z.infer<typeof missionProgressResponseSchema>;
export type JourneyProgressResponseDto = z.infer<typeof journeyProgressResponseSchema>;
