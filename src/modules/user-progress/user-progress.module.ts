import { Module } from '@nestjs/common';
import { StartJourneyController } from './controllers/start-journey.controller';
import { StartMissionController } from './controllers/start-mission.controller';
import { CompleteMissionController } from './controllers/complete-mission.controller';
import { GetUserStatsController } from './controllers/get-user-stats.controller';
import { StartJourneyUseCase } from './use-cases/start-journey.use-case';
import { StartMissionUseCase } from './use-cases/start-mission.use-case';
import { CompleteMissionUseCase } from './use-cases/complete-mission.use-case';
import { GetUserStatsUseCase } from './use-cases/get-user-stats.use-case';
import { UserProgressRepository } from './interfaces/user-progress-repository.interface';
import { PrismaUserProgressRepository } from './repositories/user-progress.repository';
import { MissionRepository } from '../missions/interfaces/mission-repository.interface';
import { PrismaMissionRepository } from '../missions/repositories/mission.repository';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    StartJourneyController,
    StartMissionController,
    CompleteMissionController,
    GetUserStatsController,
  ],
  providers: [
    StartJourneyUseCase,
    StartMissionUseCase,
    CompleteMissionUseCase,
    GetUserStatsUseCase,
    {
      provide: UserProgressRepository,
      useClass: PrismaUserProgressRepository,
    },
    {
      provide: MissionRepository,
      useClass: PrismaMissionRepository,
    },
  ],
  exports: [
    StartJourneyUseCase,
    StartMissionUseCase,
    CompleteMissionUseCase,
    GetUserStatsUseCase,
  ],
})
export class UserProgressModule {}
