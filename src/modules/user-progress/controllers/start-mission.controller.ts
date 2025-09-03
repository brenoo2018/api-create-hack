import { Body, Controller, Post } from '@nestjs/common';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';
import { StartMissionUseCase } from '../use-cases/start-mission.use-case';
import { StartMissionDto, startMissionSchema } from '../schemas/user-progress.schema';

@Controller('user-progress/missions')
export class StartMissionController {
  constructor(private readonly startMissionUseCase: StartMissionUseCase) {}

  @Post('start')
  async start(
    @Body(new ZodValidationPipe(startMissionSchema)) data: StartMissionDto,
  ) {
    return this.startMissionUseCase.execute(data);
  }
}
