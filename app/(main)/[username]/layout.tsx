import UserLayoutHeader from './_components/header';
import UserLayoutNavbar from './_components/navbar';

type UserLayoutProps = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

export default function UserLayout({ children, params }: Readonly<UserLayoutProps>) {
  const username = params.username || '';

  return (
    <div className='w-full flex flex-col gap-y-2'>
      <div>
        <UserLayoutHeader />
        <UserLayoutNavbar username={username} />
      </div>
      <div>{children}</div>
    </div>
  );
}
