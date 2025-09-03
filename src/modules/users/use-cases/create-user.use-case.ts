import { Injectable, ConflictException } from '@nestjs/common';
import { UserRepository } from '../interfaces/user-repository.interface';
import { PasswordHashRepository } from '../../../shared/interfaces/password-hash-repository.interface';
import { CreateUserDto } from '../schemas/user.schema';

@Injectable()
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordHashRepository: PasswordHashRepository,
  ) {}

  async execute(data: CreateUserDto) {
    const existingUser = await this.userRepository.findByEmail(data.email);
    
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // Hash password
    const hashedPassword = await this.passwordHashRepository.hash(data.password);

    return this.userRepository.create({
      ...data,
      password: hashedPassword,
    });
  }
}
