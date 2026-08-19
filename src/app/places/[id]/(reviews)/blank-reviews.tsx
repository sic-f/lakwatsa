'use client';

import { ReactNode, useState } from 'react';
import WriteReview from './write-review';

export default function BlankReviews({
  placeId,
  isWritingReview,
  setIsWritingReview,
}: {
  placeId: string;
  isWritingReview: boolean;
  setIsWritingReview: Function;
}): ReactNode {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    setIsWritingReview(true);
  }

  return (
    <div className="flex flex-col items-center">
      {isWritingReview ? (
        <WriteReview
          placeId={placeId}
          setIsWritingReview={setIsWritingReview}
        />
      ) : (
        <h3 className="my-6 text-3xl">No reviews</h3>
      )}
    </div>
  );
}
