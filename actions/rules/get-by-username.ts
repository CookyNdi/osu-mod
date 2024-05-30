'use server';

import { db } from '@/lib/db';
import { getUserByUsername } from '@/data/users';

export const getRulesByUsername = async (username: string) => {
  try {
    const user = await getUserByUsername(username);
    if (!user) return [];
    const rules = await db.rules.findMany({ where: { userId: user.id } });
    return rules;
  } catch (error) {
    console.log(error);
    console.log('getRulesByUserId ISSUE');
    return [];
  }
};
