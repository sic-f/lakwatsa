import { ReactNode } from 'react';
import CommentCard from './comment-card';
import { Comment } from '@/interfaces/comment';

type Props = {
  comments: Comment[];
};

export default function Comments({ comments }: Props): ReactNode {
  return (
    <section className="flex flex-col gap-4">
      {comments.map((comment: Comment) => (
        <CommentCard comment={comment} key={comment.id} />
      ))}
    </section>
  );
}
