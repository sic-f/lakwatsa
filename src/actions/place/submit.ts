'use server';

import { PlaceForm } from "@/interfaces/place";
import { getToken } from "@/services/session";
import { refreshToken } from "@/services/session/refresh-token";

export async function submit(state: PlaceForm, formData: FormData): Promise<PlaceForm> {
  await refreshToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/places`,
    {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
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
    }
  );

  if (!response.ok) {
    const data = await response.json();
    
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
      errors: data.errors,
    };
  }

  const data = await response.json();
  
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
    message: data.message,
  };
}