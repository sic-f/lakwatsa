'use client';

import { ReactNode, useRef } from 'react';
import { deletePlace } from '@/actions/place/delete';
import DeleteConfirmation from '@/components/common/delete-confirmation';

type Props = {
  id: string;
  pathname: string;
  onDelete: (id: string, pathname: string) => Promise<void>;
  classNames?: string;
};

export default function DeletePlaceAction({
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
      <button className="btn btn-error" onClick={handleShowModal}>
        Delete
      </button>
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
