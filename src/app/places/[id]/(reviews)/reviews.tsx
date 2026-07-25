'use client';

import { ReactNode, useState } from 'react';
import AddReviewAction from './add-review-action';
import WriteReview from './write-review';
import BlankReviews from './blank-reviews';
import ReviewCard from './review-card';
import Pagination from './pagination';
import { fetchReviews } from '@/actions/review/fetch';
import { Review } from '@/interfaces/review';
import { hasSession } from '@/services/utilities/misc';
import { isEmpty } from 'lodash';
import classnames from 'classnames';

type Props = {
  reviews: Review[];
  placeId: string;
  broId: string;
  reviewsCount: number;
  arePicturesEmpty: boolean;
};

const NUMBER_OF_PLACES_TO_FETCH: number = 5;

export default function Reviews({
  reviews: initialReviews,
  placeId,
  broId,
  reviewsCount,
  arePicturesEmpty,
}: Props): ReactNode {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [isWritingReview, setIsWritingReview] = useState<boolean>(false);
  const reviewsClassName = classnames('w-96', 'lg:w-xl', {
    'my-10': !arePicturesEmpty,
    'mb-10': arePicturesEmpty,
  });
  const numberOfPages = Math.ceil(reviewsCount / NUMBER_OF_PLACES_TO_FETCH);

  async function handleClick(
    i: number,
    offset: number,
    limit: number,
  ): Promise<void> {
    const reviews: Review[] = await fetchReviews(offset * i, limit, placeId);

    setReviews(reviews);
  }

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
        <>
          {renderReviewsHome()}
          <Pagination pages={numberOfPages} onClick={handleClick} />
        </>
      )}
    </section>
  );
}
