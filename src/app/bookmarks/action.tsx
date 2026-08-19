import { ReactNode } from 'react';
import PlaceAction from './place-action';
import ReviewAction from './review-action';
import { Bookmark } from '@/constants/bookmark';

type Props = {
  kind: string;
  saveableId: string;
};

export default function Action({ kind, saveableId }: Props): ReactNode {
  function renderAction(): ReactNode {
    if (kind === Bookmark.Place) {
      return <PlaceAction saveableId={saveableId} />;
    }

    if (kind === Bookmark.Review) {
      return <ReviewAction saveableId={saveableId} />;
    }
  }

  return <div className="card-actions">{renderAction()}</div>;
}
