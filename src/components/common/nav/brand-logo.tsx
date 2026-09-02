import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hamburger from './hamburger';
import { hasSession } from '@/services/session';

export default async function BrandLogo(): Promise<ReactNode> {
  return (
    <div className="flex flex-1 items-center">
      {(await hasSession()) && <Hamburger />}
      <Link href="/" className="text-primary-content ml-3 text-lg">
        <Image
          src="/images/gala.png"
          width={72}
          height={48}
          alt="Brand logo"
          className="mr-2 inline w-auto"
        />
      </Link>
    </div>
  );
}
