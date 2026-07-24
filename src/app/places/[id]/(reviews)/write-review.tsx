import { ReactNode, useActionState } from 'react';
import WriteForm from './write-form';
import Loading from '@/components/common/submitting-indicator';
import { writeReview } from '@/actions/review/write';

type Props = {
  placeId: string;
  setIsWritingReview: Function;
};

export default function WriteReview({
  placeId,
  setIsWritingReview,
}: Props): ReactNode {
  const [form, action, pending] = useActionState(writeReview, {
    content: undefined,
    placeId: placeId,
  });

  return (
    <div className="mb-10 flex items-center justify-center">
      {pending ? (
        <Loading />
      ) : (
        <WriteForm
          setIsWritingReview={setIsWritingReview}
          form={form}
          action={action}
        />
      )}
    </div>
  );
}
