import { ReactNode } from 'react';
import Tab from './tab';
import { Bookmark } from '@/interfaces/bookmark';
import { Bookmark as Saved } from '@/constants/bookmark';

type Props = {
  bookmarks: Bookmark[];
};

export default function Bookmarks({ bookmarks }: Props): ReactNode {
  return (
    <div className="tabs tabs-lift w-96">
      <Tab bookmarks={bookmarks} header="All" />
      <Tab
        bookmarks={bookmarks.filter(
          (bookmark) => bookmark.kind === Saved.Place,
        )}
        header="Places"
      />
      <Tab
        bookmarks={bookmarks.filter(
          (bookmark) => bookmark.kind === Saved.Review,
        )}
        header="Reviews"
      />
    </div>
  );
}
