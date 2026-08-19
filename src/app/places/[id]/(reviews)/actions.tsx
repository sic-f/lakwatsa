import { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import DeleteAction from '@/components/common/delete-action';
import { deleteReview } from '@/actions/review/delete';
import classnames from 'classnames';

type Props = {
  reviewId: string;
  isNotAllowedToEdit: boolean;
  isEditing: boolean;
  setIsEditing: Function;
  isDeletable: boolean;
  classNames: string;
};

export default function Actions({
  reviewId,
  isNotAllowedToEdit,
  isEditing,
  setIsEditing,
  isDeletable,
  classNames,
}: Props): ReactNode {
  if (isNotAllowedToEdit) return;
  const params = useParams<{ id: string }>();
  const text = isEditing ? 'Cancel' : 'Edit review';
  const className: string = classnames(
    'card-actions',
    'justify-end',
    classNames,
  );

  function handleClick(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    setIsEditing(!isEditing);
  }

  async function handleDelete(
    id: string,
    pathname: string,
    modalRef: HTMLDialogElement,
  ): Promise<void> {
    await deleteReview(id, pathname, modalRef);
    modalRef.current?.close();
  }

  return (
    <div className={className}>
      {isDeletable && !isEditing && (
        <DeleteAction
          id={reviewId}
          pathname={`/places/${params.id}`}
          deleteActionLabel={'Delete review'}
          headline={'Delete review'}
          prompt={'Are you sure you want to delete this review?'}
          onDelete={handleDelete}
          classNames="btn btn-error"
        />
      )}
      <button className="btn btn-secondary" onClick={handleClick} type="button">
        {text}
      </button>
      {isEditing && (
        <button
          className="btn btn-accent ml-2"
          form="updateReview"
          type="submit"
          value="Post"
        >
          Submit
        </button>
      )}
    </div>
  );
}
