import { NIL as NIL_UUID } from 'uuid';

export function isBookmarkable(broId: string, placeOwnerId: string): boolean {
  if (broId === NIL_UUID) return false;

  return broId !== placeOwnerId;
}
