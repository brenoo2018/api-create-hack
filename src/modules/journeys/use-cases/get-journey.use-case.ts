import { Injectable, NotFoundException } from '@nestjs/common';
import { JourneyRepository } from '../interfaces/journey-repository.interface';

@Injectable()
export class GetJourneyUseCase {
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(id: string, userId?: string) {
    if (userId) {
      const journey = await this.journeyRepository.findByIdWithUserProgress(id, userId);
      if (!journey) {
        throw new NotFoundException('Journey not found');
      }
      return journey;
    }

    const journey = await this.journeyRepository.findById(id);
    if (!journey) {
      throw new NotFoundException('Journey not found');
    }

    return journey;
  }
}
