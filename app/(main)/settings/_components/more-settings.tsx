'use client';
import { useState, useTransition } from 'react';

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { updateUserData } from '@/actions/user/update';
import { useToast } from '@/components/ui/use-toast';
import LoadingAnimation from '@/components/animations/loading-animation';

type MoreSettingsProps = {
  userId: string;
};

export default function MoreSettings({ userId }: MoreSettingsProps) {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const onCLick = () => {
    startTransition(() => {
      updateUserData(userId)
        .then((data) => {
          if (data.error) {
            toast({
              title: data.error,
            });
          }
          if (data.success) {
            toast({
              title: data.success,
            });
          }
        })
        .catch(() => {
          toast({
            title: 'Something went wrong',
          });
        });
    });
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Update Account data</CardTitle>
        <CardDescription>
          This will be update your account data like profile image, username and modder type, etc.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className='w-full flex items-center gap-x-2' onClick={onCLick} disabled={isPending}>
          {isPending && <LoadingAnimation isLoading={isPending} />}
          Update Your Account Data
        </Button>
      </CardFooter>
    </Card>
  );
}
