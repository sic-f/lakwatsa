'use server';

import { redirect } from 'next/navigation';
import { PlaceContext, PlaceForm } from "@/interfaces/place";
import { getToken } from '@/services/session';
import { catchSession } from "@/services/session/catch-session";
import fetchPlace from './fetch-place';

export async function update(state: PlaceForm, formData: FormData): Promise<PlaceForm> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${state.id}`;
  const options: RequestInit = {
    method: 'PUT',
    headers: new Headers({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${await getToken()}`
    }),
    body: JSON.stringify({
      name: formData.get('name'),
      description: formData.get('description'),
      information: formData.get('information'),
      address: formData.get('address'),
      mobile: formData.get('mobile'),
      landline: formData.get('landline'),
      email: formData.get('email'),
      website: formData.get('website'),
      facebook: formData.get('facebook'),
      instagram: formData.get('instagram'),
    }),
  };

  let response: PlaceContext = await fetchPlace(url, options);
  response = await catchSession(response);

  if (!response.ok) {
    return {
      id: state.id,
      name: formData.get('name')?.toString(),
      description: formData.get('description')?.toString(),
      information: formData.get('information')?.toString(),
      address: formData.get('address')?.toString(),
      mobile: formData.get('mobile')?.toString(),
      landline: formData.get('landline')?.toString(),
      email: formData.get('email')?.toString(),
      website: formData.get('website')?.toString(),
      facebook: formData.get('facebook')?.toString(),
      instagram: formData.get('instagram')?.toString(),
      errors: response.data?.errors,
    }
  }

  redirect(`/places/${state.id}`);
}