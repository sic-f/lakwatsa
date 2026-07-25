'use server';

import { redirect } from 'next/navigation';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export async function deleteReview(
  id: string,
  pathname: string,
): Promise<void> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${id}`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'DELETE',
      headers: new Headers({
        Authorization: `Bearer ${await getToken()}`,
      }),
    };
  }

  let response: Response = await fetch(url, await options());
  response: await catchSession(response, options);

  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);

  redirect(pathname);
}
