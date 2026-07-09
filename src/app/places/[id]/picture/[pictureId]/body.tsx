import { ReactNode } from 'react';
import { isEmpty } from 'lodash';

export default function Body({ caption }: { caption: string; }): ReactNode {
  return (
    <div className="card bg-base-100">
      <div className="card-body">
        <p>{isEmpty(caption) ? 'No caption.' : caption}</p>
      </div>
    </div>
  );
}