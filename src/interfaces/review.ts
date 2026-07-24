import { Error } from '@/interfaces/error';

export interface Review {
  id: string;
  headline?: string;
  content: string;
  reviewerId: string;
  bookmarkId: string;
  reviewsCount: number;
  createdAt: Date;
}

export interface ReviewForm {
  id?: string;
  headline?: string;
  content: string | undefined;
  placeId?: string;
  message?: string;
  errors?: Error;
}
