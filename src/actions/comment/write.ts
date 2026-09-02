'use server';

import { revalidatePath } from 'next/cache';
import { CommentForm } from '@/interfaces/comment';
import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

export async function write(
  _: unknown,
  formData: FormData,
): Promise<CommentForm | undefined> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/place-pictures/${getPictureId(formData)}/comments`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      }),
      body: JSON.stringify({ body: formData.get('body') }),
    };
  }

  let response: Response = await fetch(url, await options());
  await catchSession(response, options);

  if (!response.ok) {
    const data = await response.json();

    return {
      body: formData.get('body')?.toString()!,
      errors: data.errors,
    };
  }

  revalidatePath(
    `places/${getPlaceId(formData)}/picture/${getPictureId(formData)}`,
  );
}

function getPictureId(formData: FormData): string {
  return formData.get('pictureId')?.toString()!;
}

function getPlaceId(formData: FormData): string {
  return formData.get('placeId')?.toString()!;
}
