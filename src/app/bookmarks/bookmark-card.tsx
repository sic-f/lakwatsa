import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from '@/interfaces/bookmark';

type Props = {
  bookmark: Bookmark;
};

export default function BookmarkCard({ bookmark }: Props): ReactNode {
  return (
    <div className="card bg-base-100 w-96 shadow-sm" key={bookmark.placeId}>
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
        <h2 className="card-title">{bookmark.name}</h2>
        <p>{bookmark.description}</p>
        <div className="card-actions">
          <Link
            className="btn btn-primary"
            href={`/places/${bookmark.placeId}`}
          >
            View ➡️
          </Link>
        </div>
      </div>
    </div>
  );
}
