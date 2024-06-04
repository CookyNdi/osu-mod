'use client';

import { Rules } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { createRules } from '@/actions/rules/create';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useToast } from '@/components/ui/use-toast';

type RequestInformationProps = {
  rules: Rules | null;
};

export default function RequestInformation({ rules }: RequestInformationProps) {
  const [note, setNote] = useState<string>(!rules ? '' : rules.message);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { toast } = useToast();

  const onSubmit = () => {
    startTransition(() => {
      createRules(note, 'REQUEST_INFORMATION', true)
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
            setIsVisible(false);
            router.refresh();
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
    <div className='w-full flex flex-col gap-y-4'>
      <h1 className='text-lg font-semibold'>Reuqest Information</h1>
      <Textarea
        onChange={(e) => {
          setIsVisible(true);
          setNote(e.target.value);
        }}
        value={note}
        disabled={isPending}
      />
      <Button className={cn('hidden', isVisible && 'flex')} onClick={onSubmit} disabled={isPending}>
        Save
      </Button>
    </div>
  );
}
