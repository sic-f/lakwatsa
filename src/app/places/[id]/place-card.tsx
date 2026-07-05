import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DeletePlaceButton from './delete-place-button';
import DeletePictureAction from './delete-picture-action';
import { Place } from '@/interfaces/place';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faAngleDoubleRight, faAt, faEarthAmericas, faMapLocationDot, faMobile, faPhone } from '@fortawesome/free-solid-svg-icons';

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
        <div className="flex justify-between">
          <h2 className="card-title text-primary cursor-default">{place.name}</h2>
          <DeletePictureAction id={place.picture.id} />
        </div>
        <p className="text-info cursor-default">{place.description}</p>
        <p className="text-accent cursor-default">
          <FontAwesomeIcon icon={faAngleDoubleRight} className="inline mr-1.5 size-[1.2em]" />
          {place.information}
        </p>
        <p className="flex items-center text-warning cursor-default">
          <FontAwesomeIcon icon={faMapLocationDot} className="inline mr-1.5 size-[1.2em]" />
          {place.address}
        </p>
        <p><FontAwesomeIcon icon={faMobile} className="inline mr-1.5 size-[1.2em] cursor-default" />{place.mobile}</p>
        <p><FontAwesomeIcon icon={faPhone} className="inline mr-1.5 size-[1.2em] cursor-default" />{place.landline}</p>
        <p><FontAwesomeIcon icon={faAt} className="inline mr-1.5 size-[1.2em]" />{place.email}</p>
        <p><FontAwesomeIcon icon={faEarthAmericas} className="inline mr-1.5 size-[1.2em]" />{place.website}</p>
        <p className="flex items-base"><FontAwesomeIcon icon={faFacebookF} className="inline mr-1.5 size-[1.2em]" />{place.facebook}</p>
        <p><FontAwesomeIcon icon={faInstagram} className="inline mr-1.5 size-[1.2em] cursor-default" />{place.instagram}</p>
        <div className="card-actions justify-end">
          {isPlaceOwner() && <Link className="btn btn-accent" href={`/places/${place.id}/edit`}>Edit</Link>}
          {isPlaceOwner() && <DeletePlaceButton id={place.id} />}
        </div>
      </div>
    </article>
  );
}