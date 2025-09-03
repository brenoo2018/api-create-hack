import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { MissionRepository } from '../interfaces/mission-repository.interface';
import { CreateMissionDto, MissionWithProgressDto } from '../schemas/mission.schema';
import { Mission } from '@prisma/client';

@Injectable()
export class PrismaMissionRepository extends MissionRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async create(data: CreateMissionDto): Promise<Mission> {
    return this.prismaService.mission.create({
      data: data as any,
    });
  }

  async findById(id: string): Promise<Mission | null> {
    return this.prismaService.mission.findUnique({
      where: { id },
    });
  }

  async findByIdWithUserProgress(id: string, userId: string): Promise<MissionWithProgressDto | null> {
    const mission = await this.prismaService.mission.findUnique({
      where: { id },
      include: {
        userProgress: {
          where: { userId },
          select: {
            status: true,
            score: true,
            earnedXp: true,
            startedAt: true,
            finishedAt: true,
          },
        },
      },
    });

    if (!mission) return null;

    return {
      ...mission,
      userProgress: mission.userProgress[0] || null,
    } as any;
  }

  async findByJourneyId(journeyId: string): Promise<Mission[]> {
    return this.prismaService.mission.findMany({
      where: { journeyId },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findByJourneyIdWithUserProgress(journeyId: string, userId: string): Promise<MissionWithProgressDto[]> {
    const missions = await this.prismaService.mission.findMany({
      where: { journeyId },
      orderBy: { orderIndex: 'asc' },
      include: {
        userProgress: {
          where: { userId },
          select: {
            status: true,
            score: true,
            earnedXp: true,
            startedAt: true,
            finishedAt: true,
          },
        },
      },
    });

    return missions.map(mission => ({
      ...mission,
      userProgress: mission.userProgress[0] || null,
    })) as any;
  }

  async findFirstByJourneyId(journeyId: string): Promise<Mission | null> {
    return this.prismaService.mission.findFirst({
      where: { journeyId },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findNextMission(journeyId: string, currentOrderIndex: number): Promise<Mission | null> {
    return this.prismaService.mission.findFirst({
      where: {
        journeyId,
        orderIndex: { gt: currentOrderIndex },
      },
      orderBy: { orderIndex: 'asc' },
    });
  }

  async update(id: string, data: Partial<CreateMissionDto>): Promise<Mission> {
    return this.prismaService.mission.update({
      where: { id },
      data: data as any,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.mission.delete({
      where: { id },
    });
  }
}
