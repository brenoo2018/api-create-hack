import { z } from 'zod';

export const CreateUserSchema = z.object({
  email: z.string().email(),
  nickname: z.string().min(1).optional(),
  password: z.string().min(1),
  gender: z.string().optional(),
  avatarUrl: z.string().optional(),
});

export const UpdateUserSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().min(1).optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
