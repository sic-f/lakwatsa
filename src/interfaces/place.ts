import { Error } from '@/interfaces/error';

export interface PlaceForm {
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