import { PlacePicture } from '@/interfaces/place-picture';
import { NIL as NIL_UUID } from 'uuid';
import { isEmpty } from 'lodash';

export function isBookmarkable(broId: string, ownerId: string): boolean {
  if (broId === NIL_UUID) return false;

  return broId !== ownerId;
}

export function isOwner(broId: string, ownerId: string): boolean {
  return broId === ownerId;
}

export function isPlacePictureDeletable(
  broId: string,
  placeOwnerId: string,
  placePicture: PlacePicture,
): boolean {
  return isOwner(broId, placeOwnerId) && !isEmpty(placePicture);
}
