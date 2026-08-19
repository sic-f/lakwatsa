import { ReactNode, useRef } from 'react';
import ReviewModal from '@/app/reviews/[id]/page';

type Props = {
  saveableId: string;
};

export default function ReviewAction({ saveableId }: Props): ReactNode {
  const modalRef = useRef<HTMLAnchorElement>(null);

  function handleShowModal() {
    modalRef.current?.showModal();
  }

  return (
    <>
      <button className="btn btn-primary" onClick={handleShowModal}>
        View ➡️
      </button>
      <ReviewModal id={saveableId} modalRef={modalRef} />
    </>
  );
}
