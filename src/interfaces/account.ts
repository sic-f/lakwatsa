export interface Error {
  [key: string]: string[];
}

export interface DecodedToken {
  sub: string;
  email: string;
  given_name?: string | null;
  family_name?: string | null;
}

export interface AccountProfile {
  id: string;
  email: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface ChangePassword {
  id: number;
  oldPassword?: string;
  password?: string;
  passwordConfirmation?: string;
}