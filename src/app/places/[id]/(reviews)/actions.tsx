import { ReactNode } from 'react';
import classnames from 'classnames';

type Props = {
  isNotAllowedToEdit: boolean;
  isEditing: boolean;
  setIsEditing: Function;
  classNames: string;
};

export default function Actions({
  isNotAllowedToEdit,
  isEditing,
  setIsEditing,
  classNames,
}: Props): ReactNode {
  if (isNotAllowedToEdit) return;

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

  return (
    <div className={className}>
      <div>
        <button
          className="btn btn-secondary justify-end"
          onClick={handleClick}
          type="button"
        >
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
    </div>
  );
}
