'use server';

import { getToken, isEmptySession } from './session';
import { jwtDecode } from 'jwt-decode';
import { AccountProfile, DecodedToken } from '@/interfaces/account';
import { NIL as NIL_UUID } from 'uuid';

let identityData: DecodedToken;

export const getAccount = async (): Promise<AccountProfile> => {
  if (await isEmptySession()) {
    return {
      id: NIL_UUID,
      email: '',
      firstName: null,
      lastName: null,
    };
  }

  const token = await getToken();
  identityData = jwtDecode<DecodedToken>(token!);

  return {
    id: identityData.sub,
    email: identityData.email,
    firstName: identityData.given_name,
    lastName: identityData.family_name,
  };
}

export const broName = async (): Promise<string> => {
  if (await isEmptySession()) return '';

  const token = await getToken();
  identityData = jwtDecode<DecodedToken>(token!);

  return identityData.given_name ?? identityData.email;
};