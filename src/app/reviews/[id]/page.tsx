import { ReactNode, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Content from '@/app/places/[id]/(reviews)/content';
import { Review } from '@/interfaces/review';
import { NIL as NIL_UUID } from 'uuid';

type Props = {
  id: string;
  modalRef: any;
};

export default function ReviewModal({ id, modalRef }: Props): ReactNode {
  const [review, setReview] = useState<Review>({});

  useEffect(() => {
    let ignore: boolean = false;

    async function fetchReview(): Promise<void> {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${id}`,
      );

      if (!response.ok)
        throw new Error(`${response.status} ${response.statusText}`);

      if (!ignore) {
        const review: Review = await response.json();

        setReview(review);
      }
    }

    fetchReview();

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <dialog
      id="my_modal_5"
      className="modal modal-bottom sm:modal-middle"
      ref={modalRef}
    >
      <div className="modal-box text-justify">
        <Content review={review} broId={NIL_UUID} />
        <div className="flex justify-end gap-2">
          <div className="modal-action">
            <Link
              href={`/places/${review.placeId}`}
              className="btn text-accent"
            >
              Go to place
            </Link>
          </div>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </div>
    </dialog>
  );
}
