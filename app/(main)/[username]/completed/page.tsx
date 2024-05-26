import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Footer from '@/components/layout/footer';
import ModdingCard from '@/components/modding-card';

export default function CompletedPage() {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Completed</h1>
        <p className='text-muted-foreground text-sm'>Total : 24</p>
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        <ModdingCard isEditable />
        <ModdingCard isEditable />
        <ModdingCard isEditable />
        <ModdingCard isEditable />
      </div>
      <Footer />
    </div>
  );
}
