import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Bookmark } from '@/interfaces/bookmark';

type Props = {
  bookmark: Bookmark;
};

export default async function BookmarkCard({
  bookmark,
}: Props): Promise<ReactNode> {
  return (
    <div className="card card-side bg-base-100 shadow-sm">
      <figure>
        <Image src={`${bookmark.picture.small}`} alt="place picture" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{bookmark.name}</h2>
        <p>{bookmark.description}</p>
        <div className="card-actions justify-end">
          <Link href={`/places/{place.id}`} className="btn btn-primary">
            View
          </Link>
        </div>
      </div>
    </div>
  );
}
