import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../shared/database/prisma.service';
import { UserStatsResponseDto } from '../schemas/user-progress.schema';

@Injectable()
export class GetUserStatsUseCase {
  constructor(private readonly prismaService: PrismaService) {}

  async execute(userId: string): Promise<UserStatsResponseDto> {
    const stats = await this.prismaService.userStats.findUnique({
      where: { userId },
    });

    if (!stats) {
      // Return default stats if user doesn't have any yet
      return {
        userId,
        totalXp: 0,
        currentStreak: 0,
        longestStreak: 0,
        lastActiveDate: null,
      };
    }

    return stats;
  }
}
