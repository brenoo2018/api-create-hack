import { Mission } from '@prisma/client';
import { CreateMissionDto, MissionWithProgressDto } from '../schemas/mission.schema';

export abstract class MissionRepository {
  abstract create(data: CreateMissionDto): Promise<Mission>;
  abstract findById(id: string): Promise<Mission | null>;
  abstract findByIdWithUserProgress(id: string, userId: string): Promise<MissionWithProgressDto | null>;
  abstract findByJourneyId(journeyId: string): Promise<Mission[]>;
  abstract findByJourneyIdWithUserProgress(journeyId: string, userId: string): Promise<MissionWithProgressDto[]>;
  abstract findFirstByJourneyId(journeyId: string): Promise<Mission | null>;
  abstract findNextMission(journeyId: string, currentOrderIndex: number): Promise<Mission | null>;
  abstract update(id: string, data: Partial<CreateMissionDto>): Promise<Mission>;
  abstract delete(id: string): Promise<void>;
}
