import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { AskQuestionUseCase } from '../use-cases/ask-question.use-case';
import { AskQuestionDto, askQuestionSchema } from '../schemas/ai.schema';

@Controller('ai')
export class AskQuestionController {
  constructor(private readonly askQuestionUseCase: AskQuestionUseCase) {}

  @Post('ask')
  async ask(
    @Body(new ZodValidationPipe(askQuestionSchema)) data: AskQuestionDto,
  ) {
    return this.askQuestionUseCase.execute(data);
  }
}
