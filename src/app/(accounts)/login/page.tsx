'use client';

import { useActionState } from 'react';
import { AccountError as FieldError } from '@/constants/field-errors';
import { login } from '@/actions/account/authentication';
import { isEmpty } from 'lodash';

export default function Login() {
  const [account, action] = useActionState(login, undefined);

  function renderMultipleErrors(errors: string[]) {
    return errors.map((error, index) => {
      return <p className="text-red-400" key={index}>{error}</p>;
    });
  }

  function renderFieldError(field: string) {
    if (isEmpty(account?.errors) || isEmpty(account.errors[field])) return;

    if (account.errors[field].length > 1) {
      return renderMultipleErrors(account.errors[field]);
    }

    return <p className="text-red-400">{account.errors[field][0]}</p>;
  }

  function renderSubmit() {
    return <button className="btn btn-neutral mt-4" type="submit">Login</button>;
  }

  function renderPasswordField() {
    return (
      <>
        <label className="label">Password</label>
        <input type="password" name="password" className="input" />
        {renderFieldError(FieldError.Password)}
      </>
    );
  }

  function renderEmailField() {
    return (
      <>
        <label className="label">Email</label>
        <input type="email" name="email" className="input" />
        {renderFieldError(FieldError.Email)}
      </>
    );
  }

  function renderForm() {
    return (
      <>
        {renderEmailField()}
        {renderPasswordField()}
        {renderSubmit()}
      </>
    );
  }

  function renderLoginError() {
    if (isEmpty(account)) return;

    return <p className="text-red-400" role="alert">{account.message}</p>;
  }

  function renderHeader() {
    return <legend className="fieldset-legend text-3xl">Sign In</legend>;
  }

  return (
    <form className="flex h-screen justify-center items-center" action={action}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        {renderHeader()}
        {renderLoginError()}
        {renderForm()}
      </fieldset>
    </form>
  );
}