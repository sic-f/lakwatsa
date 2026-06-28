'use server';

import { Place } from "@/interfaces/place";
import { catchSession } from "@/services/session/catch-session";

export async function fetchMorePlaces(offset: number, noOfPlaces: number): Promise<Place[]> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places?offset=${offset}&noOfPlaces=${noOfPlaces}`;

  let response: Response = await fetch(url);
  response = await catchSession(response);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const data = await response.json();

  return data.places;
}