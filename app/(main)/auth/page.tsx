import { Metadata } from 'next';

import AuthCard from './_components/card';

export const metadata: Metadata = {
  title: 'Modmap | Auth',
};

export default function AuthPage() {
  return (
    <div className='w-full h-[80dvh] flex justify-center items-center'>
      <AuthCard />
    </div>
  );
}
