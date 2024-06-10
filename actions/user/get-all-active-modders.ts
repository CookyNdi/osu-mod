'use server';

import { db } from '@/lib/db';

export const getAllActiveModders = async () => {
  try {
    const user = await db.users.findMany({
      where: { Settings: { some: { modder_type: 'modder', NOT: { modder_type: 'visitor' } } } },
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
    console.log('getAllActiveModders ISSUE');
    return [];
  }
};
