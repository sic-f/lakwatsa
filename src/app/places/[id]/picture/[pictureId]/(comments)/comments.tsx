'use client';

import { ReactNode, useEffect, useState } from 'react';
import CommentCard from './comment-card';
import { fetchMore } from '@/actions/bookmark/fetch-more';
import { Comment } from '@/interfaces/comment';
import {
  isRefreshTokenExpired,
  refreshToken,
} from '@/services/session/refresh-token';
import { isEmpty } from 'lodash';
import { useInView } from 'react-intersection-observer';
import dayjs from 'dayjs';

type Props = {
  pictureId: string;
};

const NUMBER_OF_COMMENTS_TO_FETCH = 5;

export default function Comments({ pictureId }: Props): ReactNode {
  const [comments, setComments] = useState<Comment[]>([]);
  const [offset, setOffset] = useState<Date>();
  const [fetchedAllComments, setFetchedAllComments] = useState<boolean>(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchedAllComments) return;
    let ignore: boolean = false;

    async function fetchComments(): Promise<void> {
      if (isEmpty(comments)) {
        const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/place-pictures/${pictureId}/comments?offset=${new Date().toISOString()}&limit=${NUMBER_OF_COMMENTS_TO_FETCH}`;

        let response: Response = await fetch(url);

        if (await isRefreshTokenExpired(response.status)) {
          await refreshToken();

          await fetch(url);
        }

        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);

        if (!ignore) {
          const initialComments: Comment[] = await response.json();
          if (isEmpty(initialComments)) return;
          setComments(initialComments);
          setOffset(initialComments.at(-1)!.createdAt);
        }
      }

      if (inView) {
        const moreComments: Comment[] = await fetchMore({
          offset: dayjs(offset).toISOString(),
          limit: NUMBER_OF_COMMENTS_TO_FETCH,
          routePath: `place-pictures/${pictureId}/comments`,
        });

        if (isEmpty(moreComments)) {
          setFetchedAllComments(true);
          return;
        }

        if (!ignore) {
          setComments((comments) => [...comments, ...moreComments]);
          setOffset(moreComments.at(-1)?.createdAt);
        }
      }
    }

    fetchComments();

    return () => {
      ignore = true;
    };
  }, [inView]);

  return (
    <section className="flex flex-col gap-4">
      {comments.map((comment: Comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
      {!isEmpty(comments) && <div ref={ref}></div>}
    </section>
  );
}
