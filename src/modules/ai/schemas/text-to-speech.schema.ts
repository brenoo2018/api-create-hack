import { z } from 'zod';

export const textToSpeechSchema = z.object({
  text: z.string().min(1, 'Text is required').max(5000, 'Text too long'),
  voice: z.enum(['male', 'female']).optional().default('male'),
  speed: z.number().min(0.5).max(2.0).optional().default(1.0),
  language: z.string().optional().default('pt-BR'),
});

export type TextToSpeechRequest = z.infer<typeof textToSpeechSchema>;
