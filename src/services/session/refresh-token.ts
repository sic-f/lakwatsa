'use server';

import { TokenExpiry } from '@/constants/session';
import { HttpStatusCode } from '@/constants/common';
import { endSession, getRefreshToken, getToken, setSessionWithRefresh } from '../session';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { redirect } from 'next/navigation';
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

async function refresh() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/sessions/refresh`,
    {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(await getRefreshToken()),
    });

  console.log("👌", `${response.status}: ${response.statusText}`);

  if (response.status === HttpStatusCode.Unauthorized) {
    await endSession();
    redirect('/login');
    // return { message: 'Tokens expired. Please acquire new ones by signing in again.' }
  }

  if (response.ok) {
    const data = await response.json();
    await setSessionWithRefresh(data);
  }
}