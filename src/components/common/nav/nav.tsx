import { ReactNode } from 'react';
import BrandLogo from './brand-logo';
import Links from './links';

export default async function Nav(): Promise<ReactNode> {
  return (
    <nav className="navbar bg-base-100 fixed top-0 shadow-sm">
      <BrandLogo />
      <Links />
    </nav>
  );
}
