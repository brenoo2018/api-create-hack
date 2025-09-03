import { UserJourneyProgress, UserMissionProgress, UserStats } from '@prisma/client';
import { StartJourneyDto, StartMissionDto, CompleteMissionDto } from '../schemas/user-progress.schema';

export abstract class UserProgressRepository {
  // Journey Progress
  abstract findJourneyProgress(userId: string, journeyId: string): Promise<UserJourneyProgress | null>;
  abstract createJourneyProgress(data: StartJourneyDto): Promise<UserJourneyProgress>;
  abstract updateJourneyProgress(userId: string, journeyId: string, data: Partial<UserJourneyProgress>): Promise<UserJourneyProgress>;

  // Mission Progress
  abstract findMissionProgress(userId: string, missionId: string): Promise<UserMissionProgress | null>;
  abstract createMissionProgress(data: StartMissionDto): Promise<UserMissionProgress>;
  abstract updateMissionProgress(userId: string, missionId: string, data: Partial<UserMissionProgress>): Promise<UserMissionProgress>;
  abstract upsertMissionProgress(userId: string, missionId: string, createData: any, updateData: any): Promise<UserMissionProgress>;

  // User Stats
  abstract findUserStats(userId: string): Promise<UserStats | null>;
  abstract createUserStats(userId: string, data: Partial<UserStats>): Promise<UserStats>;
  abstract updateUserStats(userId: string, data: Partial<UserStats>): Promise<UserStats>;
  abstract upsertUserStats(userId: string, data: Partial<UserStats>): Promise<UserStats>;
}
