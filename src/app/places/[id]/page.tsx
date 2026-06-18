'use client';

import { ReactNode, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { AfterTokenRefreshContext, Context } from '@/interfaces/session';
import { catchSession } from '@/services/session/catch-session';
import fetchPlace from '@/actions/place/fetch-place';

export default function Place(): Promise<ReactNode> {
  const path = usePathname();
  const id: string = path.split('/').slice(1)[1];
  const [place, setPlace] = useState({});

  useEffect(() => {
    async function fetch() {
      let result: Context | AfterTokenRefreshContext = await fetchPlace(id);
      result = await catchSession(result);

      if (!result.ok) throw new Error(`${result.status} ${result.statusText}`);

      setPlace(result.data);
    }

    fetch();
  }, [])

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{place?.name}</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}