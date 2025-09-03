import { Controller, Get, Param, Query } from '@nestjs/common';
import { ListMissionsByJourneyUseCase } from '../use-cases/list-missions-by-journey.use-case';

@Controller('missions')
export class ListMissionsByJourneyController {
  constructor(private readonly listMissionsByJourneyUseCase: ListMissionsByJourneyUseCase) {}

  @Get('journey/:journeyId')
  async listByJourney(@Param('journeyId') journeyId: string, @Query('userId') userId?: string) {
    return this.listMissionsByJourneyUseCase.execute(journeyId, userId);
  }
}
