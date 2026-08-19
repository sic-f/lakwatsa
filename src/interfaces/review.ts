import { Error } from '@/interfaces/error';

export interface Review {
  id: string;
  headline?: string;
  content: string;
  reviewer: string;
  reviewerId: string;
  bookmarkId: string;
  createdAt: Date;
  lastModified: Date;
}

export interface ReviewForm {
  id?: string;
  headline?: string;
  content: string | undefined;
  placeId?: string;
  message?: string;
  errors?: Error;
}
