import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { CreateMissionUseCase } from '../use-cases/create-mission.use-case';
import { CreateMissionDto, createMissionSchema } from '../schemas/mission.schema';

@Controller('missions')
export class CreateMissionController {
  constructor(private readonly createMissionUseCase: CreateMissionUseCase) {}

  @Post()
  async create(
    @Body(new ZodValidationPipe(createMissionSchema)) data: CreateMissionDto,
  ) {
    return this.createMissionUseCase.execute(data);
  }
}
