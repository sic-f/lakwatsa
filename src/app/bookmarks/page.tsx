'use client';

import { ReactNode, use, useEffect, useState } from 'react';
import Bookmarks from './bookmarks';
import { HttpStatusCode } from '@/constants/http-status-codes';
import { Bookmark } from '@/interfaces/bookmark';
import { getToken } from '@/services/session';
import { refreshToken } from '@/services/session/refresh-token';
import { fetchMoreBookmarks } from '@/actions/bookmark/fetch-more-bookmarks';
import { useInView } from 'react-intersection-observer';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const NUMBER_OF_BOOKMARKS_TO_FETCH = 5;

export default function BookmarksIndex(): ReactNode {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [offset, setOffset] = useState<Date>();
  const [fetchedAllBookmarks, setFetchedAllBookmarks] =
    useState<boolean>(false);
  const { ref, inView } = useInView();

  function isTokenExpired(response: Response) {
    return response.status === HttpStatusCode.Unauthorized;
  }

  useEffect(() => {
    if (fetchedAllBookmarks) return;
    let ignore: boolean = false;

    async function fetchBookmarks() {
      if (isEmpty(bookmarks)) {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/saveds?offset=${new Date().toISOString()}&limit=${NUMBER_OF_BOOKMARKS_TO_FETCH}`;
        async function options(): Promise<RequestInit> {
          return {
            headers: new Headers({
              Authorization: `Bearer ${await getToken()}`,
            }),
          };
        }

        let response: Response = await fetch(url, await options());

        if (isTokenExpired(response)) {
          await refreshToken();

          response = await fetch(url, await options());
        }

        if (!response.ok)
          throw new Error(`${response.status} ${response.statusText}`);

        if (!ignore) {
          const initialBookmarks: Bookmark[] = await response.json();
          if (isEmpty(initialBookmarks)) return;
          setBookmarks(initialBookmarks);
          setOffset(initialBookmarks.at(-1)!.createdAt);
        }
      }

      if (inView) {
        const moreBookmarks: Bookmark[] = await fetchMoreBookmarks(
          dayjs(offset).toISOString(),
          NUMBER_OF_BOOKMARKS_TO_FETCH,
        );

        if (isEmpty(moreBookmarks)) {
          setFetchedAllBookmarks(true);
          return;
        }

        if (!ignore) {
          setBookmarks((bookmarks) => [...bookmarks, ...moreBookmarks]);
          setOffset(moreBookmarks.at(-1)?.createdAt);
        }
      }
    }

    fetchBookmarks();

    return () => {
      ignore = true;
    };
  }, [inView]);

  return (
    <main className="flex flex-col items-center">
      <h1 className="my-6 text-4xl">Saves</h1>
      <section className="flex gap-2 max-sm:flex-col sm:flex-wrap sm:justify-center md:gap-4">
        {isEmpty(bookmarks) ? (
          'No saved places 📥'
        ) : (
          <Bookmarks bookmarks={bookmarks} />
        )}
      </section>
      {!isEmpty(bookmarks) && <div ref={ref}></div>}
    </main>
  );
}
