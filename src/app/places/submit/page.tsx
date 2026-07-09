'use client';

import { ReactNode, useActionState } from 'react';
import BackAction from './back-action';
import Form from './form';
import { initialState } from '@/services/empty-form';
import { submit } from '@/actions/place/submit';

export default function SubmitPlace(): ReactNode {
  const [place, action] = useActionState(submit, initialState);

  return (
    <div className="md:flex justify-center">
      <BackAction url="/" classNames="block ml-8 mb-8 md:flex items-center max-h-1 mt-12 mr-4" />
      <Form place={place} action={action} />
    </div>
  );
}