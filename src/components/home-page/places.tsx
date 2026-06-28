'use client';

import { ReactNode, useEffect, useState } from 'react';
import PlaceCard from "@/app/places/[id]/place-card";
import { Place } from '@/interfaces/place';
import { fetchMorePlaces } from '@/actions/place/fetch-more-places';
import { useInView } from 'react-intersection-observer';
import { isEmpty } from 'lodash';
import dayjs from 'dayjs';

const NUMBER_OF_PLACES_TO_FETCH = 5;

export default function Places({ places: initialPlaces, broId }: { places: Place[], broId: string }): ReactNode {
  const [offset, setOffset] = useState(initialPlaces.at(-1)!.createdAt)
  const [places, setPlaces] = useState<Place[]>(initialPlaces);
  const [fetchedAllPlaces, setFetchedAllPlaces] = useState<boolean>(false);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (fetchedAllPlaces) return;

    async function fetchPlaces() {
      if (inView) {
        const morePlaces: Place[] = await fetchMorePlaces(dayjs(offset).toISOString(), NUMBER_OF_PLACES_TO_FETCH);

        if (isEmpty(morePlaces)) {
          setFetchedAllPlaces(true);
          return;
        }

        setPlaces(places => [...places, ...morePlaces]);
        setOffset(morePlaces.at(-1)!.createdAt);
      }
    }

    fetchPlaces();
  }, [inView])

  return (
    <>
      {places.map(place => <PlaceCard place={place} broId={broId} key={place.id} />)}
      <div ref={ref}></div>
    </>
  );
}