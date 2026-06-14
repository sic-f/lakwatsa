'use client';

import { useActionState } from 'react';
import { AccountProfile, AccountProfileForm } from '@/interfaces/account';
import { AccountError } from '@/constants/account-error';
import { updateAccount } from '@/actions/account/update';
import { isEmpty } from 'lodash';

const Form = ({ accountData }: { accountData: AccountProfile }) => {
  const [account, action] = useActionState(updateAccount, accountData as AccountProfileForm);

  const renderErrorField = (field: string) => {
    if (isEmpty(account.errors) || isEmpty(account.errors[field])) return;

    return <p className="text-red-400">{account.errors[field][0]}</p>;
  }

  const renderSubmit = () => <button className="btn btn-neutral mt-4" type="submit">Update</button>;

  const renderLastNameField = () => {
    return (
      <>
        <label className="label">Last name</label>
        <input type="text" name="lastName" className="input" defaultValue={account.lastName ?? undefined} />
      </>
    );
  }

  const renderFirstNameField = () => {
    return (
      <>
        <label className="label">First name</label>
        <input type="text" name="firstName" className="input" defaultValue={account.firstName ?? undefined} />
      </>
    );
  }

  const renderEmailField = () => {
    return (
      <>
        <label className="label">Email</label>
        <input type="email" name="email" className="input" defaultValue={account.email} />
        {renderErrorField(AccountError.Email)}
      </>
    );
  }

  const renderMessage = () => <p className="text-green-400">{account.message}</p>

  const renderHeader = () => <legend className="fieldset-legend text-3xl">Account info</legend>;

  return (
    <>
      <form action={action} className="flex justify-center items-center">
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          {renderHeader()}
          {renderMessage()}
          {renderEmailField()}
          {renderFirstNameField()}
          {renderLastNameField()}
          {renderSubmit()}
        </fieldset>
      </form>
    </>
  );
}

export default Form;