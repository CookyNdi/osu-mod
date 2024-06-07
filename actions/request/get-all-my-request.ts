'use server';

import { Session } from 'next-auth';

import { db } from '@/lib/db';

export const getAllMyRequest = async (session: Session) => {
  try {
    const request = await db.request.findMany({
      where: { requestUserId: session.user.id },
      orderBy: { createdAt: 'desc' },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            avatar_url: true,
            Settings: { select: { modder_type: true } },
          },
        },
        beatmap: {
          select: {
            id: true,
            title: true,
            artist: true,
            bpm: true,
            creator: true,
            cover_url: true,
            preview_url: true,
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
