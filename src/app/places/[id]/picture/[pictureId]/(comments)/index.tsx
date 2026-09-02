import { ReactNode } from 'react';
import CommentForm from './comment-form';
import Comments from './comments';
import { Comment } from '@/interfaces/comment';
import { hasSession } from '@/services/session';

type Props = {
  avatar: string;
  pictureId: string;
  placeId: string;
};

const NUMBER_OF_COMMENTS_TO_FETCH = 5;

export default async function Index({
  avatar,
  pictureId,
  placeId,
}: Props): Promise<ReactNode> {
  const response: Response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/place-pictures/${pictureId}/comments?offset=${new Date().toISOString()}&limit=${NUMBER_OF_COMMENTS_TO_FETCH}`,
  );
  const comments: Comment[] = await response.json();

  return (
    <section className="mt-8 flex flex-col items-center gap-8">
      {(await hasSession()) && (
        <CommentForm avatar={avatar} pictureId={pictureId} placeId={placeId} />
      )}
      <Comments comments={comments} pictureId={pictureId} />
    </section>
  );
}
