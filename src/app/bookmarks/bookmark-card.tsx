import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark as Saved } from '@/constants/bookmark';
import { BlankAvatar } from '@/constants/blank-avatar';
import { Bookmark } from '@/interfaces/bookmark';
import { Truncate } from '@re-dev/react-truncate';

type Props = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: Props): ReactNode {
  const imageWidth: number = bookmark.kind === Saved.Place ? 400 : 150;

  function imgSrc(kind: string): string {
    if (bookmark.picture) return bookmark.picture;

    switch (kind) {
      case 'SavedPlace':
        return BlankAvatar.Place;
      case 'SavedReview':
        return BlankAvatar.Account;
      default:
        return BlankAvatar.Default;
    }
  }

  return (
    <div
      className="card bg-base-100 shadow-sm sm:w-96"
      key={bookmark.saveableId}
    >
      <figure className="px-10 pt-10">
        <Image
          src={imgSrc(bookmark.kind)}
          width={imageWidth}
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
