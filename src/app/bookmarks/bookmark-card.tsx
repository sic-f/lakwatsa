import { ReactNode, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from '@/interfaces/bookmark';
import {
  MiddleTruncate,
  ShowMore,
  ShowMoreRef,
  Truncate,
} from '@re-dev/react-truncate';
import { Expand, Less } from '@/components/common/truncate-client';

type Props = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: Props): ReactNode {
  const ref = useRef<ShowMoreRef>(null);

  function toggleLines(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): ShowMoreToggleLinesFn {
    ref.current?.toggleLines(e);
  }

  return (
    <div className="card bg-base-100 w-96 shadow-sm" key={bookmark.saveableId}>
      <figure className="px-10 pt-10">
        <Image
          src={bookmark.picture ?? '/images/blank-place.webp'}
          width={200}
          height={0}
          alt="Shoes"
          className="rounded-xl"
        />
      </figure>
      <div className="card-body items-center text-center">
        <Truncate lines={4} preserveMarkup>
          <h2 className="card-title">{bookmark.headline}</h2>
        </Truncate>
        <div className="card-actions">
          <Link
            className="btn btn-primary"
            href={`/places/${bookmark.saveableId}`}
          >
            View ➡️
          </Link>
        </div>
      </div>
    </div>
  );
}
