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
    const targetUserSetting = await db.settings.findUnique({ where: { userId: targetUserId } });
    const allRequest = await db.request.findMany({ where: { requestUserId: session.user.id } });
    const prevRequest = allRequest.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];

    const now = new Date();
    const cooldownTime = targetUserSetting!.request_cooldown * 86400000; // 1 day in milliseconds
    const timeSinceLastMessage = now.getTime() - prevRequest.createdAt.getTime();

    if (timeSinceLastMessage <= cooldownTime) {
      return { error: `You can only send one request every ${targetUserSetting!.request_cooldown} days` };
    }

    const recentRequest = await db.request.findMany({ where: { targetUserId, AND: { status: 'PENDING' } } });

    if (recentRequest.length >= targetUserSetting!.queue_limit) {
      return { error: `Nice try bro, queue this modder already full for now, try again latter` };
    }

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
          preview_url: beatmapData.preview_url,
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

    const request = await db.request.create({
      data: {
        requestUserId: session.user.id,
        targetUserId: targetUserId,
        mapper_message: mapper_comment,
        beatmapId: beatmap.id,
      },
    });

    await db.notification.create({
      data: {
        userId: request.targetUserId,
        requestId: request.id,
        type: 'NEW_REQUEST',
        message: 'new request',
      },
    });

    return { success: 'Your request has been created.' };
  } catch (error) {
    console.log(error);
    console.log('createRequest ISSUE');
    return { error: 'Internal server error!' };
  }
};
