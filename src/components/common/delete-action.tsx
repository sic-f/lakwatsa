'use client';

import { ReactNode, useRef } from 'react';
import DeleteConfirmation from '@/components/common/delete-confirmation';

type Props = {
  id: string;
  pathname: string;
  deleteActionLabel: string;
  headline: string;
  prompt: string;
  onDelete: (
    id: string,
    pathname: string,
    modalRef: HTMLDialogElement,
  ) => Promise<void>;
  classNames?: string;
};

export default function DeleteAction({
  id,
  pathname,
  deleteActionLabel,
  headline,
  prompt,
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
        {deleteActionLabel}
      </button>
      <DeleteConfirmation
        id={id}
        pathname={pathname}
        modalRef={modalRef}
        onDelete={onDelete}
        headline={headline}
        prompt={prompt}
      />
    </>
  );
}
