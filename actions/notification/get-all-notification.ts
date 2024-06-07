'use server';

import { Session } from 'next-auth';

import { db } from '@/lib/db';

export const getAllNotification = async (session: Session | null) => {
  try {
    if (!session) return [];
    const notification = await db.notification.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        request: {
          select: {
            id: true,
            createdAt: true,
            archived: true,
            beatmapId: true,
            feedback: true,
            mapper_message: true,
            requestUserId: true,
            status: true,
            targetUserId: true,
            beatmap: true,
          },
        },
        user: {
          select: {
            id: true,
            username: true,
            avatar_url: true,
            Settings: { select: { modder_type: true } },
          },
        },
      },
    });

    return notification;
  } catch (error) {
    console.log(error);
    console.log('getAllNotification ISSUE');
    return [];
  }
};
