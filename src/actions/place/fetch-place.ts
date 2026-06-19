'use server';

import { HttpStatusCode } from "@/constants/http-status-codes";
import { Options } from '@/interfaces/session';
import { PlaceContext } from '@/interfaces/place';

export default async function fetchPlace(id: string): Promise<PlaceContext> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`;
  const options: Options = { method: 'GET' };

  const response = await fetch(url, options);

  if (response.status === HttpStatusCode.Unauthorized) {
    const result = { ok: response.ok, status: response.status, statusText: response.statusText, url: url, options: options }

    return result;
  }

  const data = await response.json();

  const result = { data: data, ok: response.ok, status: response.status, statusText: response.statusText, url: url, options: options }

  return result;
}