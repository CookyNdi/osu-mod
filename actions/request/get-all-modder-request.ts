'use server';

import { db } from '@/lib/db';
import { getUserByUsername } from '@/data/users';

export const getAllModderRequest = async (username: string) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) return [];
    const request = await db.request.findMany({
      where: { targetUserId: user.id },
      orderBy: { createdAt: 'asc' },
      include: {
        user: { select: { id: true, username: true, avatar_url: true } },
        beatmap: {
          select: {
            id: true,
            title: true,
            artist: true,
            bpm: true,
            creator: true,
            cover_url: true,
            length: true,
            BeatmapSetDiff: {
              select: { id: true, beatmapId: true, difficulty_rating: true, mode: true, version: true },
            },
          },
        },
      },
    });

    return request;
  } catch (error) {
    console.log(error);
    console.log('getAllMyRequest ISSUE');
    return [];
  }
};
