import { Injectable, Inject } from '@nestjs/common';
import { AiRepository } from '../interfaces/ai.repository';
import { AskQuestionDto, AiResponseDto } from '../schemas/ai.schema';

@Injectable()
export class AskQuestionUseCase {
  constructor(@Inject('AiRepository') private readonly aiRepository: AiRepository) {}

  async execute(data: AskQuestionDto): Promise<AiResponseDto> {
    const response = await this.aiRepository.askQuestion(data.question, data.context);
    
    return {
      answer: response.answer,
      confidence: response.confidence,
      sources: response.sources,
    };
  }
}
