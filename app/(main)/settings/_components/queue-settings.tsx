'use client';
import { useState, useTransition } from 'react';
import { Settings } from '@prisma/client';
import { IoMdClose } from 'react-icons/io';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { updateUserSettings } from '@/actions/user/update-settings';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';

type QueueSettingsProps = {
  settings: Settings | null;
  userId: string;
};

export default function QueueSettings({ settings, userId }: QueueSettingsProps) {
  const [modes, setMode] = useState<string[]>(settings?.modes || []);
  const [open, setOpen] = useState<boolean>(settings?.open || false);
  const [queueLimit, setQueueLimit] = useState<number>(settings?.queue_limit || 10);
  const [requestCooldown, setRequestCooldown] = useState<number>(settings?.request_cooldown || 1);
  const [modderType, setModderType] = useState<string>(settings?.modder_type || 'modder');

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const deleteMode = (index: number) => {
    const newArray = [...modes.slice(0, index), ...modes.slice(index + 1)];
    setMode(newArray);
  };

  const onSubmit = () => {
    console.log({ data: { modes, open, queueLimit, requestCooldown, modderType } });
    startTransition(() => {
      updateUserSettings({ data: { modes, open, queueLimit, requestCooldown, modderType } }, userId)
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
        <CardDescription>Make changes to your queue modding here. Click save when youre done.</CardDescription>
      </CardHeader>
      <CardContent className='space-y-2'>
        <div className='flex items-center gap-x-4 mb-2'>
          <Label htmlFor='queue_status'>Queue Open</Label>
          <Switch id='queue_status' checked={open} onCheckedChange={setOpen} disabled={isPending} />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='modes'>modes</Label>
          <Select
            onValueChange={(value) => {
              if (!modes.includes(value)) {
                setMode([...modes, value]);
              }
            }}
            disabled={isPending}
          >
            <SelectTrigger id='modes' className='w-full'>
              <SelectValue placeholder='modes' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='standard'>Standard</SelectItem>
              <SelectItem value='mania'>Mania</SelectItem>
              <SelectItem value='taiko'>Taiko</SelectItem>
              <SelectItem value='catch'>Catch</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {modes.length > 0 && (
          <div className='flex gap-2'>
            {modes.map((item, index) => (
              <Button variant='outline' className='relative group' key={item} onClick={() => deleteMode(index)}>
                {item}
                <IoMdClose
                  className='absolute hidden group-hover:block z-10 top-[50%] -right-[10px] translate-y-[-50%] animate-in slide-in-from-top-2 spin-in-90 hover:text-red-500'
                  size={20}
                />
              </Button>
            ))}
          </div>
        )}
        <div className='space-y-1'>
          <Label htmlFor='queue_limit_request'>
            Queue Request Limit <span className='text-muted-foreground'>(auto closed)</span>
          </Label>
          <Input
            id='queue_limit_request'
            type='text'
            disabled={isPending}
            defaultValue={queueLimit}
            onChange={(e) => setQueueLimit(Number(e.target.value))}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='user_limit_request'>
            User Limit Request <span className='text-muted-foreground'>(Days)</span>
          </Label>
          <Input
            id='user_limit_request'
            type='text'
            disabled={isPending}
            defaultValue={requestCooldown}
            onChange={(e) => setRequestCooldown(Number(e.target.value))}
          />
        </div>
        <div className='space-y-1'>
          <Label htmlFor='modder_type'>Modder Type</Label>
          <Select defaultValue={modderType} onValueChange={setModderType} disabled={isPending}>
            <SelectTrigger id='modder_type' className='w-full'>
              <SelectValue placeholder='Modder Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='modder'>Modder</SelectItem>
              <SelectItem value='probationary_bn'>Probationary BN</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
      </CardContent>
      <CardFooter>
        <Button className='w-full' onClick={onSubmit} disabled={isPending}>
          Save changes
        </Button>
      </CardFooter>
    </Card>
  );
}
