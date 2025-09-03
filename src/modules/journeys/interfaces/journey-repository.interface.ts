import { Journey, UserJourneyProgress } from '@prisma/client';
import { CreateJourneyDto, JourneyResponseDto, JourneyWithProgressDto } from '../schemas/journey.schema';

export abstract class JourneyRepository {
  abstract create(data: CreateJourneyDto & { slug: string }): Promise<Journey>;
  abstract findAll(): Promise<Journey[]>;
  abstract findAllWithUserProgress(userId: string): Promise<JourneyWithProgressDto[]>;
  abstract findById(id: string): Promise<Journey | null>;
  abstract findByIdWithUserProgress(id: string, userId: string): Promise<JourneyWithProgressDto | null>;
  abstract findBySlug(slug: string): Promise<Journey | null>;
  abstract update(id: string, data: Partial<CreateJourneyDto>): Promise<Journey>;
  abstract delete(id: string): Promise<void>;
}
