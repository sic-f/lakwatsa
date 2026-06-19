import { Error } from '@/interfaces/error';
import { Options } from './session';

export interface PlaceForm {
  id?: string;
  name: string | undefined;
  description: string | undefined;
  information: string | undefined;
  address: string | undefined ;
  mobile: string | undefined;
  landline: string | undefined;
  email: string | undefined;
  website: string | undefined;
  facebook: string | undefined;
  instagram: string | undefined;
  errors?: Error;
  message?: string;
}

export interface Place {
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
}

export interface PlaceContext {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  options: Options;
  data?: PlaceForm;
}
