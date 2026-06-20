'use server';

import { HttpStatusCode } from '@/constants/http-status-codes';
import { AfterTokenRefreshContext } from '@/interfaces/session';
import { PlaceContext } from '@/interfaces/place';
import { getToken } from '../session';
import { refreshToken } from './refresh-token';

export async function catchSession(context: PlaceContext): Promise<PlaceContext | AfterTokenRefreshContext> {
  if (context.status !== HttpStatusCode.Unauthorized) return context;

  await refreshToken({ clientCheck: false });

  context.options.headers?.set('Authorization', `Bearer ${await getToken()}`);
  
  const response = await fetch(context.url, context.options);

  const data = await response.json();
  
  return { data: data, ok: response.ok, status: response.status, statusText: response.statusText };
}