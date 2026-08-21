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

export default async function Index({
  avatar,
  pictureId,
  placeId,
}: Props): Promise<ReactNode> {
  return (
    <section className="mt-8 flex flex-col items-center gap-8">
      {(await hasSession()) && (
        <CommentForm avatar={avatar} pictureId={pictureId} placeId={placeId} />
      )}
      <Comments pictureId={pictureId} />
    </section>
  );
}
