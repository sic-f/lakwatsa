import { ReactNode, useEffect, useState } from 'react';
import BookmarkCard from './bookmark-card';
import { BookmarkRoutes } from '@/constants/bookmark';
import { Bookmark } from '@/interfaces/bookmark';
import { fetchMoreBookmarks } from '@/actions/bookmark/fetch-more-bookmarks';
import { getToken } from '@/services/session';
import {
  refreshToken,
  isRefreshTokenExpired,
} from '@/services/session/refresh-token';
import { useInView } from 'react-intersection-observer';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import dayjs from 'dayjs';
import { capitalize, isEmpty } from 'lodash';

type Props = {
  section: string;
  icon: IconProp;
  selected?: boolean;
};

const NUMBER_OF_BOOKMARKS_TO_FETCH = 5;

export default function Tab({ section, icon, selected }: Props): ReactNode {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [offset, setOffset] = useState<Date>();
  const [fetchedAllBookmarks, setFetchedAllBookmarks] =
    useState<boolean>(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchedAllBookmarks) return;
    let ignore: boolean = false;

    async function fetchBookmarks() {
      if (isEmpty(bookmarks)) {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${BookmarkRoutes[section]}?offset=${new Date().toISOString()}&limit=${NUMBER_OF_BOOKMARKS_TO_FETCH}`;
        async function options(): Promise<RequestInit> {
          return {
            headers: new Headers({
              Authorization: `Bearer ${await getToken()}`,
            }),
          };
        }

        let response: Response = await fetch(url, await options());
        if (await isRefreshTokenExpired(response.status)) {
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
          BookmarkRoutes[section],
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

  function renderContent(): ReactNode {
    return (
      <div className="tab-content bg-base-100 border-base-300 p-6 sm:w-auto">
        {isEmpty(bookmarks) ? (
          <div className="flex justify-center sm:w-96">
            <h2 className="text-xl">No bookmarks📥</h2>
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <BookmarkCard bookmark={bookmark} key={bookmark.saveableId} />
          ))
        )}
        {!isEmpty(bookmarks) && <div ref={ref}></div>}
      </div>
    );
  }

  return (
    <>
      <label className="tab">
        <input type="radio" name="my_tabs_4" defaultChecked={selected} />
        <FontAwesomeIcon icon={icon} className="mr-1.5" />
        {capitalize(section)}
      </label>
      {renderContent()}
    </>
  );
}
