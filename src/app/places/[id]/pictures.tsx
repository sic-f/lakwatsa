import { ReactNode } from 'react';
import { PlacePicture } from '@/interfaces/place-picture';
import ExtraPicture from './extra-picture';

const FIRST_PICTURE = 0;

export default async function Pictures({
  pictures,
}: {
  pictures: PlacePicture[];
}): Promise<ReactNode> {
  function getPreviousSlideValue(index: number, totalPictures: number): number {
    return index === FIRST_PICTURE ? totalPictures : index;
  }

  function getNexSlideValue(index: number, totalPictures: number): number {
    return index === totalPictures - 1 ? 1 : index + 2;
  }

  return (
    <div className="carousel w-full">
      {pictures.map((picture: PlacePicture, index: number) => {
        return (
          <ExtraPicture
            url={picture.small}
            detailsUrl={`/places/${picture.placeId}/picture/${picture.id}?slide=${index + 1}`}
            key={picture.id}
            slideNumber={index + 1}
            previousSlide={getPreviousSlideValue(index, pictures.length)}
            nextSlide={getNexSlideValue(index, pictures.length)}
          />
        );
      })}
    </div>
  );
}
