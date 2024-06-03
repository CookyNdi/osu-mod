'use server';

import { db } from '@/lib/db';

export const bulkReadNotification = async (userId: string) => {
  try {
    await db.notification.updateMany({
      where: { userId },
      data: {
        isRead: true,
      },
    });

    return { success: 'Notification Marked As Read' };
  } catch (error) {
    console.log(error);
    console.log('buldReadNotification ISSUE');
    return { error: 'Internal server error!' };
  }
};
