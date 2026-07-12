'use server';

import { PlacePictureForm } from '@/interfaces/place-picture';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export async function updatePicture(
  state: PlacePictureForm,
  formData: FormData,
): Promise<PlacePictureForm> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/place-pictures/${state.id}`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      }),
      body: JSON.stringify({ caption: formData.get('caption') }),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) {
    const data = await response.json();

    return {
      id: state.id,
      caption: formData.get('caption')?.toString(),
      errors: data.errors,
    };
  }

  const data = await response.json();

  return {
    id: state.id,
    caption: formData.get('caption')?.toString(),
    uploaderId: data.uploaderId,
    message: data.message,
  };
}
