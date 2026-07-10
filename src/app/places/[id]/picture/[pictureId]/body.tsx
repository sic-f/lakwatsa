import { ReactNode } from 'react';
import { isEmpty } from 'lodash';

export default function Body({ caption }: { caption: string }): ReactNode {
  return (
    <div className="card bg-base-100">
      <div className="card-body whitespace-pre-wrap">
        <p>{isEmpty(caption) ? 'No caption.' : caption}</p>
      </div>
    </div>
  );
}
