import { ReactNode } from 'react';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  setIsWritingReview: Function;
};

export default function AddReviewAction({
  setIsWritingReview,
}: Props): ReactNode {
  function handleClick(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ): void {
    e.preventDefault();

    setIsWritingReview(true);
  }

  return (
    <div className="flex justify-end">
      <button className="mr-2 mb-2 flex items-center" onClick={handleClick}>
        <FontAwesomeIcon icon={faPlus} className="mr-1 inline size-[1.2em]" />
        Add review
      </button>
    </div>
  );
}
