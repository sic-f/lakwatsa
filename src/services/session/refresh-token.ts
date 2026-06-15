'use server';

import { TokenExpiry } from '@/constants/session';
import { HttpStatusCode } from '@/constants/http-status-codes';
import { endSession, getRefreshToken, setSessionWithRefresh } from '../session';
import { redirect } from 'next/navigation';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { tokenExpiry } from './get-token-expiry';

export async function refreshToken(): Promise<void> {
  if (isTokenActive(await tokenExpiry())) return;

  await refresh();
}

function isTokenActive(expiry: Dayjs) {
  return secondsLeftBeforeExpiry(expiry) > TokenExpiry.SecondsBeforeExpiry;
}

function secondsLeftBeforeExpiry(expiry: Dayjs): number {
  dayjs.extend(duration);

  return dayjs.duration(expiry.diff(dayjs())).seconds();
}

async function refresh(): Promise<void> {
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