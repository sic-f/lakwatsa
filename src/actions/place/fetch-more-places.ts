'use server';

import { Place } from "@/interfaces/place";
import { catchSession } from "@/services/session/catch-session";

export async function fetchMorePlaces(offset: string, noOfPlacesToFetch: number): Promise<Place[]> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places?offset=${offset}&limit=${noOfPlacesToFetch}`;

  let response: Response = await fetch(url);
  response = await catchSession(response);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  return await response.json();
}