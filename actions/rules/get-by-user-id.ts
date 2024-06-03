'use server';

import { Session } from 'next-auth';

import { db } from '@/lib/db';

export const getRulesByUserId = async (session: Session) => {
  try {
    const rules = await db.rules.findMany({ where: { userId: session.user.id } });
    return rules;
  } catch (error) {
    console.log(error);
    console.log('getRulesByUserId ISSUE');
    return [];
  }
};
