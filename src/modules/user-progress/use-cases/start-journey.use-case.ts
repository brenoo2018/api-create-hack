import { Injectable, BadRequestException } from '@nestjs/common';
import { UserProgressRepository } from '../interfaces/user-progress-repository.interface';
import { MissionRepository } from '../../missions/interfaces/mission-repository.interface';
import { StartJourneyDto, JourneyProgressResponseDto } from '../schemas/user-progress.schema';

@Injectable()
export class StartJourneyUseCase {
  constructor(
    private readonly userProgressRepository: UserProgressRepository,
    private readonly missionRepository: MissionRepository,
  ) {}

  async execute(data: StartJourneyDto): Promise<JourneyProgressResponseDto> {
    // Check if journey exists
    // Check if user already has progress for this journey
    const existingProgress = await this.userProgressRepository.findJourneyProgress(data.userId, data.journeyId);

    if (existingProgress) {
      if (existingProgress.status === 'COMPLETED') {
        throw new BadRequestException('Journey already completed');
      }
      return existingProgress as any;
    }

    // Create new journey progress
    const progress = await this.userProgressRepository.createJourneyProgress(data);

    // Unlock the first mission of the journey
    await this.unlockFirstMission(data.userId, data.journeyId);

    return progress as any;
  }

  private async unlockFirstMission(userId: string, journeyId: string): Promise<void> {
    const firstMission = await this.missionRepository.findFirstByJourneyId(journeyId);

    if (firstMission) {
      await this.userProgressRepository.upsertMissionProgress(
        userId,
        firstMission.id,
        {
          userId,
          missionId: firstMission.id,
          status: 'UNLOCKED',
          earnedXp: 0,
        },
        {
          status: 'UNLOCKED',
        }
      );
    }
  }
}
