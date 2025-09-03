import { Controller, Get, Param } from '@nestjs/common';
import { GetUserStatsUseCase } from '../use-cases/get-user-stats.use-case';

@Controller('user-progress')
export class GetUserStatsController {
  constructor(private readonly getUserStatsUseCase: GetUserStatsUseCase) {}

  @Get('stats/:userId')
  async getStats(@Param('userId') userId: string) {
    return this.getUserStatsUseCase.execute(userId);
  }
}
