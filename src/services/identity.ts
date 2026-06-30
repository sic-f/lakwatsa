'use server';

import { getToken, isEmptySession } from './session';
import { jwtDecode } from 'jwt-decode';
import { AccountProfile, DecodedToken } from '@/interfaces/account';
import { NIL as NIL_UUID } from 'uuid';
import { isEmpty } from 'lodash';

let identityData: DecodedToken;

export const getAccount = async (): Promise<AccountProfile> => {
  if (await isEmptySession()) {
    return {
      id: NIL_UUID,
      email: '',
      firstName: '',
      lastName: '',
      avatar: '',
    };
  }

  const token = await getToken();
  identityData = jwtDecode<DecodedToken>(token!);

  return {
    id: identityData.sub,
    email: identityData.email,
    firstName: identityData.given_name,
    lastName: identityData.family_name,
    avatar: identityData.picture,
  };
}

export const broName = async (): Promise<string | undefined> => {
  if (await isEmptySession()) return;

  const token = await getToken();
  identityData = jwtDecode<DecodedToken>(token!);

  return isEmpty(identityData.given_name) ? identityData.email : identityData.given_name;
};