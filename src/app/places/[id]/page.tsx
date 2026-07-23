import { ReactNode } from 'react';
import PlaceCard from './place-card';
import MoreInformation from './more-information';
import Pictures from './pictures';
import Reviews from './(reviews)/reviews';
import { Place } from '@/interfaces/place';
import { getAccount } from '@/services/identity';
import { isEmpty } from 'lodash';

export default async function PlaceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactNode> {
  const { id } = await params;
  const broId: string = (await getAccount()).id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}?broId=${broId}`,
  );

  if (!response.ok)
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );

  const place: Place = await response.json();

  return (
    <main className="flex flex-col items-center">
      <div className="flex items-center justify-center py-10 max-sm:flex-col sm:pl-10 md:flex-row">
        <PlaceCard place={place} broId={broId} />
        <MoreInformation place={place} />
      </div>
      <div>
        {!isEmpty(place.pictures) && <Pictures pictures={place.pictures} />}
        <Reviews
          reviews={place.reviews}
          placeId={place.id}
          broId={broId}
          arePicturesEmpty={isEmpty(place.pictures)}
        />
      </div>
    </main>
  );
}
