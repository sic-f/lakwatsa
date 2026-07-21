'use server';

import { ReviewForm } from '@/interfaces/review';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';
import { redirect } from 'next/navigation';

export async function writeReview(
  state: ReviewForm,
  formData: FormData,
): Promise<ReviewForm> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/reviews`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      }),
      body: JSON.stringify({
        content: formData.get('content'),
        placeId: state?.placeId,
      }),
    };
  }

  let response: Response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) {
    const data = await response.json();

    return {
      errors: data.errors,
      placeId: formData.get('placeId')?.toString(),
      content: formData.get('content')?.toString(),
    };
  }

  redirect(`/places/${state.placeId}`);
}
