'use server';

import { getSession } from '@/lib/session';
import { redirect } from 'next/navigation';

import { db } from '@/lib/db';

export const getRulesByUserId = async () => {
  try {
    const session = await getSession();
    if (!session) return redirect('/auth');
    const rules = await db.rules.findMany({ where: { userId: session.user.id } });
    return rules;
  } catch (error) {
    console.log(error);
    console.log('getRulesByUserId ISSUE');
    return [];
  }
};
