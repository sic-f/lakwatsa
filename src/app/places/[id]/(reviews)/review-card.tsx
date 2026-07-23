'use client';

import { ReactNode, useState } from 'react';
import Content from './content';
import EditReview from './edit-review';
import Actions from './actions';
import { Review } from '@/interfaces/review';
import { isOwner } from '@/services/utilities/misc';

type Props = {
  review: Review;
  broId: string;
  className?: string;
};

export default function ReviewCard({
  review: initialReview,
  broId,
  className,
}: Props): ReactNode {
  const [review, setReview] = useState<Review>(initialReview);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const isDeletable: boolean = isOwner(broId, review.reviewerId);

  function isNotAllowedToEdit(): boolean {
    return broId !== review.reviewerId;
  }

  return (
    <article className={className}>
      {!isEditing ? (
        <Content review={review} broId={broId} />
      ) : (
        <EditReview
          review={review}
          setReview={setReview}
          setIsEditing={setIsEditing}
        />
      )}
      <Actions
        reviewId={review.id}
        isNotAllowedToEdit={isNotAllowedToEdit()}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        isDeletable={isDeletable}
        classNames="mt-2"
      />
    </article>
  );
}
