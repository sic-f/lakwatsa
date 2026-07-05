'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { catchSession } from '@/services/session/catch-session';
import { getToken } from '@/services/session';

export async function deletePlace(id: string): Promise<void> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'DELETE',
      headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText} ${await response.text()}`);
  
  redirect('/');
}

export async function deletePlacePicture(id: string, path: string): Promise<void> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/picture/${id}`
  async function options(): Promise<RequestInit> {
    return {
      method: 'DELETE',
      headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText} ${await response.text()}`);

  revalidatePath(path);
}