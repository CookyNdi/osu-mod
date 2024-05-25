import Profile from './profile';

export default function Navbar() {
  return (
    <div className='w-full h-[60px] bg-background/20 backdrop-blur-sm flex justify-between items-center p-2 px-4 lg:px-8 fixed border-b border-primary/50'>
      <h1>Osu Modding</h1>
      <div className='flex items-center gap-x-4 lg:gap-x-6'>
        <p className='cursor-pointer'>My Request</p>
        <Profile />
      </div>
    </div>
  );
}
