import { ReactNode } from 'react';
import { Expand, Less } from '@/components/common/truncate';
import { Place } from '@/interfaces/place';
import { ShowMore } from '@re-dev/react-truncate';

type Props = {
  place: Place;
};

export default async function MoreInformation({
  place,
}: Props): Promise<ReactNode> {
  return (
    <div className="card bg-base-200 w-1/3 w-96 shadow-sm">
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
  );
}
