'use server';

import { db } from '@/lib/db';
import { getOsuUserDetails } from '@/data/osu-data';
import { getUserById } from '@/data/users';

export const updateUserData = async (userId: string) => {
  try {
    const existingUser = await getUserById(userId);
    if (!existingUser) return { error: 'User Not Found' };

    const osuUserData = await getOsuUserDetails(existingUser.id);
    if (!osuUserData) return { error: 'Osu Server Data Is Dead' };

    const user = await db.users.update({
      where: { id: existingUser.id },
      data: {
        username: osuUserData.username,
        previous_usernames: osuUserData.previous_usernames,
        country: osuUserData.country_code,
        avatar_url: osuUserData.avatar_url,
        ranked_beatmapset_count: osuUserData.ranked_beatmapset_count,
        guest_beatmapset_count: osuUserData.guest_beatmapset_count,
        loved_beatmapset_count: osuUserData.loved_beatmapset_count,
      },
    });
    if (osuUserData.title) {
      await db.settings.update({
        where: { userId: user.id },
        data: { modder_type: osuUserData.title },
      });
    }

    return { success: "Your Osu data's Updated!" };
  } catch (error) {
    console.log(error);
    console.log('updateUserData ISSUE');
    return { error: 'Internal server error!' };
  }
};
