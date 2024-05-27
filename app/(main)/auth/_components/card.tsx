'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function AuthCard() {
  const route = useRouter();
  const onClick = () => {
    signIn('osu', {
      callbackUrl: '/',
    });
  };
  return (
    <Card className='w-[315px]'>
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={onClick} className='w-full'>
          Login
        </Button>
      </CardContent>
    </Card>
  );
}
