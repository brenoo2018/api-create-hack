import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { JourneyRepository } from '../interfaces/journey-repository.interface';
import { CreateJourneyDto, JourneyWithProgressDto } from '../schemas/journey.schema';
import { Journey } from '@prisma/client';

@Injectable()
export class PrismaJourneyRepository extends JourneyRepository {
  constructor(private readonly prismaService: PrismaService) {
    super();
  }

  async create(data: CreateJourneyDto & { slug: string }): Promise<Journey> {
    return this.prismaService.journey.create({
      data,
    });
  }

  async findAll(): Promise<Journey[]> {
    return this.prismaService.journey.findMany({
      orderBy: { orderIndex: 'asc' },
    });
  }

  async findAllWithUserProgress(userId: string): Promise<JourneyWithProgressDto[]> {
    const journeys = await this.prismaService.journey.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        userProgress: {
          where: { userId },
          select: {
            status: true,
            startedAt: true,
            completedAt: true,
          },
        },
      },
    });

    return journeys.map(journey => ({
      ...journey,
      userProgress: journey.userProgress[0] || null,
    })) as any;
  }

  async findById(id: string): Promise<Journey | null> {
    return this.prismaService.journey.findUnique({
      where: { id },
    });
  }

  async findByIdWithUserProgress(id: string, userId: string): Promise<JourneyWithProgressDto | null> {
    const journey = await this.prismaService.journey.findUnique({
      where: { id },
      include: {
        userProgress: {
          where: { userId },
          select: {
            status: true,
            startedAt: true,
            completedAt: true,
          },
        },
      },
    });

    if (!journey) return null;

    return {
      ...journey,
      userProgress: journey.userProgress[0] || null,
    } as any;
  }

  async findBySlug(slug: string): Promise<Journey | null> {
    return this.prismaService.journey.findUnique({
      where: { slug },
    });
  }

  async update(id: string, data: Partial<CreateJourneyDto>): Promise<Journey> {
    return this.prismaService.journey.update({
      where: { id },
      data,
    });
  }

  async delete(id: string): Promise<void> {
    await this.prismaService.journey.delete({
      where: { id },
    });
  }
}
