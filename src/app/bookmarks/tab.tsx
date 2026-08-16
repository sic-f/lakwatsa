import { ReactNode } from 'react';
import BookmarkCard from './bookmark-card';
import { Bookmark } from '@/interfaces/bookmark';
import { isEmpty } from 'lodash';

type Props = {
  bookmarks: Bookmark[];
  header: string;
};

export default function Tab({ bookmarks, header }: Props): ReactNode {
  function renderContent(): ReactNode {
    return (
      <div className="tab-content bg-base-100 border-base-300 p-6 sm:w-auto">
        {isEmpty(bookmarks) ? (
          <div className="flex justify-center sm:w-96">
            <h2 className="text-xl">No bookmarks</h2>
          </div>
        ) : (
          bookmarks.map((bookmark) => (
            <BookmarkCard bookmark={bookmark} key={bookmark.saveableId} />
          ))
        )}
      </div>
    );
  }

  return (
    <>
      <label className="tab">
        <input type="radio" name="my_tabs_4" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="me-2 size-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          />
        </svg>
        {header}
      </label>
      {renderContent()}
    </>
  );
}
