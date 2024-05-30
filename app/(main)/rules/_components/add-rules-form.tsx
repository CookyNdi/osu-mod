'use client';
import { RulesType } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { createRules } from '@/actions/rules/create';

type AddRulesFormProps = {
  rulesType: RulesType;
  children: React.ReactNode;
};

export default function AddRulesForm({ children, rulesType }: AddRulesFormProps) {
  const [note, setNote] = useState<string>('');
  const [isAccepted, setIsAccepted] = useState<boolean>(true);

  const [open, setOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const onSubmit = () => {
    startTransition(() => {
      createRules(note, rulesType, isAccepted)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            setOpen(false);
            setNote('');
            router.refresh();
          }
        })
        .catch(() => setError('Something went wrong'));
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Add Rules - {rulesType}</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='note' className='text-right'>
              Note
            </Label>
            <Input
              id='note'
              className='col-span-3'
              value={note}
              onChange={(e) => setNote(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='isAccepted' className='text-right'>
              Yes / No
            </Label>
            <Switch
              id='isAccepted'
              className='col-span-3'
              checked={isAccepted}
              onCheckedChange={setIsAccepted}
              disabled={isPending}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <DialogFooter>
          <Button type='submit' onClick={onSubmit} disabled={isPending}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
