import { Injectable, NotFoundException } from '@nestjs/common';
import { MissionRepository } from '../interfaces/mission-repository.interface';

@Injectable()
export class GetMissionUseCase {
  constructor(private readonly missionRepository: MissionRepository) {}

  async execute(id: string, userId?: string) {
    if (userId) {
      const mission = await this.missionRepository.findByIdWithUserProgress(id, userId);
      if (!mission) {
        throw new NotFoundException('Mission not found');
      }
      return mission;
    }

    const mission = await this.missionRepository.findById(id);
    if (!mission) {
      throw new NotFoundException('Mission not found');
    }

    return mission;
  }
}
