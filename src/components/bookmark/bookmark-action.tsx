import { ReactNode } from 'react';

export default function BookmarkAction({
  caption,
  children,
}: {
  caption: string;
  children: ReactNode;
}): ReactNode {
  return (
    <div className="tooltip">
      <div className="tooltip-content">
        <div className="-rotate-10 animate-bounce text-2xl font-black text-orange-400">
          {caption}
        </div>
      </div>
      <button className="" title="🏞 Click to view full size">
        {children}
      </button>
    </div>
  );
}
