'use server';

import { parseErrors } from '@/services/parseErrors';
import { setSession } from '@/services/session';
import { redirect } from 'next/navigation';

export async function register(state, formData: FormData) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
        passwordConfirmation: formData.get('passwordConfirmation'),
      }),
    }
  );

  if (!response.ok) {
    const errorsResponse = await response.json();
    const errors = await parseErrors(errorsResponse.errors);

    return { errors };
  }

  const data = await response.json();

  await setSession(data.token);

  redirect('/');
}