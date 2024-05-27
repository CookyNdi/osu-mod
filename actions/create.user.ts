import { db } from '@/lib/db';
import { OsuUserDetails } from '@/types/osu-respone-api';

export const createUser = async (osuData: OsuUserDetails) => {
  try {
    const modderType = osuData.title ? osuData.title : 'modder';
    const user = await db.users.create({
      data: {
        id: osuData.id.toString(),
        username: osuData.username,
        previous_usernames: osuData.previous_usernames,
        country: osuData.country_code,
        avatar_url: osuData.avatar_url,
        ranked_beatmapset_count: osuData.ranked_beatmapset_count,
        guest_beatmapset_count: osuData.guest_beatmapset_count,
        loved_beatmapset_count: osuData.loved_beatmapset_count,
      },
    });
    await db.settings.create({
      data: {
        userId: user.id,
        modes: ['osu'],
        modder_type: modderType,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    console.log('CREATE USER ISSUE');
    return false;
  }
};
