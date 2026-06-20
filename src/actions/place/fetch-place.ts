'use server';

import { HttpStatusCode } from "@/constants/http-status-codes";
import { PlaceContext } from '@/interfaces/place';

export default async function fetchPlace(url: string, options: RequestInit): Promise<PlaceContext> {
  const response = await fetch(url, options);

  if (response.status === HttpStatusCode.Unauthorized) {
    return { ok: response.ok, status: response.status, statusText: response.statusText, url, options };
  }

  const data = await response.json();

  return { data: data, ok: response.ok, status: response.status, statusText: response.statusText, url: url, options: options };
}