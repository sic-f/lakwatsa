'use client';

import { ReactNode, useActionState } from 'react';
import Image from 'next/image';
import FieldError from '@/components/common/field-error';
import { CommentError } from '@/constants/field-errors';
import { write } from '@/actions/comment/write';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareArrowUpRight } from '@fortawesome/free-solid-svg-icons';

type Props = {
  avatar: string;
  pictureId: string;
  placeId: string;
};

export default function CommentForm({
  avatar,
  pictureId,
  placeId,
}: Props): ReactNode {
  const [form, action, pending] = useActionState(write, undefined);
  return (
    <form action={action}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        <legend className="fieldset-legend">Write a comment</legend>
        <div className="flex items-start">
          <div className="avatar">
            <div className="mask mask-squircle w-8">
              <Image src={avatar} width={30} height={30} alt={'Bro avatar'} />
            </div>
          </div>
          <div className="grow">
            <input
              type="text"
              name="body"
              className="input ml-2"
              placeholder="Write a public comment..."
            />
            <FieldError
              errors={form?.errors}
              field={CommentError.Body}
              className="mt-2 ml-2"
            />
          </div>
        </div>
        <div className="flex justify-end">
          <button type="submit">
            <FontAwesomeIcon
              icon={faSquareArrowUpRight}
              className="size-[1.2rem] cursor-pointer"
            />
          </button>
        </div>
      </fieldset>
      <input type="hidden" value={placeId} name="placeId" />
      <input type="hidden" value={pictureId} name="pictureId" />
    </form>
  );
}
