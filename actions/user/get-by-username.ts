'use server';

import { db } from '@/lib/db';

export const getUserByUsername = async (username: string) => {
  try {
    const user = await db.users.findUnique({
      where: { username },
      include: {
        Settings: {
          select: {
            modes: true,
            modder_type: true,
            open: true,
          },
        },
      },
    });
    return user;
  } catch (error) {
    console.log(error);
    console.log('getUserByUsername ISSUE');
    return null;
  }
};
