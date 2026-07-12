import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TopActions from './top-actions';
import Caption from './caption';
import { PlacePicture } from '@/interfaces/place-picture';
import { getAccount } from '@/services/identity';
import { isEmpty } from 'lodash';

export default async function Picture({
  params,
  searchParams,
}: {
  params: Promise<{ pictureId: string }>;
  searchParams: { slide: string };
}): Promise<ReactNode> {
  const { pictureId } = await params;
  const { slide } = await searchParams;
  const broId: string = (await getAccount()).id;

  function getQueryParameter(slide: string): string {
    if (isEmpty(slide)) return '';

    return `?slide=${slide}`;
  }

  function isDeletable(): boolean {
    return broId == picture.uploaderId;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/place-pictures/${pictureId}${getQueryParameter(slide)}`,
  );

  if (!response.ok)
    throw new Error(
      `${response.status} ${response.statusText} ${await response.text()}`,
    );

  const picture: PlacePicture = await response.json();

  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center py-6 lg:w-3/4">
        <TopActions
          id={picture.id}
          placeId={picture.placeId}
          index={picture.index}
          isDeletable={isDeletable()}
        />
        <Link
          href={picture.normal}
          target="_blank"
          title="🏞 Click to view full size"
          className="flex justify-center"
        >
          <Image
            src={picture.normal}
            width={1366}
            height={768}
            alt="Place picture"
          />
        </Link>
        <Caption picture={picture} broId={(await getAccount()).id} />
      </div>
    </section>
  );
}
