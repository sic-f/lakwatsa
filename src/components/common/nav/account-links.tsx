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
    return avatar === '' ? AccountProfile.BlankThumb : avatar;
  }

  return (
    <div className="dropdown dropdown-end">
      <button
        className="btn btn-ghost btn-circle avatar"
        popoverTarget="account"
        style={{ anchorName: '--account-1' }}
      >
        <div className="w-10 rounded-full">
          <Image
            alt="Account related dropdown links"
            src={await getAvatar()}
            width={48}
            height={48}
          />
        </div>
      </button>
      <ul
        tabIndex={-1}
        popover="auto"
        id="account"
        className="dropdown menu rounded-box bg-base-100 w-52 shadow-sm"
        style={{ positionAnchor: '--account-1' }}
      >
        <li>
          <Link href="/account" className="justify-between">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/bookmarks" className="justify-between max-sm:hidden">
            Bookmarks
          </Link>
        </li>
        <li>
          <Link href="/#" onClick={logout}>
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}
