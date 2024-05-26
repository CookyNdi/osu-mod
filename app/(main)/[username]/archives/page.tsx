import Footer from '@/components/layout/footer';
import ModdingCard from '@/components/modding-card';

export default function ArchivesPage() {
  return (
    <div className='flex flex-col gap-y-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-xl font-semibold'>Archives</h1>
        <p className='text-muted-foreground text-sm'>Total : 2</p>
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
