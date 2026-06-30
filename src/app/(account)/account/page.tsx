import Avatar from './avatar';
import Form from './form';
import PasswordForm from './password-form';
import { AccountProfile } from '@/interfaces/account';
import { getAccount, broName } from '@/services/identity';
import { AccountProfile as Account } from '@/constants/account-profile';

export default async function Profile() {
  const account: AccountProfile = await getAccount();

  function avatarImage(): string {
    return account.avatar === '' ? Account.BlankAvatar : account.avatar!;
  }
  
  return (
    <div className="flex justify-center">
      <div className="card card-side bg-base-100 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">Hi {`${await broName()}`}</h2>
          <p>{account.email}</p>
          <Avatar avatar={avatarImage()} />
          <Form accountData={account} />
          <PasswordForm id={account.id} />
        </div>
      </div>
    </div>
  );
}