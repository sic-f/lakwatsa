import { ReactNode } from 'react';
import BackAction from '@/app/places/submit/back-action';
import DeletePictureAction from '@/components/common/place-picture/delete-picture-action';
import { deletePicture } from '@/actions/picture/delete';

export default async function TopActions({
  id,
  placeId,
  index,
  isDeletable,
}: {
  id: string;
  placeId: string;
  index: number;
  isDeletable: boolean;
}): Promise<ReactNode> {
  function getBackActionUrl(index: number): string {
    if (!index) return `/places/${placeId}`;

    return `/places/${placeId}#slide${index}`;
  }

  return (
    <div className="flex w-full justify-between">
      <BackAction url={getBackActionUrl(index)} classNames="ml-2" />
      {isDeletable && (
        <DeletePictureAction
          id={id}
          pathname={`/places/${placeId}`}
          onDelete={deletePicture}
          classNames="mr-2"
        />
      )}
    </div>
  );
}
