'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

export default function DeletePlaceButton({ id, onClick }: { id: string, onClick: Function }): ReactNode {
  return (
    <Link className="btn btn-error" href="#" onClick={() => onClick(id)}>Delete</Link>
  );
}