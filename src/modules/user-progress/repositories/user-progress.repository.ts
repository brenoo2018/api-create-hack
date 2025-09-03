import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { UserProgressRepository } from '../interfaces/user-progress-repository.interface';
import { StartJourneyDto, StartMissionDto } from '../schemas/user-progress.schema';
import { UserJourneyProgress, UserMissionProgress, UserStats } from '@prisma/client';

@Injectable()
export class PrismaUserProgressRepository extends UserProgressRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  // Journey Progress
  async findJourneyProgress(userId: string, journeyId: string): Promise<UserJourneyProgress | null> {
    return this.prismaService.userJourneyProgress.findUnique({
      where: {
        userId_journeyId: { userId, journeyId },
      },
    });
  }

  async createJourneyProgress(data: StartJourneyDto): Promise<UserJourneyProgress> {
    return this.prismaService.userJourneyProgress.create({
      data: {
        userId: data.userId,
        journeyId: data.journeyId,
        status: 'UNLOCKED',
        startedAt: new Date(),
      },
    });
  }

  async updateJourneyProgress(userId: string, journeyId: string, data: Partial<UserJourneyProgress>): Promise<UserJourneyProgress> {
    return this.prismaService.userJourneyProgress.update({
      where: {
        userId_journeyId: { userId, journeyId },
      },
      data,
    });
  }

  // Mission Progress
  async findMissionProgress(userId: string, missionId: string): Promise<UserMissionProgress | null> {
    return this.prismaService.userMissionProgress.findUnique({
      where: {
        userId_missionId: { userId, missionId },
      },
    });
  }

  async createMissionProgress(data: StartMissionDto): Promise<UserMissionProgress> {
    return this.prismaService.userMissionProgress.create({
      data: {
        userId: data.userId,
        missionId: data.missionId,
        status: 'UNLOCKED',
        earnedXp: 0,
      },
    });
  }

  async updateMissionProgress(userId: string, missionId: string, data: Partial<UserMissionProgress>): Promise<UserMissionProgress> {
    return this.prismaService.userMissionProgress.update({
      where: {
        userId_missionId: { userId, missionId },
      },
      data,
    });
  }

  async upsertMissionProgress(userId: string, missionId: string, createData: any, updateData: any): Promise<UserMissionProgress> {
    return this.prismaService.userMissionProgress.upsert({
      where: {
        userId_missionId: { userId, missionId },
      },
      create: createData,
      update: updateData,
    });
  }

  // User Stats
  async findUserStats(userId: string): Promise<UserStats | null> {
    return this.prismaService.userStats.findUnique({
      where: { userId },
    });
  }

  async createUserStats(userId: string, data: Partial<UserStats>): Promise<UserStats> {
    return this.prismaService.userStats.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async updateUserStats(userId: string, data: Partial<UserStats>): Promise<UserStats> {
    return this.prismaService.userStats.update({
      where: { userId },
      data,
    });
  }

  async upsertUserStats(userId: string, data: Partial<UserStats>): Promise<UserStats> {
    return this.prismaService.userStats.upsert({
      where: { userId },
      create: {
        userId,
        totalXp: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: new Date(),
        ...data,
      },
      update: data,
    });
  }
}
