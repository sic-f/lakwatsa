import { Error } from '@/interfaces/error';

export interface DecodedToken {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}

export interface AccountProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string;
}

export interface AccountProfileForm {
  id: string;
  email: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  errors?: Error;
  message?: string;
}

export interface ChangePasswordForm {
  id: string;
  errors?: Error;
  message?: string;
}

export interface AuthTokens {
  token: string;
  refreshToken: string;
}