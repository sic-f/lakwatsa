'use client';

import { ReactNode, useState } from 'react';
import AddReviewAction from './add-review-action';
import WriteReview from './write-review';
import BlankReviews from './blank-reviews';
import ReviewCard from './review-card';
import { Review } from '@/interfaces/review';
import { isEmpty } from 'lodash';

type Props = {
  reviews: Review[];
  placeId: string;
  broId: string;
};

export default function Reviews({ reviews, placeId, broId }: Props): ReactNode {
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);

  function renderReviews(): ReactNode {
    return (
      <div>
        {reviews.map((review) => (
          <ReviewCard
            review={review}
            key={review.id}
            broId={broId}
            className="mb-4"
          />
        ))}
      </div>
    );
  }

  return (
    <div>
      <AddReviewAction setIsWritingReview={setIsWritingReview} />
      {isWritingReview ? (
        <WriteReview
          placeId={placeId}
          setIsWritingReview={setIsWritingReview}
        />
      ) : isEmpty(reviews) ? (
        <BlankReviews
          placeId={placeId}
          isWritingReview={setIsWritingReview}
          setIsWritingReview={setIsWritingReview}
        />
      ) : (
        renderReviews()
      )}
    </div>
  );
}
