'use server';

import { AccountProfile, AccountProfileForm, Error } from '@/interfaces/account';
import { getAccount } from '@/services/identity';
import { getToken, setSession } from '@/services/session';
import { parseErrors } from '@/services/parse-errors';

export async function updateAccount(state: AccountProfile, formData: FormData) : Promise<AccountProfileForm> {
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
    const errors: Error = await parseErrors(errorsResponse.errors);

    return {
      id: state.id,
      email: formData.get('email')?.toString()!,
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