import { ReactNode } from 'react';
import BookmarkCard from './bookmark-card';
import { Bookmark } from '@/interfaces/bookmark';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

type Props = {
  bookmarks: Bookmark[];
  header: string;
  icon: IconProp;
};

export default function Tab({ bookmarks, header, icon }: Props): ReactNode {
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
        <FontAwesomeIcon icon={icon} className="mr-1.5" />
        {header}
      </label>
      {renderContent()}
    </>
  );
}
