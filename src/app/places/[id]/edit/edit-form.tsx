'use client';

import { ReactNode, useActionState } from 'react';
import BackAction from '../../submit/back-action';
import Form from './form';
import Loading from '@/components/common/submitting-indicator';
import { PlaceForm } from '@/interfaces/place';
import { update } from '@/actions/place/update';

type Props = {
  placeDetails: PlaceForm;
};

export default function EditForm({ placeDetails }: Props): ReactNode {
  const [place, action, pending] = useActionState(update, placeDetails);
  return (
    <div className="flex items-center justify-center">
      {pending ? (
        <Loading />
      ) : (
        <div className="md:flex">
          <BackAction
            url={`/places/${placeDetails.id}`}
            classNames="block mb-8 items-center md:flex max-h-1 mt-6 md:mt-12 md:mr-4"
          />
          <Form place={place} action={action} />
        </div>
      )}
    </div>
  );
}
