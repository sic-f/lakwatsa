'use server';

import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export async function bookmark(
  saveableId: string,
  saveableUrl: string,
): Promise<string> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${saveableUrl}`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      }),
      body: JSON.stringify({ saveableId }),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );
  }

  const data = await response.json();

  return data.id;
}

export async function unsave(bookmarkId: string): Promise<undefined> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/saves/${bookmarkId}`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'DELETE',
      headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
    };
  }

  let response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) {
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );
  }
}
