import { Injectable, Inject } from '@nestjs/common';
import { AiRepository } from '../interfaces/ai.repository';

interface SpeechToTextParams {
  audioBuffer: Buffer;
  language?: string;
  format?: string;
}

@Injectable()
export class SpeechToTextUseCase {
  constructor(@Inject('AiRepository') private readonly aiRepository: AiRepository) {}

  async execute(params: SpeechToTextParams): Promise<string> {
    return this.aiRepository.speechToText(params.audioBuffer, {
      language: params.language,
      format: params.format,
    });
  }
}
