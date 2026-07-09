import { Error } from '@/interfaces/error';

export interface PlacePicture {
  id: string;
  caption: string;
  normal: string;
  small: string;
  placeId: string;
  uploaderId: string;
}

export interface PlacePictureForm {
  id: string;
  uploaderId?: string;
  caption?: string;
  message?: string;
  errors?: Error;
}