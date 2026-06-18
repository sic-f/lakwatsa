export interface Token {
  aud: string;
  iss: string;
  exp: number;
  sub: string;
  email: string;
  given_name: string;
  family_name: string;
  iat: number;
  jti: string;
  typ: string;
  nbf: number;
}

export interface Context {
  ok: boolean;
  status: number;
  statusText: string;
  url: string;
  options: Options;
  data?: {};
}

export interface AfterTokenRefreshContext {
  data: {};
  ok: boolean;
  status: number;
  statusText: string;
}

export interface Options {
  method: string;
  headers: [string[]];
  body?: string;
}