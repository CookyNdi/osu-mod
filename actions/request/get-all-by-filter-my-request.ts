'use server';

import { Session } from 'next-auth';
import { STATUS } from '@prisma/client';

import { db } from '@/lib/db';

export const getAllByFilterMyRequest = async (session: Session, status: STATUS) => {
  try {
    const request = await db.request.findMany({
      where: { requestUserId: session.user.id, status },
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
    console.log('getAllByFilterMyRequest ISSUE');
    return [];
  }
};
