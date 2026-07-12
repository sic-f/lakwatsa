'use client';

import { useActionState } from 'react';
import { AccountError } from '@/constants/field-errors';
import { register } from '@/actions/account/register';
import { isEmpty } from 'lodash';

export default function CreateAccount() {
  const [account, action] = useActionState(register, undefined);

  function renderMultipleErrors(errors: string[]) {
    return errors.map((error, index) => {
      return (
        <p className="text-red-400" key={index}>
          {error}
        </p>
      );
    });
  }

  function renderErrorField(field: string) {
    if (isEmpty(account?.errors) || isEmpty(account.errors[field])) return;

    if (account.errors[field].length > 1) {
      renderMultipleErrors(account.errors[field]);
    }

    return <p className="text-red-400">{account.errors[field][0]}</p>;
  }

  function renderSubmit() {
    return (
      <button className="btn btn-neutral mt-4" type="submit">
        Register
      </button>
    );
  }

  function renderPasswordConfirmField() {
    return (
      <>
        <label className="label">Confirm Password</label>
        <input type="password" name="passwordConfirmation" className="input" />
        {renderErrorField(AccountError.PasswordConfirmation)}
      </>
    );
  }

  function renderPasswordField() {
    return (
      <>
        <label className="label">Password</label>
        <input type="password" name="password" className="input" />
        {renderErrorField(AccountError.Password)}
      </>
    );
  }

  function renderEmailField() {
    return (
      <>
        <label className="label">Email</label>
        <input type="email" name="email" className="input" />
        {renderErrorField(AccountError.Email)}
      </>
    );
  }

  function renderHeader() {
    return <legend className="fieldset-legend text-3xl">Create Account</legend>;
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Sali na!</h1>
          <p className="py-6">
            'Bat di ka mag-submit ng mga lugar na alam mo, para sa ating mga
            kapwa gala 😜
          </p>
          <p>
            (Why not join and submit places you know, to benefit other
            travellers 🚤)
          </p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body"></div>
          <form
            className="flex items-center justify-center pb-12"
            action={action}
          >
            <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
              {renderHeader()}
              {renderEmailField()}
              {renderPasswordField()}
              {renderPasswordConfirmField()}
              {renderSubmit()}
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
}
