'use server';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export const getAllMyRequest = async () => {
  try {
    const session = await getSession();
    if (!session) return redirect('/auth');
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
