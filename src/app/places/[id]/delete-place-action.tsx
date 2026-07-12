'use client';

import { ReactNode, useRef } from 'react';
import DeleteConfirmation from '@/components/common/delete-confirmation';

type Props = {
  id: string;
  pathname: string;
  placeName: string;
  onDelete: (id: string, pathname: string) => Promise<void>;
  classNames?: string;
};

export default function DeletePlaceAction({
  id,
  pathname,
  placeName,
  onDelete,
  classNames,
}: Props): ReactNode {
  const modalRef = useRef<HTMLAnchorElement>(null);

  function handleShowModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className={classNames} onClick={handleShowModal}>
        Delete
      </button>
      <DeleteConfirmation
        id={id}
        pathname={pathname}
        modalRef={modalRef}
        onDelete={onDelete}
        headline="Delete Place"
        prompt={`Are you sure you want to delete place "${placeName}"?`}
      />
    </>
  );
}
