import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import Footer from '@/components/layout/footer';
import RulesContent from './_components/content';
import { getRulesByUserId } from '@/actions/rules/get-by-user-id';
import { getSession } from '@/lib/session';

export const metadata: Metadata = {
  title: 'Osu Mod | Rules',
};

export default async function RulesPage() {
  const session = await getSession();
  if (!session) return redirect('/auth');
  const rules = await getRulesByUserId(session);
  return (
    <div className='w-full flex flex-col items-center gap-y-4 pt-4'>
      <RulesContent rules={rules} />
      <Footer />
    </div>
  );
}
