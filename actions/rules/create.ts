'use server';

import { redirect } from 'next/navigation';
import { RulesType } from '@prisma/client';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export const createRules = async (message: string, type: RulesType, isAccepted: boolean) => {
  try {
    const session = await getSession();
    if (!session) return redirect('/auth');

    await db.rules.create({ data: { userId: session.user.id, message, type, isAccepted } });
    return { success: `${type} Created Successfully` };
  } catch (error) {
    console.log(error);
    console.log('createRules ISSUE');
    return { error: 'Internal server error!' };
  }
};
