import { ReactNode } from 'react';
import FieldError from '@/components/common/field-error';
import { Review } from '@/constants/field-errors';
import { ReviewForm } from '@/interfaces/review';

type Props = {
  form: ReviewForm;
  action: (payload: FormData) => void;
};

export default function EditForm({ form, action }: Props): ReactNode {
  return (
    <form action={action} id="updateReview" className="flex flex-col">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-sm border p-4">
        <legend className="fieldset-legend">Update review</legend>
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
          className="textarea textarea-accent w-full"
          rows={20}
          name="content"
          defaultValue={form.content}
        />
        <FieldError errors={form.errors} field={Review.Content} />
      </fieldset>
    </form>
  );
}
