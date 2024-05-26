import * as z from 'zod';

export const formRequest = z.object({
  map_link: z.string().regex(/^https:\/\/osu\.ppy\.sh\/beatmapsets\/(?:\d+(?:#(?:osu|mania|taiko|fruits)\/\d+)?)?$/, {
    message: 'Not Valid URL',
  }),
  mapper_comment: z.string().max(255),
});
