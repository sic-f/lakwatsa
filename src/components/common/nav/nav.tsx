import BrandLogo from './brand-logo';
import Links from './links';

export default async function Nav() {
  return (
    <nav className="navbar fixed top-0 bg-base-100 shadow-sm">
      <BrandLogo />
      <Links />
    </nav>
  )
}