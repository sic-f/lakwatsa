'use server';

import { PlaceContext } from '@/interfaces/place';
import { catchSession } from '@/services/session/catch-session';
import { fetchPlace } from './fetch-place';
import { redirect } from 'next/navigation';
import { getToken } from '@/services/session';

export async function deletePlace(e: React.MouseEvent<HTMLAnchorElement>, id: string): Promise<void> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`;
  const options: RequestInit = { method: 'DELETE', headers: new Headers({ Authorization: `Bearer ${await getToken()}` }) };

  let response: PlaceContext = await fetchPlace(url, options);
  response = await catchSession(response);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  redirect('/');
}