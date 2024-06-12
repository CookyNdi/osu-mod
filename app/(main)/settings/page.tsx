import { Metadata } from 'next';

import SettingsTabs from './_components/tabs';

export const metadata: Metadata = {
  title: 'Modmap | Settings',
};

export default function SettingsPage() {
  return (
    <div className='w-full flex justify-center items-center pt-4'>
      <SettingsTabs />
    </div>
  );
}
