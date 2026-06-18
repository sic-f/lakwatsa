import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function BrandLogo(): ReactNode {
  return (
    <div className="flex-1">
      <Link href="/" className="ml-3 text-primary-content text-lg">
        <Image
          src="https://picsum.photos/48"
          width={48} height={48}
          alt="Brand logo"
          className="inline mr-2"
        />
        Gala
      </Link>
    </div>
  );
}