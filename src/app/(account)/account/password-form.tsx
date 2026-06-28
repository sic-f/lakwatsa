'use client';

import { useActionState } from 'react';
import FieldError from '@/components/common/field-error';
import { changePassword } from '@/actions/account/change-password';
import { AccountError } from '@/constants/field-errors';

const PasswordForm = ({ id }: { id: string }) => {
  const [password, action] = useActionState(changePassword, { id });

  const renderSubmit = () => <button className="btn btn-neutral mt-4" type="submit">Change password</button>;

  const renderConfirmPasswordField = () => {
    return (
      <>
        <label className="label">Confirm Password</label>
        <input type="password" name="passwordConfirmation" className="input" placeholder="confirm new password" />
        <FieldError errors={password.errors} field={AccountError.PasswordConfirmation} />
      </>
    );
  };

  const renderPasswordField = () => {
    return (
      <>
        <label className="label">Password</label>
        <input type="password" name="password" className="input" placeholder="new password" />
        <FieldError errors={password.errors} field={AccountError.Password} />
      </>
    );
  };

  const renderOldPasswordField = () => {
    return (
      <>
        <label className="label">Old Password</label>
        <input type="password" name="oldPassword" className="input" placeholder="current password" />
        <FieldError errors={password.errors} field={AccountError.PasswordMismatch} />
      </>
    );
  };

  const renderMessage = () => <p className="text-green-400">{password.message}</p>
  
  const renderHeader = () => <legend className="fieldset-legend text-3xl">Change password</legend>;

  return (
    <form className="flex justify-center items-center" action={action}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
        {renderHeader()}
        {renderMessage()}
        {renderOldPasswordField()}
        {renderPasswordField()}
        {renderConfirmPasswordField()}
        {renderSubmit()}
      </fieldset>
    </form >
  );
}

export default PasswordForm;