import { ReactNode } from 'react';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  setIsWritingReview: Function;
};

export default function AddReviewAction({
  setIsWritingReview,
}: Props): ReactNode {
  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void {
    e.preventDefault();

    setIsWritingReview(true);
  }

  return (
    <div className="flex justify-end">
      <Link
        href="#"
        className="mr-2 mb-2 flex items-center"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1 inline size-[1.2em]" />
        Add review
      </Link>
    </div>
  );
}
