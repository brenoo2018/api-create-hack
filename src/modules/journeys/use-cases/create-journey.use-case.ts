import { Injectable } from '@nestjs/common';
import { JourneyRepository } from '../interfaces/journey-repository.interface';
import { CreateJourneyDto } from '../schemas/journey.schema';
import { generateSlug } from '../../../shared/utils/slug.util';

@Injectable()
export class CreateJourneyUseCase {
  constructor(private readonly journeyRepository: JourneyRepository) {}

  async execute(data: CreateJourneyDto) {
    // Generate slug from title
    const slug = generateSlug(data.title);
    
    // Check if slug already exists
    const existingJourney = await this.journeyRepository.findBySlug(slug);

    if (existingJourney) {
      throw new Error('Journey with this title already exists');
    }

    return this.journeyRepository.create({
      ...data,
      slug,
    });
  }
}
