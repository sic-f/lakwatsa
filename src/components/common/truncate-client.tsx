import { ShowMoreToggleLinesFn } from '@re-dev/react-truncate';

type Props = {
  onClick: (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
  ) => ShowMoreToggleLinesFn;
};

export function Expand({ onClick }: Props) {
  return (
    <a href="#" className="text-secondary" onClick={onClick}>
      &nbsp;read more
    </a>
  );
}

export function Less({ onClick }: Props) {
  return (
    <a href="#" className="text-secondary" onClick={onClick}>
      &nbsp;show less
    </a>
  );
}
