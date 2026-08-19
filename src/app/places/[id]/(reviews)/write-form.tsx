import { ReactNode } from 'react';
import FieldError from '@/components/common/field-error';
import { Review } from '@/constants/field-errors';
import { ReviewForm } from '@/interfaces/review';

type Props = {
  form: ReviewForm;
  action: (payload: FormData) => void;
  setIsWritingReview: Function;
};

export default function WriteForm({
  form,
  action,
  setIsWritingReview,
}: Props): ReactNode {
  function handleClick(e: React.MouseEvent<HTMLButtonElement>): void {
    e.preventDefault();

    setIsWritingReview(false);
  }

  return (
    <form action={action} className="flex w-96 flex-col">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend">Write a review</legend>

        <label className="label">Headline (optional)</label>
        <input
          type="text"
          className="input w-auto"
          name="headline"
          defaultValue={form.headline}
          placeholder="Short title of the review"
        />

        <label className="label">Review</label>
        <textarea
          className="textarea textarea-accent w-auto"
          name="content"
          rows={10}
          defaultValue={form.content}
          placeholder="Write a review for this place"
        />
        <FieldError errors={form.errors} field={Review.Content} />
        <section className="mt-2 flex justify-end gap-2">
          <button className="btn btn-secondary" onClick={handleClick}>
            Cancel
          </button>
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </section>
      </fieldset>
    </form>
  );
}
