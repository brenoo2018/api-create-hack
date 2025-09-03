import { Controller, Post, Body, UsePipes } from '@nestjs/common';
import { CreateUserUseCase } from '../use-cases/create-user.use-case';
import { CreateUserSchema, CreateUserDto } from '../schemas/user.schema';
import { ZodValidationPipe } from '../../../shared/validation/zod-validation.pipe';

@Controller('users')
export class CreateUserController {
  constructor(private createUserUseCase: CreateUserUseCase) {}

  @Post()
  @UsePipes(new ZodValidationPipe(CreateUserSchema))
  async create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }
}
