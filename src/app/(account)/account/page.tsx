import Form from './form';
import PasswordForm from './password-form';
import { AccountProfile } from '@/interfaces/account';
import { getAccount, broName } from '@/services/identity';

export default async function Profile() {
  const account: AccountProfile = await getAccount();

  return (
    <div className="flex justify-center">
      <div className="card card-side bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Hi {`${await broName()}`}</h2>
          <p>{account.email}</p>
          <Form accountData={account} />
          <PasswordForm id={account.id} />
        </div>
      </div>
    </div>
  );
}