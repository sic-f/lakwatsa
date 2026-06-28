import { ReactNode } from "react";
import PlaceCard from "@/app/places/[id]/place-card";
import { Place } from '@/interfaces/place';

export default function Places({ places, broId }: { places: Place[], broId: string }): ReactNode {
  return places.map(place => <PlaceCard place={place} broId={broId} key={place.id} />);
}