'use client';

import { ReactNode, useRef } from 'react';
import { Expand, Less } from '@/components/common/truncate-client';
import BookmarkAction from '@/components/bookmark/bookmark-action';
import { Review } from '@/interfaces/review';
import { isBookmarkable } from '@/services/utilities/misc';
import {
  ShowMore,
  ShowMoreRef,
  ShowMoreToggleLinesFn,
} from '@re-dev/react-truncate';

type Props = {
  review: Review;
  broId: string;
};

export default function Content({ review, broId }: Props): ReactNode {
  const ref = useRef<ShowMoreRef>(null);

  function toggleLines(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): ShowMoreToggleLinesFn {
    ref.current?.toggleLines(e);
  }

  const isReviewBookmarkable = isBookmarkable(broId, review.reviewerId);

  return (
    <div className="aura aura-silver">
      <div className="card bg-base-100">
        <div className="card-body">
          <div className="flex justify-between">
            <h3 className="text-lg">{review.headline}</h3>
            {isReviewBookmarkable && (
              <BookmarkAction
                saveableId={review.id}
                caption="Save review📝"
                saveableName="Place"
                bookmarkId={review.bookmarkId}
              />
            )}
          </div>
          <ShowMore
            ref={ref}
            lines={10}
            more={<Expand onClick={toggleLines} />}
            less={<Less onClick={toggleLines} />}
            className="text-accent whitespace-pre-wrap"
          >
            <p className="text-info cursor-default whitespace-pre-wrap">
              {review.content}
            </p>
          </ShowMore>
        </div>
      </div>
    </div>
  );
}
