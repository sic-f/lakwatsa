'use server';

import { AccountProfile } from '@/constants/account-profile';
import { Error as AccountError } from '@/interfaces/error';
import { AccountProfileForm } from '@/interfaces/account';
import { getAccount } from '@/services/identity';
import { getToken, setSession } from '@/services/session';
import { parseErrors } from '@/services/parse-errors';
import { refreshToken } from '@/services/session/refresh-token';
import { catchSession } from '@/services/session/catch-session';

export async function updateAccount(state: AccountProfileForm, formData: FormData): Promise<AccountProfileForm> {
  await refreshToken();
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${state.id}`,
    {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      }),
      body: JSON.stringify({
        email: formData.get('email'),
        firstName: formData.get('firstName'),
        lastName: formData.get('lastName')
      }),
    }
  );
  
  if (!response.ok) {
    const errorsResponse = await response.json();
    const errors: AccountError = await parseErrors(errorsResponse.errors);

    return {
      id: state.id,
      email: formData.get('email')?.toString(),
      firstName: formData.get('firstName')?.toString(),
      lastName: formData.get('lastName')?.toString(),
      errors: errors,
    };
  }

  const data = await response.json();

  await setSession(data.token);

  const identity = await getAccount();

  return {
    id: state.id,
    email: identity.email,
    firstName: identity.firstName,
    lastName: identity.lastName,
    message: data.message,
  };
};

export async function updateAvatar(state: { message?: string; errors?: string; } | undefined, formData: FormData) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/update-avatar`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'PUT',
      headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
      body: formData
    };
  }

  let response = await fetch(url, await options());
  response = await catchSession(response, options);
  
  if (response.ok) {
    const data = await response.json();

    await setSession(data.token);

    return { message: data.message };
  } else {
    const data = await response.json();

    return { errors: data.errors }
  }
}

export async function deleteAvatar(): Promise<{ avatar: string, message: string }> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/delete-avatar`;
  async function options(): Promise<RequestInit> {
    return {
      method: 'DELETE',
      headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
    };
  }

  let response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (response.ok) {
    const data = await response.json();

    await setSession(data.token);

    return { message: 'Deleted avatar.', avatar: AccountProfile.BlankAvatar }
  } else {
    throw new Error('Error deleting avatar.');
  }
}