'use server';

import { HttpStatusCode } from '@/constants/common';
import { Error as ApplicationErrors } from '@/interfaces/account';
import { parseErrors } from '@/services/parse-errors';
import { endSession, getRefreshToken, setSession, setSessionWithRefresh } from '@/services/session';
import { redirect } from 'next/navigation';

export async function login(
  _: { errors: ApplicationErrors } | undefined,
  formData: FormData): Promise<{
    errors?: ApplicationErrors,
    message?: string
  } | undefined> {
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

  await setSessionWithRefresh(data);
  redirect('/');
}

export async function logout() {
  const refreshToken = await getRefreshToken();

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions`,
    {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authentication: `Bearer ${refreshToken}`
      }),
      body: JSON.stringify(refreshToken),
    }
  );

  if (isErrorResponseExcludingTokenAlreadyRevoked(response)) throw new Error(`${response.status} ${response.statusText}`)

  await endSession();
  redirect('/');
}

function isErrorResponseExcludingTokenAlreadyRevoked(response: Response) {
  return !response.ok && response.status !== HttpStatusCode.NotFound;
}