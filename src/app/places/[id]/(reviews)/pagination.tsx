import { ReactNode, useState } from 'react';
import classNames from 'classnames';

type Props = {
  pages: number;
  onClick: Function;
};

const NUMBER_OF_PLACES_TO_FETCH = 5;
const OFFSET = 5;

export default function Pagination({ pages, onClick }: Props): ReactNode {
  function renderPaginationNumbers(): ReactNode {
    const [isActive, setIsActive] = useState<boolean>(true);
    const className = classNames('join-item btn', { 'btn-active': isActive });

    let elements: React.JSX.Element[] = [];
    for (let i: number = 0; i < pages; i++) {
      elements.push(
        <button
          className={className}
          onClick={() => onClick(i, OFFSET, NUMBER_OF_PLACES_TO_FETCH)}
          key={i}
        >
          {i + 1}
        </button>,
      );
    }

    return elements;
  }

  return (
    <div className="join flex justify-center">{renderPaginationNumbers()}</div>
  );
}
