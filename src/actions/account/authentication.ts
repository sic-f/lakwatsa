'use server';

import { endSession, setSession } from '@/services/session'
import { parseErrors } from '@/services/parseErrors';
import { redirect } from 'next/navigation';

export async function login(_, formData: FormData) {
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
    const errors = await parseErrors(errorsResponse.errors);

    return { errors };
  }

  const data = await response.json();

  await setSession(data.token);

  redirect('/');
}

export async function logout() {
  await endSession();
  
  redirect('/');
}