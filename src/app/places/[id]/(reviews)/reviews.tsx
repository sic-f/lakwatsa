'use client';

import { ReactNode, useState } from 'react';
import AddReviewAction from './add-review-action';
import WriteReview from './write-review';
import BlankReviews from './blank-reviews';
import ReviewCard from './review-card';
import { Review } from '@/interfaces/review';
import { hasSession } from '@/services/utilities/misc';
import { isEmpty } from 'lodash';
import classnames from 'classnames';

type Props = {
  reviews: Review[];
  placeId: string;
  broId: string;
  arePicturesEmpty: boolean;
};

export default function Reviews({
  reviews,
  placeId,
  broId,
  arePicturesEmpty,
}: Props): ReactNode {
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);
  const reviewsClassName = classnames({
    'my-10': !arePicturesEmpty,
    'mb-10': arePicturesEmpty,
  });

  function renderReviews(): ReactNode {
    return (
      <div>
        {reviews.map((review) => (
          <ReviewCard
            review={review}
            key={review.id}
            broId={broId}
            className="mb-10"
          />
        ))}
      </div>
    );
  }

  function renderReviewsHome(): ReactNode {
    return isEmpty(reviews) ? (
      <BlankReviews
        placeId={placeId}
        isWritingReview={isWritingReview}
        setIsWritingReview={setIsWritingReview}
      />
    ) : (
      renderReviews()
    );
  }

  return (
    <section className={reviewsClassName}>
      <AddReviewAction
        setIsWritingReview={setIsWritingReview}
        hasSession={hasSession(broId)}
      />
      {isWritingReview ? (
        <WriteReview
          placeId={placeId}
          setIsWritingReview={setIsWritingReview}
        />
      ) : (
        renderReviewsHome()
      )}
    </section>
  );
}
