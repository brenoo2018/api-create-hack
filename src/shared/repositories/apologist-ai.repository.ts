import { Injectable } from '@nestjs/common';
import { ApologistService } from '../services/apologist.service';
import { AiRepository } from '../../modules/ai/interfaces/ai.repository';

@Injectable()
export class ApologistAiRepository implements AiRepository {
  constructor(private readonly apologistService: ApologistService) {}

  async askQuestion(question: string, context?: string): Promise<{
    answer: string;
    confidence?: number;
    sources?: string[];
  }> {
    return this.apologistService.askQuestion(question, context);
  }

  async textToSpeech(text: string, options?: {
    voice?: 'male' | 'female';
    speed?: number;
    language?: string;
  }): Promise<Buffer> {
    return this.apologistService.textToSpeech(text, options);
  }

  async speechToText(audioBuffer: Buffer, options?: {
    language?: string;
    format?: string;
  }): Promise<string> {
    return this.apologistService.speechToText(audioBuffer, options);
  }
}
