import { ReactNode } from 'react';
import Bookmarks from './bookmarks';
import { Bookmark } from '@/interfaces/bookmark';
import { getToken } from '@/services/session';
import { getAccount } from '@/services/identity';
import { catchSession } from '@/services/session/catch-session';
import { isEmpty } from 'lodash';

const NUMBER_OF_PLACES_TO_FETCH = 5;

export default async function BookmarksPage(): Promise<ReactNode> {
  const broId = (await getAccount()).id;
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/saves?offset=${new Date().toISOString()}&limit=${NUMBER_OF_PLACES_TO_FETCH}&broId=${broId}`;
  async function options(): Promise<RequestInit> {
    return {
      headers: new Headers({
        Authorization: `Bearer ${await getToken()}`,
      }),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok)
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );

  const bookmarks: Bookmark[] = await response.json();

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-2 text-4xl">Saved places</h1>
      {isEmpty(bookmarks) ? (
        'No saved places 📥'
      ) : (
        <Bookmarks bookmarks={bookmarks} broId={broId} />
      )}
    </main>
  );
}
