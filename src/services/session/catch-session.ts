'use server';

import { HttpStatusCode } from '@/constants/http-status-codes';
import { refreshToken } from './refresh-token';

export async function catchSession(response: Response, options?: Function): Promise<Response> {
  if (response.status !== HttpStatusCode.Unauthorized) return response;

  await refreshToken();

  return await fetch(response.url, options && await options());
}