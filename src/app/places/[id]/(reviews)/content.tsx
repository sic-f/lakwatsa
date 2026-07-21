'use client';
import { ReactNode, useRef } from 'react';
import {
  ShowMore,
  ShowMoreRef,
  ShowMoreToggleLinesFn,
} from '@re-dev/react-truncate';
import { Expand, Less } from '@/components/common/truncate-client';

type Props = {
  content: string;
};

export default function Content({ content }: Props): ReactNode {
  const ref = useRef<ShowMoreRef>(null);

  function toggleLines(
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ): ShowMoreToggleLinesFn {
    ref.current?.toggleLines(e);
  }

  return (
    <div className="aura aura-silver">
      <div className="card bg-base-100">
        <div className="card-body">
          <ShowMore
            ref={ref}
            lines={20}
            more={<Expand onClick={toggleLines} />}
            less={<Less onClick={toggleLines} />}
            className="text-accent"
          >
            <p className="text-info cursor-default whitespace-pre-wrap">
              {content}
            </p>
          </ShowMore>
        </div>
      </div>
    </div>
  );
}
