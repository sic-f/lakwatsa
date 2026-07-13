import { PlacePicture } from './place-picture';

export interface Bookmark {
  id: string;
  name: string;
  description: string;
  picture: PlacePicture;
  bookmarkableId: string;
}
