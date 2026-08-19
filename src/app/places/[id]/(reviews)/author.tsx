import { ReactNode } from 'react';

type Props = {
  name: string;
  nameClassName: string;
};

export default function Author({ name, nameClassName }: Props): ReactNode {
  return (
    <small className="text-primary-content text-1px cursor-default">
      by&nbsp;
      <span className={nameClassName}>{name}</span>
    </small>
  );
}
