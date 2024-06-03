import { Beatmaps, Notification, Request } from '@prisma/client';

export type notifications = Notification & { request: Request & { beatmap: Beatmaps } };
