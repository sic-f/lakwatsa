import { ReactNode, use } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookmarkAction from '../bookmark/bookmark-action';
import { bookmark, unsave } from '@/actions/bookmark/bookmark';
import { Place } from '@/interfaces/place';
import { isBookmarkable } from '@/services/utilities/misc';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function PlaceCard({
  place,
  broId,
}: {
  place: Place;
  broId: string;
}): ReactNode {
  return (
    <article className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <Link href={`/places/${place.id}`}>
          <Image
            src={place.picture?.small ?? '/images/blank-place.webp'}
            width={640}
            height={360}
            loading="eager"
            alt="Place primary picture"
          />
        </Link>
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title">
            <Link href={`/places/${place.id}`}>{place.name}</Link>
          </h2>
          {isBookmarkable(broId, place.broId) && (
            <BookmarkAction
              saveableId={place.id}
              saveableName="Place"
              caption="Save me!😜"
              bookmarkId={place.bookmarkId}
              onBookmark={bookmark}
              onUnsave={unsave}
              saveableUrl="saves"
            />
          )}
        </div>
        <p className="text-secondary cursor-default">{place.description}</p>
        <p className="text-accent flex cursor-default items-center">
          <FontAwesomeIcon
            icon={faMapLocationDot}
            className="mr-1.5 inline size-[1.2em]"
          />
          {place.address}
        </p>
        <span className="flex justify-end">
          <Link href={`/places/${place.id}`} className="text-primary">
            more info
          </Link>
        </span>
      </div>
    </article>
  );
}
