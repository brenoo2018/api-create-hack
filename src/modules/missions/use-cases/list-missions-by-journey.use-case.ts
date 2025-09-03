import { Injectable } from '@nestjs/common';
import { MissionRepository } from '../interfaces/mission-repository.interface';

@Injectable()
export class ListMissionsByJourneyUseCase {
  constructor(private readonly missionRepository: MissionRepository) {}

  async execute(journeyId: string, userId?: string) {
    if (userId) {
      return this.missionRepository.findByJourneyIdWithUserProgress(journeyId, userId);
    }

    return this.missionRepository.findByJourneyId(journeyId);
  }
}
