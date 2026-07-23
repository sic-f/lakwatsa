import { ReactNode } from 'react';
import Link from 'next/link';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  setIsWritingReview: Function;
  hasSession: boolean;
};

export default function AddReviewAction({
  setIsWritingReview,
  hasSession,
}: Props): ReactNode {
  function handleClick(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): void {
    e.preventDefault();

    setIsWritingReview(true);
  }

  function renderSignInLink(): ReactNode {
    return (
      <Link className="mr-2 mb-2 text-sm underline" href="/login">
        Sign in to leave a review
      </Link>
    );
  }

  function renderAddReviewAction(): ReactNode {
    return (
      <Link
        href="#"
        className="mr-2 mb-2 flex items-center"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faPlus} className="mr-1 inline size-[1.2em]" />
        Add review
      </Link>
    );
  }

  return (
    <div className="flex justify-end">
      {hasSession ? renderAddReviewAction() : renderSignInLink()}
    </div>
  );
}
