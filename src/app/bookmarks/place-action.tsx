import Link from 'next/link';

type Props = {
  saveableId: string;
};

export default function PlaceAction({ saveableId }: Props) {
  return (
    <Link className="btn btn-primary" href={`/places/${saveableId}`}>
      View ➡️
    </Link>
  );
}
