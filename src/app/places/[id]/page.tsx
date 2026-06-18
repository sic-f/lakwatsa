'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getToken } from '@/services/session';
import { usePathname } from 'next/navigation';
import { catchSession } from '@/services/session/catch-session';
import { HttpStatusCode } from '@/constants/http-status-codes';

export default function Place(): Promise<ReactNode> {
  const path = usePathname();
  const id = path.split('/').slice(1)[1];
  const [place, setPlace] = useState({ name: '(...fetching name)' });

  useEffect(() => {
    async function fetchPlace() {
      const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`;
      const options: {} = { method: 'GET', headers: new Headers({ Authorization: `Bearer ${await getToken()}` }) };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`,
        {
          method: 'GET',
          headers: new Headers({ Authorization: `Bearer ${await getToken()}` })
        }
      );

      if (response.status === HttpStatusCode.Unauthorized) {
        const result = await catchSession(url, options);

        if (!result.ok) throw new Error(`${result.status} ${result.statusText}`);

        return setPlace(result.data);
      }

      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);
      
      const data = await response.json();

      setPlace(data);
    }

    fetchPlace();

  }, [])

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img
          src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
          alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{place.name}</h2>
        <p>A card component has a figure, a body part, and inside body there are title and actions parts</p>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Buy Now</button>
        </div>
      </div>
    </div>
  );
}