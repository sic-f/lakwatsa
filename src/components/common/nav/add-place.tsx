import { ReactNode } from 'react';
import { isEmptySession } from '@/services/session';
import { faBuilding } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default async function AddPlace(): Promise<ReactNode | undefined> {
  if (await isEmptySession()) return;

  return (
    <Link href="/places/submit" className="flex mr-3">
      <FontAwesomeIcon icon={faBuilding} className="mr-1.5 size-[1.2em]" />
      Add Place
    </Link >
  );
}
