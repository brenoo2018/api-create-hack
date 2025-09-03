import { Injectable } from '@nestjs/common';
import { JourneyRepository } from '../interfaces/journey-repository.interface';
import { ListJourneysDto } from '../schemas/journey.schema';

@Injectable()
export class ListJourneysUseCase {
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(data: ListJourneysDto) {
    if (data.userId) {
      return this.journeyRepository.findAllWithUserProgress(data.userId);
    }

    return this.journeyRepository.findAll();
  }
}
