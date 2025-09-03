import { z } from 'zod';

export const missionConfigSchema = z.object({
  // READING config
  passage_ref: z.string().optional(),
  translation: z.string().optional(),
  
  // QUICK_TASK config
  timer_sec: z.number().int().positive().optional(),
  prompt: z.string().optional(),
  
  // CHAT_TUTOR config
  tutor: z.string().optional(),
  mode: z.enum(['guided', 'free']).optional(),
  min_turns: z.number().int().min(1).optional(),
  unit_goal: z.string().optional(),
  
  // QUIZ config
  questions: z.array(z.object({
    id: z.string(),
    type: z.enum(['mc', 'tf', 'open']),
    text: z.string(),
    choices: z.array(z.string()).optional(),
    answer_index: z.number().int().optional(),
    correct_answer: z.string().optional(),
  })).optional(),
  
  // REWARD config
  badge_code: z.string().optional(),
  coins: z.number().int().optional(),
  
  // CALL_TUTOR config
  duration_sec: z.number().int().positive().optional(),
  tts: z.boolean().optional(),
  stt: z.boolean().optional(),
}).passthrough();

export const createMissionSchema = z.object({
  journeyId: z.string().uuid(),
  title: z.string().min(1).max(120),
  type: z.enum(['READING', 'QUICK_TASK', 'CHAT_TUTOR', 'QUIZ', 'REWARD', 'CALL_TUTOR']),
  orderIndex: z.number().int().min(0),
  xpAmount: z.number().int().min(0),
  iconName: z.string().min(1).max(40),
  config: missionConfigSchema,
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
  }),
});

export const updateMissionSchema = createMissionSchema.partial();

export const missionResponseSchema = z.object({
  id: z.string().uuid(),
  journeyId: z.string().uuid(),
  title: z.string(),
  type: z.enum(['READING', 'QUICK_TASK', 'CHAT_TUTOR', 'QUIZ', 'REWARD', 'CALL_TUTOR']),
  orderIndex: z.number(),
  xpAmount: z.number(),
  iconName: z.string(),
  config: z.record(z.any()),
  coordinates: z.object({
    x: z.number(),
    y: z.number(),
  }),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const missionWithProgressSchema = missionResponseSchema.extend({
  userProgress: z.object({
    status: z.enum(['LOCKED', 'UNLOCKED', 'DONE']),
    score: z.number().nullable(),
    earnedXp: z.number(),
    startedAt: z.date().nullable(),
    finishedAt: z.date().nullable(),
  }).nullable(),
});

export type CreateMissionDto = z.infer<typeof createMissionSchema>;
export type UpdateMissionDto = z.infer<typeof updateMissionSchema>;
export type MissionResponseDto = z.infer<typeof missionResponseSchema>;
export type MissionWithProgressDto = z.infer<typeof missionWithProgressSchema>;
