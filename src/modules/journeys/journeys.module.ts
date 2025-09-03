import { Module } from '@nestjs/common';
import { CreateJourneyController } from './controllers/create-journey.controller';
import { ListJourneysController } from './controllers/list-journeys.controller';
import { GetJourneyController } from './controllers/get-journey.controller';
import { CreateJourneyUseCase } from './use-cases/create-journey.use-case';
import { ListJourneysUseCase } from './use-cases/list-journeys.use-case';
import { GetJourneyUseCase } from './use-cases/get-journey.use-case';
import { JourneyRepository } from './interfaces/journey-repository.interface';
import { PrismaJourneyRepository } from './repositories/journey.repository';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateJourneyController,
    ListJourneysController,
    GetJourneyController,
  ],
  providers: [
    CreateJourneyUseCase,
    ListJourneysUseCase,
    GetJourneyUseCase,
    {
      provide: JourneyRepository,
      useClass: PrismaJourneyRepository,
    },
  ],
  exports: [
    CreateJourneyUseCase,
    ListJourneysUseCase,
    GetJourneyUseCase,
  ],
})
export class JourneysModule {}
