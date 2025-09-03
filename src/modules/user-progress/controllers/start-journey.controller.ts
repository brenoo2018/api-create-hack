import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { StartJourneyUseCase } from '../use-cases/start-journey.use-case';
import { StartJourneyDto, startJourneySchema } from '../schemas/user-progress.schema';

@Controller('user-progress/journeys')
export class StartJourneyController {
  constructor(private readonly startJourneyUseCase: StartJourneyUseCase) {}

  @Post('start')
  async start(
    @Body(new ZodValidationPipe(startJourneySchema)) data: StartJourneyDto,
  ) {
    return this.startJourneyUseCase.execute(data);
  }
}
