'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

type Props = {
  saveableId: string;
  saveableName: string;
  caption: string;
  bookmarkId: string | null;
  onBookmark: Function;
  onUnsave: Function;
  saveableUrl: string;
};

export default function BookmarkAction({
  saveableId,
  saveableName,
  caption,
  bookmarkId: savedId,
  onBookmark,
  onUnsave,
  saveableUrl,
}: Props): ReactNode {
  const [bookmarkId, setBookmarkId] = useState<string | null>(savedId);
  const [isToast, setIsToast] = useState<boolean>(false);

  function renderToast() {
    setTimeout(() => setIsToast(false), 4000);

    return (
      <div className="toast z-1">
        <div className="alert alert-info">
          {bookmarkId ? (
            <span>
              {saveableName} saved 🔖. View in{' '}
              <Link href="/bookmarks">
                <u>bookmarks</u>
              </Link>
            </span>
          ) : (
            <span>Unsaved ✖️</span>
          )}
        </div>
      </div>
    );
  }

  async function handleClick(
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): Promise<undefined> {
    if (!bookmarkId) {
      const id: string = await onBookmark(saveableId, saveableUrl);
      setBookmarkId(id);
      setIsToast(true);
    } else {
      await onUnsave(bookmarkId);
      setBookmarkId(null);
      setIsToast(true);
    }
  }

  function renderBookmarkIcon(): ReactNode {
    if (!!bookmarkId) {
      return (
        <FontAwesomeIcon icon={faBookmarkSolid} className="cursor-pointer" />
      );
    } else {
      return <FontAwesomeIcon icon={faBookmark} className="cursor-pointer" />;
    }
  }

  return (
    <>
      <div className="tooltip tooltip-left" onClick={handleClick}>
        <div className="tooltip-content">
          <div className="-rotate-10 animate-bounce text-2xl font-black text-orange-400">
            {caption}
          </div>
        </div>
        {renderBookmarkIcon()}
      </div>
      {isToast && renderToast()}
    </>
  );
}
