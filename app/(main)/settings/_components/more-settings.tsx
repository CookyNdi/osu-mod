'use client';
import { useState, useTransition } from 'react';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { updateUserData } from '@/actions/user/update';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

type MoreSettingsProps = {
  userId: string;
};

export default function MoreSettings({ userId }: MoreSettingsProps) {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onCLick = () => {
    startTransition(() => {
      updateUserData(userId)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
        })
        .catch(() => setError('Something went wrong'));
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
      <CardContent>
        <FormError message={error} />
        <FormSuccess message={success} />
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={onCLick} disabled={isPending}>
          Update Your Account Data
        </Button>
      </CardFooter>
    </Card>
  );
}
