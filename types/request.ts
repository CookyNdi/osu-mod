import { Beatmaps, BeatmapSetDiff, Request } from '@prisma/client';

export type RequestData = Request & { beatmap: Beatmaps & { BeatmapSetDiff: BeatmapSetDiff[] } } & {
  user: { id: string; username: string; avatar_url: string; Settings: { modder_type: string }[] };
};
