'use client';

import { ReactNode } from 'react';
import { deletePlace } from '@/actions/place/delete';

export default function DeletePlaceButton({ id, onClick }: { id: string, onClick: Function }): ReactNode {
  
  return (
    <button className="btn btn-error" onClick={() => deletePlace(id)}>Delete</button>
  );
}