import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetJourneyUseCase } from '../use-cases/get-journey.use-case';

@Controller('journeys')
export class GetJourneyController {
  constructor(private readonly getJourneyUseCase: GetJourneyUseCase) {}

  @Get(':id')
  async getById(@Param('id') id: string, @Query('userId') userId?: string) {
    return this.getJourneyUseCase.execute(id, userId);
  }
}
