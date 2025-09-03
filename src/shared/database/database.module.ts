import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PrismaUserRepository } from '../../modules/users/repositories/user.repository';
import { UserRepository } from '../../modules/users/interfaces/user-repository.interface';

@Global()
@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    PrismaService,
    UserRepository,
  ],
})
export class DatabaseModule {}
