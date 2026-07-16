'use client';

import { ReactNode, useEffect, useState } from 'react';
import BookmarkCard from './bookmark-card';
import { Bookmark } from '@/interfaces/bookmark';
import { fetchMoreBookmarks } from '@/actions/bookmark/fetch-more-bookmarks';
import { useInView } from 'react-intersection-observer';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

type Props = {
  bookmarks: Bookmark[];
  broId: string;
};

const NUMBER_OF_BOOKMARKS_TO_FETCH = 5;

export default function Bookmarks({
  bookmarks: initialBookmarks,
  broId,
}: Props): ReactNode {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(initialBookmarks);
  const [offset, setOffset] = useState(initialBookmarks.at(-1)!.createdAt);
  const [fetchedAllBookmarks, setFetchedAllBookmarks] =
    useState<boolean>(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchedAllBookmarks) return;

    async function fetchBookmarks() {
      if (!inView) return;

      const moreBookmarks: Bookmark[] = await fetchMoreBookmarks(
        dayjs(offset).toISOString(),
        NUMBER_OF_BOOKMARKS_TO_FETCH,
        broId,
      );

      if (isEmpty(moreBookmarks)) {
        setFetchedAllBookmarks(true);
        return;
      }

      setBookmarks((bookmarks) => [...bookmarks, ...moreBookmarks]);
      setOffset(moreBookmarks.at(-1)!.createdAt);
    }

    fetchBookmarks();
  }, [inView]);

  return (
    <section className="flex gap-2 max-sm:flex-col sm:flex-wrap sm:justify-center md:gap-4">
      {bookmarks.map((bookmark) => (
        <BookmarkCard bookmark={bookmark} key={bookmark.placeId} />
      ))}
      {!isEmpty(bookmarks) && <div ref={ref}></div>}
    </section>
  );
}
