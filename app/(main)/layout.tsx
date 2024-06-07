import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import '../globals.css';
import { Toaster } from '@/components/ui/toaster';

import Navbar from '@/components/layout/navbar';
import PreviewPlayer from '@/components/preview-player';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Osu Mod | Home',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Navbar />
        <Toaster />
        <PreviewPlayer />
        <main className='pt-[60px] px-4 lg:px-8 min-h-[100dvh]'>{children}</main>
      </body>
    </html>
  );
}
