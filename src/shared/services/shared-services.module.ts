import { Module } from '@nestjs/common';
import { ApologistService } from './apologist.service';

@Module({
  providers: [ApologistService],
  exports: [ApologistService],
})
export class SharedServicesModule {}
