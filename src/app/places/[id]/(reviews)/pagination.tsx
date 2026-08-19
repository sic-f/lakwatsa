import { ReactNode, useState } from 'react';
import classNames from 'classnames';

type Props = {
  pages: number;
  onClick: Function;
};

const NUMBER_OF_PLACES_TO_FETCH = 5;
const OFFSET = 5;

export default function Pagination({ pages, onClick }: Props): ReactNode {
  const [selectedPage, setSelectedPage] = useState<string>('page-0');

  function className(index: string): string {
    return classNames('join-item btn', {
      'btn-active': selectedPage === index,
    });
  }

  function renderPaginationNumbers(): ReactNode {
    let elements: React.JSX.Element[] = [];
    for (let i: number = 0; i < pages; i++) {
      elements.push(
        <button
          id={`page-${i}`}
          className={className(`page-${i}`)}
          onClick={(e) => {
            setSelectedPage(e.currentTarget.id);
            onClick(i, OFFSET, NUMBER_OF_PLACES_TO_FETCH);
          }}
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
