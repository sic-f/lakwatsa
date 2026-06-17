export interface Error {
  [key: string]: string[];
}

export interface DecodedToken {
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
}

export interface AccountProfile {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
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