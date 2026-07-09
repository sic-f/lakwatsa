import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

export default function BackAction({ url, classNames }: { url: string, classNames: string }) {
  return (
    <Link href={url} className={classNames}>
      <FontAwesomeIcon icon={faAnglesLeft} className="inline mr-1 size-[1.2em]" />
      <span>back</span>
    </Link>
  );
}