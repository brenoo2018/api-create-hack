import { Injectable, Inject } from '@nestjs/common';
import { AiRepository } from '../interfaces/ai.repository';
import { TextToSpeechRequest } from '../schemas/text-to-speech.schema';

@Injectable()
export class TextToSpeechUseCase {
  constructor(@Inject('AiRepository') private readonly aiRepository: AiRepository) {}

  async execute(request: TextToSpeechRequest): Promise<Buffer> {
    return this.aiRepository.textToSpeech(request.text, {
      voice: request.voice,
      speed: request.speed,
      language: request.language,
    });
  }
}
