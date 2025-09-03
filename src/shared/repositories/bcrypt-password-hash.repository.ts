import { Injectable } from '@nestjs/common';
import { PasswordHashRepository } from '../interfaces/password-hash-repository.interface';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptPasswordHashRepository extends PasswordHashRepository {
  private readonly saltRounds = 8;

  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }
}
