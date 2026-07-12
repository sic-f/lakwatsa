import EmptyPlacesText from '@/components/home-page/empty-places-text';
import Places from '@/components/home-page/places';
import { Place } from '@/interfaces/place';
import { getAccount } from '@/services/identity';
import { isEmpty } from 'lodash';

const INITIAL_NUMBER_OF_PLACES = 5;

export default async function Home() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/places?offset=${new Date().toISOString()}&limit=${INITIAL_NUMBER_OF_PLACES}`,
  );

  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);

  const places: Place[] = await response.json();

  return (
    <div>
      {isEmpty(places) ? (
        <EmptyPlacesText />
      ) : (
        <Places initialPlaces={places} broId={(await getAccount()).id} />
      )}
    </div>
  );
}
