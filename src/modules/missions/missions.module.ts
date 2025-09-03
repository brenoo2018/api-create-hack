import { Module } from '@nestjs/common';
import { CreateMissionController } from './controllers/create-mission.controller';
import { ListMissionsByJourneyController } from './controllers/list-missions-by-journey.controller';
import { GetMissionController } from './controllers/get-mission.controller';
import { CreateMissionUseCase } from './use-cases/create-mission.use-case';
import { ListMissionsByJourneyUseCase } from './use-cases/list-missions-by-journey.use-case';
import { GetMissionUseCase } from './use-cases/get-mission.use-case';
import { MissionRepository } from './interfaces/mission-repository.interface';
import { PrismaMissionRepository } from './repositories/mission.repository';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateMissionController,
    ListMissionsByJourneyController,
    GetMissionController,
  ],
  providers: [
    CreateMissionUseCase,
    ListMissionsByJourneyUseCase,
    GetMissionUseCase,
    {
      provide: MissionRepository,
      useClass: PrismaMissionRepository,
    },
  ],
  exports: [
    CreateMissionUseCase,
    ListMissionsByJourneyUseCase,
    GetMissionUseCase,
  ],
})
export class MissionsModule {}
