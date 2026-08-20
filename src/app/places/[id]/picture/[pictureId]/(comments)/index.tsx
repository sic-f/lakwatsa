import { ReactNode } from 'react';
import CommentForm from './comment-form';
import Comments from './comments';
import { Comment } from '@/interfaces/comment';

type Props = {
  avatar: string;
  pictureId: string;
  placeId: string;
};

const INITIAL_NUMBER_OF_COMMENTS = 5;

export default async function Index({
  avatar,
  pictureId,
  placeId,
}: Props): Promise<ReactNode> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/place-pictures/${pictureId}/comments?offset=${new Date().toISOString()}&limit=${INITIAL_NUMBER_OF_COMMENTS}`,
  );

  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);

  const comments: Comment[] = await response.json();

  return (
    <section className="mt-8 flex flex-col items-center gap-8">
      <CommentForm avatar={avatar} pictureId={pictureId} placeId={placeId} />
      <Comments comments={comments} />
    </section>
  );
}
