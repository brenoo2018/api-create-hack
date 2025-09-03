import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { CompleteMissionDto, MissionProgressResponseDto } from '../schemas/user-progress.schema';

@Injectable()
export class CompleteMissionUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(data: CompleteMissionDto): Promise<MissionProgressResponseDto> {
    // Get mission details
    const mission = await this.prismaService.mission.findUnique({
      where: { id: data.missionId },
    });

    if (!mission) {
      throw new BadRequestException('Mission not found');
    }

    // Get or create mission progress
    let progress = await this.prismaService.userMissionProgress.findUnique({
      where: {
        userId_missionId: {
          userId: data.userId,
          missionId: data.missionId,
        },
      },
    });

    if (!progress) {
      // Create progress if it doesn't exist
      progress = await this.prismaService.userMissionProgress.create({
        data: {
          userId: data.userId,
          missionId: data.missionId,
          status: 'UNLOCKED',
          startedAt: new Date(),
        },
      });
    }

    if (progress.status === 'DONE') {
      throw new BadRequestException('Mission already completed');
    }

    // Calculate earned XP (use provided or default to mission XP)
    const earnedXp = data.earnedXp ?? mission.xpAmount;

    // Complete the mission
    const completedProgress = await this.prismaService.userMissionProgress.update({
      where: { id: progress.id },
      data: {
        status: 'DONE',
        score: data.score,
        earnedXp,
        finishedAt: new Date(),
      },
    });

    // Update user stats
    await this.updateUserStats(data.userId, earnedXp);

    // Unlock next mission in the journey
    await this.unlockNextMission(data.userId, mission.journeyId, mission.orderIndex);

    return completedProgress as any;
  }

  private async updateUserStats(userId: string, earnedXp: number): Promise<void> {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    await this.prismaService.userStats.upsert({
      where: { userId },
      create: {
        userId,
        totalXp: earnedXp,
        currentStreak: 1,
        longestStreak: 1,
        lastActiveDate: today,
      },
      update: {
        totalXp: { increment: earnedXp },
        lastActiveDate: today,
        // Streak logic can be implemented here based on lastActiveDate
      },
    });
  }

  private async unlockNextMission(userId: string, journeyId: string, currentOrderIndex: number): Promise<void> {
    // Find the next mission in the journey
    const nextMission = await this.prismaService.mission.findFirst({
      where: {
        journeyId,
        orderIndex: currentOrderIndex + 1,
      },
    });

    if (nextMission) {
      // Check if user already has progress for the next mission
      const existingProgress = await this.prismaService.userMissionProgress.findUnique({
        where: {
          userId_missionId: {
            userId,
            missionId: nextMission.id,
          },
        },
      });

      if (!existingProgress) {
        // Create unlocked progress for the next mission
        await this.prismaService.userMissionProgress.create({
          data: {
            userId,
            missionId: nextMission.id,
            status: 'UNLOCKED',
          },
        });
      }
    }
  }
}
