import { ReactNode } from 'react';
import DeletePlaceButton from './delete-place-button';
import { Place } from '@/interfaces/place';
import { deletePlace } from '@/actions/place/delete';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEarthAmericas, faPhone, faMobile, faMapLocationDot, faAt, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default async function PlaceDetails({ params }: { params: Promise<{ id: string }> }): Promise<ReactNode> {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const place: Place = await response.json();

  return (
    <main className="flex justify-center mt-10">
      <article className="card bg-base-100 w-96 shadow-sm">
        <figure>
          <img
            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
            alt="Place primary picture" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{place.name}</h2>
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
            <Link className="btn btn-primary" href={`/places/${id}/edit`}>Edit</Link>
            <DeletePlaceButton id={id} onClick={deletePlace} />
          </div>
        </div>
      </article>
    </main>
  );
}