'use client';

import { ReactNode, useActionState } from 'react';
import BackAction from './back-action';
import Form from './form';
import Loading from './submitting-indicator';
import { initialState } from '@/services/empty-form';
import { submit } from '@/actions/place/submit';

export default function SubmitPlace(): ReactNode {
  const [place, action, pending] = useActionState(submit, initialState);

  return (
    <div className="flex items-center justify-center">
      {pending ? (
        <Loading />
      ) : (
        <div className="md:flex">
          <BackAction
            url="/"
            classNames="block mb-8 items-center md:flex max-h-1 mt-6 md:mt-12 md:mr-4"
          />
          <Form place={place} action={action} />
        </div>
      )}
    </div>
  );
}
