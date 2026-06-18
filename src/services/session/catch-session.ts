'use server';

import { getToken } from "../session";
import { refreshToken } from "./refresh-token";

export async function catchSession(url: string, options) {
  await refreshToken();

  options.headers = [['authorization', `Bearer ${await getToken()}`]];

  const response = await fetch(url, options);

  const data = await response.json();

  const result = { data: data, ok: response.ok, status: response.status, statusText: response.statusText };

  return result;
}