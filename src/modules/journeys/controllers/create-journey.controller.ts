import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { CreateJourneyUseCase } from '../use-cases/create-journey.use-case';
import { CreateJourneyDto, createJourneySchema } from '../schemas/journey.schema';

@Controller('journeys')
export class CreateJourneyController {
  constructor(private readonly createJourneyUseCase: CreateJourneyUseCase) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createJourneySchema)) data: CreateJourneyDto,
  ) {
    return this.createJourneyUseCase.execute(data);
  }
}
