import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Switch } from '@/components/ui/switch';
import { Textarea } from './ui/textarea';

type FormManageRequestProps = {
  children: React.ReactNode;
};

export default function FormManageRequest({ children }: FormManageRequestProps) {
  return (
    <Dialog>
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
            <Select>
              <SelectTrigger className='col-span-3'>
                <SelectValue placeholder='Status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='pending'>Pending</SelectItem>
                <SelectItem value='rejected'>Rejected</SelectItem>
                <SelectItem value='accepted'>Accepted</SelectItem>
                <SelectItem value='finished'>Finished</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='feedback' className='text-right'>
              Feedback
            </Label>
            <Textarea id='feedback' className='col-span-3 max-h-[270px]' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Archived
            </Label>
            <Switch className='col-span-3' />
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
