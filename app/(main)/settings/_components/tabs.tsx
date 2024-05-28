import { redirect } from 'next/navigation';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { getUserSettings } from '@/actions/user/get-settings';
import { getSession } from '@/lib/session';
import QueueSettings from './queue-settings';
import MoreSettings from './more-settings';

export default async function SettingsTabs() {
  const session = await getSession();
  if (!session) {
    redirect('/auth');
  }
  const settings = await getUserSettings(session?.user.id);
  return (
    <Tabs defaultValue='queue_setting' className='w-[400px]'>
      <TabsList className='grid w-full grid-cols-2'>
        <TabsTrigger value='queue_setting'>Queue Settings</TabsTrigger>
        <TabsTrigger value='more'>More</TabsTrigger>
      </TabsList>
      <TabsContent value='queue_setting'>
        <QueueSettings settings={settings.data} userId={session.user.id} />
      </TabsContent>
      <TabsContent value='more'>
        <MoreSettings userId={session.user.id} />
      </TabsContent>
    </Tabs>
  );
}
