'use server';

import { getUserById } from '@/data/users';
import { db } from '@/lib/db';

type SettingsData = {
  data: {
    modes: string[];
    open: boolean;
    queueLimit: number;
    requestCooldown: number;
    modderType: string;
  };
};

export const updateUserSettings = async ({ data }: SettingsData, userId: string) => {
  try {
    const existingUser = await getUserById(userId);
    if (!existingUser) return { error: 'User Not Found' };

    await db.settings.update({
      where: { userId: existingUser.id },
      data: {
        modes: data.modes,
        open: data.open,
        queue_limit: data.queueLimit,
        request_cooldown: data.requestCooldown,
        modder_type: data.modderType,
      },
    });
    return { success: "Your data's Updated!" };
  } catch (error) {
    console.log(error);
    console.log('updateUserSettings ISSUE');
    return { error: 'Internal server error!' };
  }
};
