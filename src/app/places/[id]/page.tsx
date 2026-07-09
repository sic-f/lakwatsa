import { ReactNode } from 'react';
import PlaceCard from './place-card';
import Pictures from './pictures';
import { Place } from '@/interfaces/place';
import { getAccount } from '@/services/identity';

export default async function PlaceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactNode> {
  const { id } = await params;
  const broId: string = (await getAccount()).id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`,
  );
  if (!response.ok)
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );

  const place: Place = await response.json();

  return (
    <main>
      <div className="flex items-center justify-center py-10 max-sm:flex-col sm:pl-10 md:flex-row">
        <PlaceCard place={place} broId={broId} />
        <Pictures pictures={place.pictures} />
      </div>
      <div className="flex justify-start">
        <div className="card bg-base-200 w-96 shadow-sm">
          <article className="card-body">
            <h2 className="card-title text-info cursor-default">
              More information
            </h2>
            <p className="text-accent cursor-default whitespace-pre-wrap">
              {place.information ?? 'no info'}
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
