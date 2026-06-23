import { ReactNode } from 'react';
import PlaceCard from './place-card';
import { Place } from '@/interfaces/place';

export default async function PlaceDetails({ params }: { params: Promise<{ id: string }> }): Promise<ReactNode> {
  const { id } = await params;
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`);
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const place: Place = await response.json();

  return (
    <main className="flex justify-center mt-10">
      <PlaceCard place={place} />
    </main>
  );
}