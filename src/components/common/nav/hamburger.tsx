import { ReactNode } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default async function Hamburger(): Promise<ReactNode> {
  return (
    <div className="md:hidden">
      <button
        className="btn"
        popoverTarget="popover-1"
        style={{ anchorName: '--anchor-1' } /* as React.CSSProperties */}
      >
        <FontAwesomeIcon icon={faBars} />
      </button>

      <ul
        className="dropdown menu rounded-box bg-base-100 w-52 shadow-sm"
        popover="auto"
        id="popover-1"
        style={{ positionAnchor: '--anchor-1' } /* as React.CSSProperties */}
      >
        <li>
          <Link href="/bookmakrs">Bookmarks</Link>
        </li>
      </ul>
    </div>
  );
}
