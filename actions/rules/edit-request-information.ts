'use server';

import { redirect } from 'next/navigation';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export const editRequestInformation = async (message: string, id: string) => {
  try {
    const session = await getSession();
    if (!session) return redirect('/auth');

    await db.rules.update({ where: { id }, data: { message } });
    return { success: `Request Information Edited Successfully` };
  } catch (error) {
    console.log(error);
    console.log('editRequestInformation ISSUE');
    return { error: 'Internal server error!' };
  }
};
