'use server';
import { db } from '@/lib/db';

export const readNotification = async (notificationId: string) => {
  try {
    await db.notification.update({
      where: { id: notificationId },
      data: {
        isRead: true,
      },
    });

    return { success: 'Notification Marked As Read' };
  } catch (error) {
    console.log(error);
    console.log('readNotification ISSUE');
    return { error: 'Internal server error!' };
  }
};
