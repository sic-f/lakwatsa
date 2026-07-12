'use server';

import { redirect } from 'next/navigation';
import { PlaceForm } from '@/interfaces/place';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';
import { getFormData } from '@/services/form-data';

export async function submit(
  _: PlaceForm,
  formData: FormData,
): Promise<PlaceForm> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'POST',
      headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
      body: await getFormData(formData),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) {
    const { errors } = await response.json();

    return {
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
      errors: errors,
    };
  }

  const { id } = await response.json();

  redirect(`/places/${id}`);
}
