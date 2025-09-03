import { Controller, Get, Query } from '@nestjs/common';
import { ListJourneysUseCase } from '../use-cases/list-journeys.use-case';

@Controller('journeys')
export class ListJourneysController {
  constructor(private readonly listJourneysUseCase: ListJourneysUseCase) {}

  @Get()
  async list(@Query('userId') userId?: string) {
    return this.listJourneysUseCase.execute({ userId });
  }
}
