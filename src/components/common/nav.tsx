import Link from 'next/link';
import Image from 'next/image';
import { logout } from '@/actions/account/authentication';
import { getAccount, broName } from '@/services/identity';
import { hasSession, isEmptySession } from '@/services/session';

export default async function Nav() {
  async function renderLogoutLink() {
    if (await isEmptySession()) return;

    return <Link href="/#" onClick={logout} className="mx-8">Logout</Link>;
  }

  async function renderProfileLink() {
    if (await isEmptySession()) return;

    return <Link href="/account" className="ml-8">Account</Link>
  }

  async function renderBroPage() {
    if (await isEmptySession()) return;

    return <Link href={`/${(await getAccount()).id}`}>Hi {`${await broName()}`}</Link>
  }

  async function renderAccountRelatedLinks() {
    if (await hasSession()) return;

    return (
      <div>
        <Link href="/register">Create Account</Link>
        <Link href="/login" className="mx-8">Sign In</Link>
      </div>
    );
  }

  return (
    <nav className="navbar fixed top-0 bg-primary">
      <div className="navbar-start">
        <Link href="/" className="ml-3 text-primary-content text-lg">
          <Image src="https://picsum.photos/48" width={48} height={48} alt="Brand logo" className="inline mr-2" />
          Gala
        </Link>
      </div>
      <div className="navbar-end">
        {renderAccountRelatedLinks()}
        {renderBroPage()}
        {renderProfileLink()}
        {renderLogoutLink()}
      </div>
    </nav>
  )
}