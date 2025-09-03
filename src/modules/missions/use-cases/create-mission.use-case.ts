import { Injectable } from '@nestjs/common';
import { MissionRepository } from '../interfaces/mission-repository.interface';
import { CreateMissionDto } from '../schemas/mission.schema';

@Injectable()
export class CreateMissionUseCase {
  constructor(private readonly missionRepository: MissionRepository) {}

  async execute(data: CreateMissionDto) {
    return this.missionRepository.create(data);
  }
}
