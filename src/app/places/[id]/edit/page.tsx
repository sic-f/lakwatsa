import { ReactNode } from 'react';
import { Place, PlaceForm } from '@/interfaces/place';
import Form from './form';
import { getAccount } from '@/services/identity';
import { notFound } from 'next/navigation';

export default async function EditPlace({ params }: { params: Promise<{ id: string }> }): Promise<ReactNode> {
  
  const { id } = await params;
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`);
  
  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
  
  const place: PlaceForm = await response.json();
  
  if ((await getAccount()).id !== (place as Place).broId) notFound();

  return <Form placeDetails={place} />;
}