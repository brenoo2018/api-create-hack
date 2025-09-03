import { z } from 'zod';

export const askQuestionSchema = z.object({
  question: z.string().min(1, 'Question is required').max(1000, 'Question too long'),
  context: z.string().optional(),
});

export const aiResponseSchema = z.object({
  answer: z.string(),
  confidence: z.number().min(0).max(1).optional(),
  sources: z.array(z.string()).optional(),
});

export type AskQuestionDto = z.infer<typeof askQuestionSchema>;
export type AiResponseDto = z.infer<typeof aiResponseSchema>;
