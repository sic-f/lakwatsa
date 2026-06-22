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
    });

  if (isRefreshTokenExpired(response)) {
    await endSession();

    redirect('/expired');
  }

  if (response.ok) {
    const data = await response.json();

    await setSessionWithRefresh(data);
  }
}

function isRefreshTokenExpired(response: Response) {
  return response.status === HttpStatusCode.Unauthorized;
}