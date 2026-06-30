import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AccountProfile } from '@/constants/account-profile';
import { isEmptySession } from '@/services/session';
import { getAccount } from '@/services/identity';
import { logout } from '@/actions/account/authentication';

export default async function AccountLinks(): Promise<ReactNode | undefined> {
  if (await isEmptySession()) return;

  async function getAvatar() {
    const avatar = (await getAccount()).avatar;
    return avatar === "" ? AccountProfile.BlankAvatar : avatar;
  }

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <Image
            alt="Account related dropdown links"
            src={await getAvatar()}
            width={64}
            height={64}
          />
        </div>
      </div>
      <ul
        tabIndex={-1}
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          <Link href="/account" className="justify-between">
            Profile
          </Link>
        </li>
        <li><Link href="/#" onClick={logout}>Logout</Link></li>
      </ul>
    </div>
  );
}
