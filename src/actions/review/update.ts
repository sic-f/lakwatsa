'use server';

import { redirect } from 'next/navigation';
import { ReviewForm } from '@/interfaces/review';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export async function updateReview(
  state: ReviewForm,
  formData: FormData,
): Promise<ReviewForm> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews/${state.id}`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      }),
      body: JSON.stringify({
        headline: formData.get('headline'),
        content: formData.get('content'),
      }),
    };
  }

  let response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) {
    const data = await response.json();

    return {
      id: state.id,
      errors: data.errors,
      headline: formData.get('headline')?.toString(),
      content: formData.get('content')?.toString(),
      placeId: state.placeId,
    };
  }

  redirect(`/places/${state.placeId}`);
}
