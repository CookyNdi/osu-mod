'use client';
import { useState, useTransition } from 'react';
import { Rules } from '@prisma/client';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { FaCircleCheck } from 'react-icons/fa6';
import { IoMdCloseCircle, IoMdClose } from 'react-icons/io';
import { deleteRules } from '@/actions/rules/delete';
import LoadingAnimation from './animations/loading-animation';

type ListRulesProps = {
  rules: Rules;
  isEditable?: boolean;
};

export default function ListRules({ rules, isEditable }: ListRulesProps) {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onClick = () => {
    startTransition(() => {
      deleteRules(rules.id)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            router.refresh();
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };
  return (
    <div className='w-full flex items-center justify-between my-2 group cursor-pointer hover:bg-muted rounded-md'>
      <div className='flex gap-x-2 items-center'>
        {rules.isAccepted ? (
          <div className=' p-2 rounded-lg'>
            <FaCircleCheck className='text-emerald-600' />
          </div>
        ) : (
          <div className='p-2 rounded-lg'>
            <IoMdCloseCircle className='text-destructive ' size={20} />
          </div>
        )}
        <p>{rules.message}</p>
      </div>
      {isEditable && (
        <Button
          className='hidden group-hover:flex items-center gap-x-2'
          onClick={onClick}
          size='sm'
          variant='destructive'
          disabled={isPending}
        >
          {isPending && <LoadingAnimation isLoading={isPending} />}
          <IoMdClose />
        </Button>
      )}
    </div>
  );
}
