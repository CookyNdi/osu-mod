'use server';

import { db } from '@/lib/db';

export const getUserSettings = async (userId: string) => {
  try {
    const settings = await db.settings.findUnique({ where: { userId } });
    return { success: 'Get Setting Successfully', data: settings };
  } catch (error) {
    console.log(error);
    console.log('getUserSettings ISSUE');
    return { error: 'Internal server error!', data: null };
  }
};
