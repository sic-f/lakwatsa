'use server';

import { HttpStatusCode } from '@/constants/http-status-codes';
import { endSession, getRefreshToken, setSessionWithRefresh } from '../session';
import { redirect } from 'next/navigation';

export async function refreshToken(): Promise<void> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions/refresh`,
    {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(await getRefreshToken()),
    },
  );

  if (await isRefreshTokenExpired(response.status)) {
    await endSession();

    redirect('/expired');
  }

  if (response.ok) {
    const data = await response.json();

    await setSessionWithRefresh(data);
  }
}

export async function isRefreshTokenExpired(status: number) {
  return status === HttpStatusCode.Unauthorized;
}
