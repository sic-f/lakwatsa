'use client';

import { ReactNode, useRef, useState } from 'react';
import Link from 'next/link';
import DeleteConfirmation from './delete-confirmation';

export default function DeletePictureAction({
  id,
  pathname,
  onDelete,
  classNames,
}: {
  id: string;
  pathname: string;
  onDelete: (id: string, pathname: string) => Promise<void>;
  classNames?: string;
}): ReactNode {
  const modalRef = useRef<HTMLAnchorElement>(null);

  function handleShowModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <Link href="#" onClick={handleShowModal} className={classNames}>
        delete pic
      </Link>
      <DeleteConfirmation
        id={id}
        pathname={pathname}
        modalRef={modalRef}
        onDelete={onDelete}
      />
    </>
  );
}
