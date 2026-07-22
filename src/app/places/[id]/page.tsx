import { ReactNode } from 'react';
import PlaceCard from './place-card';
import Pictures from './pictures';
import { Expand, Less } from '@/components/common/truncate';
import { Place } from '@/interfaces/place';
import { getAccount } from '@/services/identity';
import { ShowMore } from '@re-dev/react-truncate';
import Reviews from './(reviews)/reviews';
import { isEmpty } from 'lodash';
import classnames from 'classnames';

export default async function PlaceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<ReactNode> {
  const { id } = await params;
  const broId: string = (await getAccount()).id;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}?broId=${broId}`,
  );

  if (!response.ok)
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );

  const place: Place = await response.json();
  const reviewsClassName = classnames({
    'my-10': !isEmpty(place.pictures),
    'mb-10': isEmpty(place.pictures),
  });

  return (
    <main className="flex flex-col items-center">
      <div className="flex items-center justify-center py-10 max-sm:flex-col sm:pl-10 md:flex-row">
        <PlaceCard place={place} broId={broId} />
        <div className="card bg-base-200 mt-4 w-1/3 w-96 shadow-sm">
          <article className="card-body">
            <h2 className="card-title text-info cursor-default">
              More information
            </h2>
            <ShowMore
              lines={1}
              more={<Expand />}
              less={<Less />}
              className="text-success"
            >
              <p className="text-accent cursor-default whitespace-pre-wrap">
                {place.information ?? 'no info'}
              </p>
            </ShowMore>
          </article>
        </div>
      </div>
      <div>
        {!isEmpty(place.pictures) && <Pictures pictures={place.pictures} />}
        <section className={reviewsClassName}>
          <Reviews reviews={place.reviews} placeId={place.id} broId={broId} />
        </section>
      </div>
    </main>
  );
}
