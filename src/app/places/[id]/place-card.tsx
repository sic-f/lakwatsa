import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import DeletePlaceButton from './delete-place-button';
import { Place } from '@/interfaces/place';
import { deletePlace } from '@/actions/place/delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEarthAmericas, faPhone, faMobile, faMapLocationDot, faAt, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';

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
          alt="Place primary picture"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title"><Link href={`/places/${place.id}`}>{place.name}</Link></h2>
        <p>{place.description}</p>
        <p><FontAwesomeIcon icon={faAngleDoubleRight} className="inline mr-1.5 size-[1.2em]" />{place.information}</p>
        <p className="flex items-center"><FontAwesomeIcon icon={faMapLocationDot} className="inline mr-1.5 size-[1.2em]" />{place.address}</p>
        <p><FontAwesomeIcon icon={faMobile} className="inline mr-1.5 size-[1.2em]" />{place.mobile}</p>
        <p><FontAwesomeIcon icon={faPhone} className="inline mr-1.5 size-[1.2em]" />{place.landline}</p>
        <p><FontAwesomeIcon icon={faAt} className="inline mr-1.5 size-[1.2em]" />{place.email}</p>
        <p><FontAwesomeIcon icon={faEarthAmericas} className="inline mr-1.5 size-[1.2em]" />{place.website}</p>
        <p className="flex items-base"><FontAwesomeIcon icon={faFacebookF} className="inline mr-1.5 size-[1.2em]" />{place.facebook}</p>
        <p><FontAwesomeIcon icon={faInstagram} className="inline mr-1.5 size-[1.2em]" />{place.instagram}</p>
        <div className="card-actions justify-end">
          {isPlaceOwner() && <Link className="btn btn-primary" href={`/places/${place.id}/edit`}>Edit</Link>}
          {isPlaceOwner() && <DeletePlaceButton id={place.id} onClick={deletePlace} />}
        </div>
      </div>
    </article>
  );
}