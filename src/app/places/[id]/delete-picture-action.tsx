'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { deletePlacePicture } from '@/actions/place/delete';

export default function DeletePictureAction({ id }: { id: string }): ReactNode {
  const pathname = usePathname();
  return (
    <Link href="#" onClick={() => deletePlacePicture(id, pathname)}>delete pic</Link>
  );
}