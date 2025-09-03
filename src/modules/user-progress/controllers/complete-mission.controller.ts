import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { CompleteMissionUseCase } from '../use-cases/complete-mission.use-case';
import { CompleteMissionDto, completeMissionSchema } from '../schemas/user-progress.schema';

@Controller('user-progress/missions')
export class CompleteMissionController {
  constructor(private readonly completeMissionUseCase: CompleteMissionUseCase) {}

  @Post('complete')
  async complete(
    @Body(new ZodValidationPipe(completeMissionSchema)) data: CompleteMissionDto,
  ) {
    return this.completeMissionUseCase.execute(data);
  }
}
