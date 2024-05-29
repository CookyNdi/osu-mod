'use server';
import { redirect } from 'next/navigation';
import * as z from 'zod';

import { db } from '@/lib/db';
import { formRequest } from '@/schemas';
import { getOsuBeatmapDetails } from '@/data/osu-data';
import { Beatmaps } from '@prisma/client';
import { getSession } from '@/lib/session';

export const createRequest = async (targetUserId: string, values: z.infer<typeof formRequest>) => {
  const validateFields = formRequest.safeParse(values);
  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }
  const { map_link, mapper_comment } = validateFields.data;
  const beatmapsetId = map_link.split('beatmapsets/')[1].split(/[\/#]/)[0];

  const session = await getSession();
  if (!session) return redirect('/auth');

  try {
    const beatmapData = await getOsuBeatmapDetails(beatmapsetId);
    if (!beatmapData) return { error: 'Osu Server Data Is Dead' };
    if (beatmapData.error) return { error: beatmapData.error };

    const existingBeatmap = await db.beatmaps.findUnique({ where: { id: beatmapData.id } });
    let beatmap: Beatmaps;
    if (!existingBeatmap) {
      beatmap = await db.beatmaps.create({
        data: {
          id: beatmapData.id,
          artist: beatmapData.artist,
          title: beatmapData.title,
          bpm: beatmapData.bpm,
          length: beatmapData.beatmaps[0].total_length,
          cover_url: beatmapData.covers.cover,
          creator: beatmapData.creator,
        },
      });
      beatmapData.beatmaps.map(async (data) => {
        await db.beatmapSetDiff.create({
          data: {
            beatmapId: beatmap.id,
            difficulty_rating: data.difficulty_rating.toString(),
            mode: data.mode,
            version: data.version,
          },
        });
      });
    } else {
      beatmap = existingBeatmap;
    }

    await db.request.create({
      data: {
        requestUserId: session.user.id,
        targetUserId: targetUserId,
        mapper_message: mapper_comment,
        beatmapId: beatmap.id,
      },
    });

    return { success: 'Create Request Successfully' };
  } catch (error) {
    console.log(error);
    console.log('createRequest ISSUE');
    return { error: 'Internal server error!' };
  }
};
