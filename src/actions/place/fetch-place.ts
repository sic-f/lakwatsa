'use server';

import { HttpStatusCode } from "@/constants/http-status-codes";
import { Context, Options } from "@/interfaces/session";
import { getToken } from "@/services/session";

export default async function fetchPlace(id: string): Promise<Context> {
  const url: string = `${process.env.NEXT_PUBLIC_API_BASE_URL}/places/${id}`;
  const options: Options = { method: 'GET', headers: new Headers({ Authorization: `Bearer ${await getToken()}` }) };

  const response = await fetch(url, options);

  if (response.status === HttpStatusCode.Unauthorized) {
    const result = { ok: response.ok, status: response.status, statusText: response.statusText, url: url, options: options }

    return result;
  }

  const data = await response.json();

  const result = { data: data, ok: response.ok, status: response.status, statusText: response.statusText, url: url, options: options }

  return result;
}