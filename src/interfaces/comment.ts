import { Error } from '@/interfaces/error';

export interface Comment {
  id: string;
  body: string;
  commenterName: string;
  commenterAvatar: string | null;
  createdAt: Date;
  lastModified: Date;
}

export interface CommentForm {
  body: string;
  pictureId: string;
  placeId: string;
  errors?: Error;
  message?: string;
}
