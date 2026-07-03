import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Place } from '@/interfaces/place';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapLocationDot } from '@fortawesome/free-solid-svg-icons';

export default function PlaceCard({ place, broId }: { place: Place, broId: string }): ReactNode {
  function isPlaceOwner() {
    return (broId === place.broId)
  }

  return (
    <article className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <Image
          src={place.picture?.normal ?? '/images/blank-place.webp'}
          width={640}
          height={360}
          loading="eager"
          alt="Place primary picture"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"><Link href={`/places/${place.id}`}>{place.name}</Link></h2>
        <p className="text-secondary cursor-default">{place.description}</p>
        <p className="flex items-center text-accent cursor-default">
          <FontAwesomeIcon icon={faMapLocationDot} className="inline mr-1.5 size-[1.2em]" />
          {place.address}
        </p>
        <span className="flex justify-end">
          <Link href={`/places/${place.id}`} className="text-primary">more info</Link>
        </span>
      </div>
    </article>
  );
}