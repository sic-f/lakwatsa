import { PlacePicture } from '@/interfaces/place-picture';
import { NIL as NIL_UUID } from 'uuid';
import { isEmpty } from 'lodash';

export function isBookmarkable(broId: string, ownerId: string): boolean {
  if (broId === NIL_UUID) return false;

  return broId !== ownerId;
}

export function isPlaceOwner(broId: string, placeOwnerId: string): boolean {
  return broId === placeOwnerId;
}

export function isPlacePictureDeletable(
  broId: string,
  placeOwnerId: string,
  placePicture: PlacePicture,
): boolean {
  return isPlaceOwner(broId, placeOwnerId) && !isEmpty(placePicture);
}
