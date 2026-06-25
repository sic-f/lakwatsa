import { ReactNode } from "react";
import PlaceCard from "@/app/places/[id]/place-card";
import { Place } from '@/interfaces/place';

export default function Places({ places }: { places: Place[] }): Promise<ReactNode> {
  return places.map(place => <PlaceCard place={place} key={place.id} />);
}