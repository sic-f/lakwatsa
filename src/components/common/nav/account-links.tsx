import { ReactNode } from 'react';
import Link from 'next/link';
import { isEmptySession } from '@/services/session';
import { logout } from '@/actions/account/authentication';

export default async function AccountLinks(): Promise<ReactNode | undefined> {
  if (await isEmptySession()) return;

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Account related dropdown links"
            src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
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
