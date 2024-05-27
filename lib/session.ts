import { options } from '@/auth.option';
import { getServerSession } from 'next-auth';

export const getSession = async () => {
  const session = await getServerSession(options);
  console.log(session);
  return session;
};
