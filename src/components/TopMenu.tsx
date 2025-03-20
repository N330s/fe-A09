import Image from 'next/image';
import TopMenuItem from './TopMenuItem';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Link from 'next/link';

export default async function TopMenu () {
  const session = await getServerSession(authOptions)


  return (
    <div className="h-[100px] bg-white text-white fixed top-0 left-0 right-0 z-50 border-t-[1px] border-gray-600 border-b-[1px] border-gray-600 flex flex-row-reverse">
        <Image src="/img/logo.png" alt="logo" width = {0} height = {0} sizes = '100vh' className = 'h-full w-auto'/>
        <TopMenuItem title = 'Booking' pageRef = '/booking' />

        {
          session ? <Link href = '/api/auth/signout'> <div className = 'flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>
            Sign-Out</div></Link>
          : <Link href = '/api/auth/signin'> <div className = 'flex items-center absolute left-0 h-full px-2 text-cyan-600 text-sm'>
            Sign-In</div></Link>
        }
    </div>
  );
};
