'use server';

import { AuthTokens } from '@/interfaces/account';
import { cookies } from 'next/headers';

export const hasSession = async () => {
  const cookieStore = await cookies();

  return cookieStore.has("session");
}

export const isEmptySession = async () => !await hasSession();

export const setSessionWithRefresh = async (tokens: AuthTokens) => {
  const cookieStore = await cookies();
  const options = { httpOnly: true, secure: true, sameSite: true };

  cookieStore.set('session', tokens.token, options);
  cookieStore.set('refreshToken', tokens.refreshToken, options);
}

export const setSession = async (token: string) => {
  const cookieStore = await cookies();
  const options = { httpOnly: true, secure: true, sameSite: true };

  cookieStore.set('session', token, options);
}

export const endSession = async () => {
  const cookieStore = await cookies();

  cookieStore.delete('session');
}

export const getToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get('session')?.value;
}

export const getRefreshToken = async () => {
  const cookieStore = await cookies();

  return cookieStore.get('refreshToken')?.value;
}