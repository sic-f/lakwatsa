'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

export default function DeletePictureAction({
  id,
  pathname,
  onDelete,
  classNames,
}: {
  id: string;
  pathname: string;
  onDelete: Function;
  classNames?: string;
}): ReactNode {
  return (
    <Link
      href="#"
      onClick={() => onDelete(id, pathname)}
      className={classNames}
    >
      delete pic
    </Link>
  );
}
