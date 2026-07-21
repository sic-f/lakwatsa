import { ReactNode, useActionState, useEffect } from 'react';
import Loading from '@/components/common/submitting-indicator';
import EditForm from './edit-form';
import { Review } from '@/interfaces/review';
import { updateReview } from '@/actions/review/update';
import { isEmpty } from 'lodash';

type Props = {
  review: Review;
  setReview: Function;
  setIsEditing: Function;
};

export default function EditReview({
  review,
  setIsEditing,
  setReview,
}: Props): ReactNode {
  const [form, action, pending] = useActionState(updateReview, review);

  useEffect(() => {
    if (review.content !== form.content && isEmpty(form.errors)) {
      setIsEditing(false);
      setReview(review);
    }
  }, [pending, form.message]);

  return (
    <div className="flex items-center justify-center">
      {pending ? <Loading /> : <EditForm form={form} action={action} />}
    </div>
  );
}
