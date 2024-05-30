import Footer from '@/components/layout/footer';
import RulesContent from './_components/content';
import { getRulesByUserId } from '@/actions/rules/get-by-user-id';

export default async function RulesPage() {
  const rules = await getRulesByUserId();
  return (
    <div className='w-full flex flex-col items-center gap-y-4 pt-4'>
      <RulesContent rules={rules} />
      <Footer />
    </div>
  );
}
