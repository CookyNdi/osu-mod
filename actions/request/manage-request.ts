'use server';

import { redirect } from 'next/navigation';
import { STATUS } from '@prisma/client';

import { db } from '@/lib/db';
import { getSession } from '@/lib/session';

export const manageRequest = async (
  status: STATUS,
  feedback: string,
  archived: boolean,
  targetUserId: string,
  requestId: string
) => {
  try {
    const session = await getSession();
    if (!session) return redirect('/auth');
    if (session.user.id !== targetUserId) return { error: 'Forbidden Access!' };
    const oldRequest = await db.request.findUnique({ where: { id: requestId } });

    const request = await db.request.update({
      where: { targetUserId: session.user.id, id: requestId },
      data: { status, feedback, archived },
    });
    await db.users.update({ where: { id: session.user.id }, data: { last_action: new Date() } });

    if (oldRequest?.status !== status) {
      await db.notification.create({
        data: {
          userId: request.requestUserId,
          requestId: request.id,
          type: 'CHANGE_STATUS',
          message: 'changed to',
        },
      });
    }
    return { success: 'Your request has been updated.' };
  } catch (error) {
    console.log(error);
    console.log('manageRequest ISSUE');
    return { error: 'Internal server error!' };
  }
};
