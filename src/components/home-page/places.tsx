'use client';

import { ReactNode, useEffect, useState } from 'react';
import PlaceCard from "@/app/places/[id]/place-card";
import { Place } from '@/interfaces/place';
import { useInView } from 'react-intersection-observer';

const NUMBER_OF_PLACES_TO_FETCH = 10

export default function Places({ places: initialPlaces, broId }: { places: Place[], broId: string }): ReactNode {
  const [offset, setOffset] = useState(NUMBER_OF_PLACES_TO_FETCH)
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const { ref, inView } = useInView();

  useEffect(() => {
    async function fetchPlaces() {
      if (inView) {
        await loadMorePlaces()
      }

      fetchPlaces();
    }, [inView])

  return (
    <div>
      {places.map(place => <PlaceCard place={place} broId={broId} key={place.id} />)}
      <div ref={ref}>
        Loading...
      </div>
    </div>
  );
}