'use server';

import { Error } from '@/interfaces/account';
import { parseErrors } from '@/services/parse-errors';
import { setSession } from '@/services/session';
import { redirect } from 'next/navigation';

export async function register(_: { errors: Error } | undefined, formData: FormData): Promise<{ errors: Error } | undefined> {
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
    const errors: Error = await parseErrors(errorsResponse.errors);

    return { errors };
  }

  const data = await response.json();

  await setSession(data.token);

  redirect('/');
}