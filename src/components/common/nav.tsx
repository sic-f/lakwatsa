import { ReactNode } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { hasSession, isEmptySession } from '@/services/session';
import { getAccount, broName } from '@/services/identity';
import { logout } from '@/actions/account/authentication';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBuilding } from '@fortawesome/free-regular-svg-icons';

export default async function Nav() {
  async function renderLogoutLink(): Promise<ReactNode> {
    if (await isEmptySession()) return;

    return <Link href="/#" onClick={logout} className="mx-8">Logout</Link>;
  }

  async function renderProfileLink(): Promise<ReactNode> {
    if (await isEmptySession()) return;

    return <Link href="/account" className="ml-8">Account</Link>
  }

  async function renderBroPage(): Promise<ReactNode> {
    if (await isEmptySession()) return;

    return <Link href={`/${(await getAccount()).id}`} className="ml-8">Hi {`${await broName()}`}</Link>
  }

  async function renderAccountRelatedLinks(): Promise<ReactNode> {
    if (await hasSession()) return;

    return (
      <div>
        <Link href="/register">Create Account</Link>
        <Link href="/login" className="mx-8">Sign In</Link>
      </div>
    );
  }

  async function renderAddPlaceLink(): Promise<ReactNode> {
    if (await isEmptySession()) return;

    return (
      <Link href="/places/submit" className="flex">
        <FontAwesomeIcon icon={faBuilding} className="mr-1.5 size-[1.2em]" />
        Add Place
      </Link >
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
        {await renderAddPlaceLink()}
        {await renderAccountRelatedLinks()}
        {await renderBroPage()}
        {await renderProfileLink()}
        {await renderLogoutLink()}
      </div>
    </nav>
  )
}