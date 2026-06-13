'use server';

import { Error } from '@/interfaces/account';
import { parseErrors } from '@/services/parseErrors';
import { endSession, setSession } from '@/services/session';
import { redirect } from 'next/navigation';

export async function login(_: { errors: Error; } | undefined, formData: FormData): Promise<{ errors: Error, message: string } | undefined> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: formData.get('email'),
        password: formData.get('password'),
      }),
    }
  );

  if (!response.ok) {
    const errorsResponse = await response.json();

    if (errorsResponse.hasOwnProperty('message')) return { message: errorsResponse.message };

    const errors = await parseErrors(errorsResponse.errors);

    return { errors };
  }

  const data = await response.json();

    await setSession(data.token);
    redirect('/');
}

export const logout = async () => {
  await endSession();
  redirect('/');
}

const buildPayload = (formData: FormData) => {
  return
}