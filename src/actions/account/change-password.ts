'use server';

import { ChangePasswordForm } from '@/interfaces/account';
import { getToken } from '@/services/session';
import { parseErrors } from '@/services/parse-errors';
import { isEmpty } from 'lodash';
import { catchSession } from '@/services/session/catch-session';

export async function changePassword(state: { id: string }, formData: FormData): Promise<ChangePasswordForm> {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/accounts/${state.id}/password`;
  async function options() {
    return {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getToken()}`,
      }),
      body: JSON.stringify({
        oldPassword: formData.get('oldPassword'),
        password: formData.get('password'),
        passwordConfirmation: formData.get('passwordConfirmation'),
      }),
    };
  }

  let response = await fetch(url, await options());
  response = await catchSession(response, options);

  if (!response.ok) {
    const errorsResponse = await response.json();

    if (isEmpty(errorsResponse.errors)) {
      return { id: state.id, message: errorsResponse.message }
    } else {
      const errors = await parseErrors(errorsResponse.errors);

      const data = { id: state.id, errors: errors };

      return data;
    }
  }

  const data = await response.json();

  return data;
}