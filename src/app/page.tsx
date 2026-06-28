import EmptyPlacesText from '@/components/home-page/empty-places-text';
import Places from '@/components/home-page/places';
import { Place } from '@/interfaces/place';
import { getAccount } from '@/services/identity';
import { isEmpty } from 'lodash';

const INITIAL_NUMBER_OF_PLACES = 10

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/places`);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const places: Place[] = await response.json();

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-center">
        <div className="flex flex-col items-center gap-18 text-center sm:items-start sm:text-left">
          {isEmpty(places) ? <EmptyPlacesText /> : <Places places={places} broId={(await getAccount()).id} />}
        </div>
      </main>
    </div>
  );
}
