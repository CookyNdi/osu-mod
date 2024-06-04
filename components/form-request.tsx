'use client';
import { useState, useTransition } from 'react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from './ui/input';
import { formRequest } from '@/schemas';
import { createRequest } from '@/actions/request/create';
import { useToast } from './ui/use-toast';

type FormRequestProps = {
  children: React.ReactNode;
  targetUserId: string;
  username: string;
};

export default function FormRequest({ children, targetUserId, username }: FormRequestProps) {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState<boolean>(false);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formRequest>>({
    resolver: zodResolver(formRequest),
    defaultValues: {
      map_link: '',
      mapper_comment: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formRequest>) => {
    console.log(values);
    startTransition(() => {
      createRequest(targetUserId, values)
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
            setOpen(false);
            form.reset();
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Request To {username}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='map_link'
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-x-4'>
                    <FormLabel className='text-right'>Map Link</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='https://osu.ppy.sh/beatmapsets/2139338' className='col-span-3' />
                    </FormControl>
                    <FormMessage className='col-end-3' />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='mapper_comment'
                disabled={isPending}
                render={({ field }) => (
                  <FormItem className='grid grid-cols-4 items-center gap-4'>
                    <FormLabel className='text-right'>Comments</FormLabel>
                    <FormControl>
                      <Textarea {...field} className='max-h-[290px] col-span-3' />
                    </FormControl>
                    <FormMessage className='col-end-3' />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type='submit' disabled={isPending}>
                Request
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
