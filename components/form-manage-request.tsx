'use client';
import { useState, useTransition } from 'react';
import { STATUS } from '@prisma/client';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from './ui/textarea';
import { FormError } from './form-error';
import { FormSuccess } from './form-success';
import { manageRequest } from '@/actions/request/manage-request';
import { RequestData } from '@/types/request';

type FormManageRequestProps = {
  children: React.ReactNode;
  request: RequestData;
};

export default function FormManageRequest({ children, request }: FormManageRequestProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(request.status);
  const [feedback, setFeedback] = useState<string>(request.feedback || '');
  const [archived, setArchived] = useState<boolean>(false);

  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const onSubmit = () => {
    startTransition(() => {
      manageRequest(status as STATUS, feedback, archived, request.targetUserId, request.id)
        .then((data) => {
          setError(data.error);
          setSuccess(data.success);
          if (data.success) {
            setOpen(false);
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
          <DialogTitle>Manage Request</DialogTitle>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='status' className='text-right'>
              Status
            </Label>
            <Select defaultValue={status} onValueChange={setStatus} disabled={isPending}>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='PENDING'>Pending</SelectItem>
                <SelectItem value='REJECTED'>Rejected</SelectItem>
                <SelectItem value='ACCEPTED'>Accepted</SelectItem>
                <SelectItem value='MODDED'>Modded</SelectItem>
                {request.user.Settings[0].modder_type === 'Beatmap Nominator' && (
                  <>
                    <SelectItem value='NOMINATED'>Nominated</SelectItem>
                    <SelectItem value='RANKED'>Ranked</SelectItem>
                  </>
                )}
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='feedback' className='text-right'>
              Feedback
            </Label>
            <Textarea
              id='feedback'
              className='col-span-3 max-h-[270px]'
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              disabled={isPending}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='archived' className='text-right'>
              Archived
            </Label>
            <Switch
              id='archived'
              className='col-span-3'
              checked={archived}
              onCheckedChange={setArchived}
              disabled={isPending}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
        </div>
        <DialogFooter>
          <Button type='submit' onClick={onSubmit}>
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
