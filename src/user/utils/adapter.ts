import { UserRead } from '@/user/read/types';
import { User } from '@prisma/client';

export const userAdapter = (user: User): UserRead.Output => ({
  id: user.id,
  email: user.email,
  name: user.name,
  password: user.password,
});
