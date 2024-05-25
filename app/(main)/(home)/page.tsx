import HomeContents from './_components/content';
import HomeContentFilters from './_components/filters';

export default function Home() {
  return (
    <div className='w-full flex flex-col gap-y-4 pt-4'>
      <HomeContentFilters />
      <HomeContents />
    </div>
  );
}
