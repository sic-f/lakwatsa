'use client';

import { ReactNode, useEffect, useState } from 'react';
import PlaceCard from '@/components/home-page/place-card';
import { Place } from '@/interfaces/place';
import { fetchMorePlaces } from '@/actions/place/fetch-more-places';
import { useInView } from 'react-intersection-observer';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const NUMBER_OF_PLACES_TO_FETCH = 5;

export default function Places({
  initialPlaces,
  broId,
}: {
  initialPlaces: Place[];
  broId: string;
}): ReactNode {
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [offset, setOffset] = useState(initialPlaces.at(-1)!.createdAt);
  const [fetchedAllPlaces, setFetchedAllPlaces] = useState<boolean>(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchedAllPlaces) return;

    async function fetchPlaces() {
      if (!inView) return;

      const morePlaces: Place[] = await fetchMorePlaces(
        dayjs(offset).toISOString(),
        NUMBER_OF_PLACES_TO_FETCH,
        broId,
      );

      if (isEmpty(morePlaces)) {
        setFetchedAllPlaces(true);
        return;
      }

      setPlaces((places) => [...places, ...morePlaces]);
      setOffset(morePlaces.at(-1)!.createdAt);
    }

    fetchPlaces();
  }, [inView]);

  return (
    <main className="flex flex-col gap-12 pt-8 max-sm:items-center md:flex-row md:flex-wrap md:justify-center">
      {places.map((place) => (
        <PlaceCard place={place} broId={broId} key={place.id} />
      ))}
      {!isEmpty(places) && <div ref={ref}></div>}
    </main>
  );
}
