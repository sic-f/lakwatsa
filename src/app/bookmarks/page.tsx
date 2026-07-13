import { ReactNode } from 'react';
import { Bookmark } from '@/interfaces/bookmark';
import BookmarkCard from './bookmark-card';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export default async function Bookmarks(): Promise<ReactNode> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/saves`;
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
    <main className="flex-warp flex justify-center">
      <h1 className="mt-2 ml-2 text-4xl">Saved places</h1>
      {bookmarks.map((bookmark) => (
        <BookmarkCard bookmark={bookmark} key={bookmark.id} />
      ))}
    </main>
  );
}
