'use client';

import { ReactNode, useState } from 'react';
import { bookmark, unsave } from '@/actions/bookmark/bookmark';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as faBookmarkSolid } from '@fortawesome/free-solid-svg-icons';

export default function BookmarkAction({
  placeId,
  caption,
  bookmarkId: savedPlaceId,
}: {
  placeId: string;
  caption: string;
  bookmarkId: string | null;
}): ReactNode {
  const [bookmarkId, setBookmarkId] = useState<string | null>(savedPlaceId);
  const [isToast, setIsToast] = useState<boolean>(false);

  function renderToast() {
    setTimeout(() => setIsToast(false), 5000);

    return (
      <div className="toast z-1">
        <div className="alert alert-info">
          <span>{bookmarkId ? 'Place saved' : 'Unsaved'}</span>
        </div>
      </div>
    );
  }

  async function handleClick(
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ): Promise<undefined> {
    if (!bookmarkId) {
      const id: string = await bookmark(placeId);
      setBookmarkId(id);
      setIsToast(true);
    } else {
      await unsave(bookmarkId);
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
      <div className="tooltip" onClick={handleClick}>
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
