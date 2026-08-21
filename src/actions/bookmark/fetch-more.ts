'use server';

import { getToken } from '@/services/session';
import { catchSession } from '@/services/session/catch-session';

type Props = {
  offset: string;
  limit: number;
  routePath: string;
  authorize?: boolean | undefined;
};

export async function fetchMore({
  offset,
  limit: noOfResourcesToFetch,
  routePath,
  authorize,
}: Props): Promise<any[]> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${routePath}?offset=${offset}&limit=${noOfResourcesToFetch}`;
  let response: Response;

  if (authorize) {
    async function options(): Promise<RequestInit> {
      return {
        headers: new Headers({ Authorization: `Bearer ${await getToken()}` }),
      };
    }

    response = await fetch(url, await options());
    response = await catchSession(response, options);
  } else {
    response = await fetch(url);
  }

  if (!response.ok)
    throw new Error(`${response.status} ${response.statusText}`);

  return await response.json();
}
