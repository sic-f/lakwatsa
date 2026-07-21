'use client';

import { ReactNode, useState } from 'react';
import WriteReview from './write-review';

export default function BlankReviews({
  placeId,
  isWritingReview,
  setIsWritingReview,
}: {
  placeId: string;
  isWritingReview: Function;
  setIsWritingReview: Function;
}): ReactNode {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    setIsWritingReview(true);
  }

  function renderBlankReviews(): ReactNode {
    return (
      <>
        <h3 className="mb-4 text-3xl">No reviews</h3>
        <button className="btn btn-primary" onClick={handleClick}>
          Add review
        </button>
      </>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {isWritingReview ? (
        <WriteReview
          placeId={placeId}
          setIsWritingReview={setIsWritingReview}
        />
      ) : (
        renderBlankReviews()
      )}
    </div>
  );
}
