import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { StartMissionDto, MissionProgressResponseDto } from '../schemas/user-progress.schema';

@Injectable()
export class StartMissionUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(data: StartMissionDto): Promise<MissionProgressResponseDto> {
    // Check if mission exists
    const mission = await this.prismaService.mission.findUnique({
      where: { id: data.missionId },
    });

    if (!mission) {
      throw new BadRequestException('Mission not found');
    }

    // Check if user already has progress for this mission
    const existingProgress = await this.prismaService.userMissionProgress.findUnique({
      where: {
        userId_missionId: {
          userId: data.userId,
          missionId: data.missionId,
        },
      },
    });

    if (existingProgress) {
      if (existingProgress.status === 'DONE') {
        throw new BadRequestException('Mission already completed');
      }
      // Update existing progress to UNLOCKED if it was LOCKED
      if (existingProgress.status === 'LOCKED') {
        const updatedProgress = await this.prismaService.userMissionProgress.update({
          where: { id: existingProgress.id },
          data: {
            status: 'UNLOCKED',
            startedAt: new Date(),
          },
        });
        return updatedProgress as any;
      }
      return existingProgress as any;
    }

    // Create new progress
    const progress = await this.prismaService.userMissionProgress.create({
      data: {
        userId: data.userId,
        missionId: data.missionId,
        status: 'UNLOCKED',
        startedAt: new Date(),
      },
    });

    return progress as any;
  }
}
