'use client';

import { ReactNode, useRef } from 'react';
import Link from 'next/link';
import DeleteConfirmation from '../delete-confirmation';

type Props = {
  id: string;
  pathname: string;
  onDelete: (id: string, pathname: string) => Promise<void>;
  classNames?: string;
};

export default function DeletePictureAction({
  id,
  pathname,
  onDelete,
  classNames,
}: Props): ReactNode {
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
        headline="Delete Place Picture"
        prompt="Are you sure you want to delete this picture?"
      />
    </>
  );
}
