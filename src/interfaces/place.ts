import { Error } from '@/interfaces/error';

export interface PlaceForm {
  id?: string;
  name: string | undefined;
  description: string | undefined;
  information: string | undefined;
  address: string | undefined;
  mobile: string | undefined;
  landline: string | undefined;
  email: string | undefined;
  website: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  errors?: Error;
  message?: string;
  place?: Place;
}

export interface PlaceResponse {
  errors?: Error;
  message?: string;
  place?: Place;
}

export interface Place {
  id: string;
  name: string;
  description: string;
  information: string;
  address: string;
  mobile: string;
  landline: string;
  email: string;
  website: string;
  facebook: string;
  instagram: string;
  broId: string;
}

export interface PlaceContext {
  url?: string;
  options?: RequestInit;
  response: Response;
}
