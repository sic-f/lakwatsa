import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackAction() {
  return (
    <Link href="/" className="block ml-8 mb-8 md:flex items-center max-h-1 mt-12 mr-4">
      <FontAwesomeIcon icon={faAnglesLeft} className="inline mr-1 size-[1.2em]" />
      <span>back</span>
    </Link>
  );
}