import { db } from '@/lib/db';

export const getUserById = async (userId: string) => {
  try {
    const user = await db.users.findUnique({ where: { id: userId } });
    return user;
  } catch {
    return null;
  }
};
