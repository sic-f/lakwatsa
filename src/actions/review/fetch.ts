'use server';

import { Review } from '@/interfaces/review';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export async function fetchReviews(
  offset: number,
  limit: number,
  placeId: string,
): Promise<Review[]> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews?offset=${offset}&limit=${limit}&placeId=${placeId}`;
  async function options(): Promise<RequestInit> {
    return {
      headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);

  return await response.json();
}
