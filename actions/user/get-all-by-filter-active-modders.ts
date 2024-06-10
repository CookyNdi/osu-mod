'use server';

import { db } from '@/lib/db';

export const getAllByFilterActiveModders = async (mode: string[], type: string) => {
  try {
    const user = await db.users.findMany({
      where: {
        Settings: {
          some: { modes: { hasSome: mode }, modder_type: type || 'modder', NOT: { modder_type: 'visitor' } },
        },
      },
      orderBy: { last_action: 'desc' },
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
    console.log('getAllByTypeActiveModders ISSUE');
    return [];
  }
};
