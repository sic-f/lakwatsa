import { ReactNode } from 'react';
import Image from 'next/image';
import { BlankAvatar } from '@/constants/blank-avatar';
import { Comment } from '@/interfaces/comment';
import { isEmpty } from 'lodash';

type Props = {
  comment: Comment;
};

export default function CommentCard({ comment }: Props): ReactNode {
  function getAvatar(avatar: string | null): string {
    if (avatar === null) {
      return BlankAvatar.Default;
    } else {
      return avatar;
    }
  }

  return (
    <article>
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <div className="flex items-start gap-2">
            <div className="avatar">
              <div className="mask mask-heart w-10">
                <Image
                  src={getAvatar(comment.commenterAvatar)}
                  width={50}
                  height={0}
                  alt="Commenter avatar"
                />
              </div>
            </div>
            <div className="w-full">
              <h2 className="card-title">{comment.commenterName}</h2>
              <p>{comment.body}</p>
            </div>
          </div>
          <div className="card-actions justify-end">
            <button className="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
    </article>
  );
}
