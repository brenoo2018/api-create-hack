import { Module } from '@nestjs/common';
import { SharedServicesModule } from '../../shared/services/shared-services.module';
import { AskQuestionController } from './controllers/ask-question.controller';
import { TextToSpeechController } from './controllers/text-to-speech.controller';
import { SpeechToTextController } from './controllers/speech-to-text.controller';
import { AskQuestionUseCase } from './use-cases/ask-question.use-case';
import { TextToSpeechUseCase } from './use-cases/text-to-speech.use-case';
import { SpeechToTextUseCase } from './use-cases/speech-to-text.use-case';
import { AiRepository } from './interfaces/ai.repository';
import { ApologistAiRepository } from '../../shared/repositories/apologist-ai.repository';

@Module({
  imports: [SharedServicesModule],
  controllers: [
    AskQuestionController,
    TextToSpeechController,
    SpeechToTextController,
  ],
  providers: [
    AskQuestionUseCase,
    TextToSpeechUseCase,
    SpeechToTextUseCase,
    {
      provide: 'AiRepository',
      useClass: ApologistAiRepository,
    },
  ],
  exports: [
    AskQuestionUseCase,
    TextToSpeechUseCase,
    SpeechToTextUseCase,
  ],
})
export class AiModule {}
