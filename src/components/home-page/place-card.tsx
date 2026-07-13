import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import BookmarkAction from '../bookmark/bookmark-action';
import { Place } from '@/interfaces/place';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';

export default function PlaceCard({
  place,
  broId,
  hasSession,
}: {
  place: Place;
  broId: string;
  hasSession: boolean;
}): ReactNode {
  function isNotPlaceOwner(): boolean {
    return broId !== place.broId;
  }

  function bookmarkable(): boolean {
    return isNotPlaceOwner() && hasSession;
  }

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
          {bookmarkable() && (
            <BookmarkAction caption="Save me!😜">
              <FontAwesomeIcon icon={faBookmark} className="cursor-pointer" />
            </BookmarkAction>
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
