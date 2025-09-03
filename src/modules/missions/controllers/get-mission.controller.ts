import { Controller, Get, Param, Query } from '@nestjs/common';
import { GetMissionUseCase } from '../use-cases/get-mission.use-case';

@Controller('missions')
export class GetMissionController {
  constructor(private readonly getMissionUseCase: GetMissionUseCase) {}

  @Get(':id')
  async getById(@Param('id') id: string, @Query('userId') userId?: string) {
    return this.getMissionUseCase.execute(id, userId);
  }
}
