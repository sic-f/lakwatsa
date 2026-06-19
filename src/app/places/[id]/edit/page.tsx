import { ReactNode } from 'react';
import { PlaceForm } from '@/interfaces/place';
import Form from './form';

export default async function EditPlace({ params }: { params: Promise<{ id: string }> }): Promise<ReactNode> {
  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`, { method: 'GET' });

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const place: PlaceForm = await response.json();
  
  return <Form placeDetails={place} />;
}