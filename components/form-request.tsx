'use client';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from './ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from './ui/input';
import { formRequest } from '@/schemas';

type FormRequestProps = {
  children: React.ReactNode;
};

export default function FormRequest({ children }: FormRequestProps) {
  const form = useForm<z.infer<typeof formRequest>>({
    resolver: zodResolver(formRequest),
    defaultValues: {
      map_link: '',
      mapper_comment: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formRequest>) => {
    console.log(values);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className='sm:max-w-[525px]'>
        <DialogHeader>
          <DialogTitle>Request To SayuMana</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className='grid gap-4 py-4'>
              <FormField
                control={form.control}
                name='map_link'
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
              <Button type='submit'>Request</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
