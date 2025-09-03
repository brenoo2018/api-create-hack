import { z } from 'zod';

export const speechToTextSchema = z.object({
  language: z.string().optional().default('pt-BR'),
});

export type SpeechToTextRequest = z.infer<typeof speechToTextSchema>;
