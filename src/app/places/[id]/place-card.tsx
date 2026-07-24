import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DeleteAction from '@/components/common/delete-action';
import DeletePictureAction from '@/components/common/place-picture/delete-picture-action';
import BookmarkAction from '@/components/bookmark/bookmark-action';
import { Place } from '@/interfaces/place';
import { PlacePicture } from '@/interfaces/place-picture';
import { deletePlace } from '@/actions/place/delete';
import { deletePicture } from '@/actions/picture/delete';
import {
  isOwner,
  isPlacePictureDeletable,
  isBookmarkable,
} from '@/services/utilities/misc';
import { isEmpty } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import {
  faAt,
  faEarthAmericas,
  faMapLocationDot,
  faMobile,
  faPhone,
} from '@fortawesome/free-solid-svg-icons';

export default async function PlaceCard({
  place,
  broId,
}: {
  place: Place;
  broId: string;
}): Promise<ReactNode> {
  function getPictureLink(picture?: PlacePicture): string {
    if (isEmpty(picture)) return '#';

    return `/places/${place.id}/picture/${place.picture?.id}`;
  }

  const isOperableByBro: boolean = isOwner(broId, place.broId);
  const isPlaceBookmarkable: boolean = isBookmarkable(broId, place.broId);
  const isDeletable: boolean = isPlacePictureDeletable(
    broId,
    place.broId,
    place.picture,
  );

  return (
    <article className="card bg-base-100 mb-4 w-96 shadow-sm sm:min-w-72 md:max-lg:min-w-80 xl:min-w-80">
      <figure>
        <Link href={getPictureLink(place.picture)}>
          <Image
            src={place.picture?.small ?? '/images/blank-place.webp'}
            width={384}
            height={0}
            loading="eager"
            alt="Place picture"
          />
        </Link>
      </figure>
      <div className="card-body">
        <div className="flex justify-between">
          <h2 className="card-title text-primary cursor-default">
            {place.name}
          </h2>
          {isPlaceBookmarkable && (
            <BookmarkAction
              saveableId={place.id}
              caption="Save me!😜"
              saveableName="Place"
              bookmarkId={place.bookmarkId}
            />
          )}
          {isDeletable && (
            <DeletePictureAction
              id={place.picture.id}
              pathname={`/places/${place.id}`}
              onDelete={deletePicture}
            />
          )}
        </div>
        <p className="text-info cursor-default">{place.description}</p>
        <p className="text-warning flex cursor-default items-center">
          <FontAwesomeIcon
            icon={faMapLocationDot}
            className="mr-1.5 inline size-[1.2em]"
          />
          {place.address}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faMobile}
            className="mr-1.5 inline size-[1.2em] cursor-default"
          />
          {place.mobile}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faPhone}
            className="mr-1.5 inline size-[1.2em] cursor-default"
          />
          {place.landline}
        </p>
        <p>
          <FontAwesomeIcon icon={faAt} className="mr-1.5 inline size-[1.2em]" />
          {place.email}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faEarthAmericas}
            className="mr-1.5 inline size-[1.2em]"
          />
          {place.website}
        </p>
        <p className="items-base flex">
          <FontAwesomeIcon
            icon={faFacebookF}
            className="mr-1.5 inline size-[1.2em]"
          />
          {place.facebook}
        </p>
        <p>
          <FontAwesomeIcon
            icon={faInstagram}
            className="mr-1.5 inline size-[1.2em] cursor-default"
          />
          {place.instagram}
        </p>
        <div className="card-actions justify-end">
          {isOperableByBro && (
            <Link className="btn btn-accent" href={`/places/${place.id}/edit`}>
              Edit
            </Link>
          )}
          {isOperableByBro && (
            <DeleteAction
              id={place.id}
              pathname="/"
              deleteActionLabel="Delete"
              headline="Delete Place"
              prompt={`Are you sure you want to delete place "${place.name}"?`}
              onDelete={deletePlace}
              classNames="btn btn-error"
            />
          )}
        </div>
      </div>
    </article>
  );
}
