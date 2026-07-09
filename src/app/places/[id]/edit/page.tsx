import { ReactNode } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Form from './form';
import { Place, PlaceForm } from '@/interfaces/place';
import { getAccount } from '@/services/identity';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

export default async function EditPlace({ params }: { params: Promise<{ id: string }> }): Promise<ReactNode> {

  const { id } = await params;

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`);

  if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

  const place: PlaceForm = await response.json();

  if ((await getAccount()).id !== (place as Place).broId) notFound();

  return (
    <div className="md:flex justify-center">
      <Link href={`/places/${id}`} className="block ml-8 mb-8 md:flex items-center max-h-1 mt-12 mr-4">
        <FontAwesomeIcon icon={faAnglesLeft} className="inline mr-1 size-[1.2em]" />
        <span>back</span>
      </Link>
      <Form placeDetails={place} />
    </div>
  );
}