import { User } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from '../schemas/user.schema';

export abstract class UserRepository {
  abstract create(data: CreateUserDto): Promise<User>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract update(id: string, data: UpdateUserDto): Promise<User>;
  abstract delete(id: string): Promise<User>;
  abstract findAll(): Promise<User[]>;
}
