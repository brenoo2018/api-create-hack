import { Module } from '@nestjs/common';
import { CreateUserController } from './controllers/create-user.controller';
import { CreateUserUseCase } from './use-cases/create-user.use-case';
import { UserRepository } from './interfaces/user-repository.interface';
import { PrismaUserRepository } from './repositories/user.repository';
import { PasswordHashRepository } from '../../shared/interfaces/password-hash-repository.interface';
import { BcryptPasswordHashRepository } from '../../shared/repositories/bcrypt-password-hash.repository';
import { DatabaseModule } from '../../shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [
    CreateUserController,
  ],
  providers: [
    CreateUserUseCase,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: PasswordHashRepository,
      useClass: BcryptPasswordHashRepository,
    },
  ],
  exports: [
    CreateUserUseCase,
  ],
})
export class UsersModule {}
