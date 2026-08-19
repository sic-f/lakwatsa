'use server';

import { Bookmark } from '@/interfaces/bookmark';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export async function fetchMoreBookmarks(
  offset: string,
  noOfBookmarksToFetch: number,
  routePath: string,
): Promise<Bookmark[]> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${routePath}?offset=${offset}&limit=${noOfBookmarksToFetch}`;
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
