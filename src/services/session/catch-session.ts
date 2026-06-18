'use server';

import { HttpStatusCode } from "@/constants/http-status-codes";
import { getToken } from "../session";
import { refreshToken } from "./refresh-token";
import { AfterTokenRefreshContext, Context } from "@/interfaces/session";

export async function catchSession(context: Context): Promise<Context | AfterTokenRefreshContext> {
  if (context.status !== HttpStatusCode.Unauthorized) return context;

  await refreshToken({ clientCheck: false });

  context.options.headers = [[ 'authorization', `Bearer ${await getToken()}` ]];

  const response = await fetch(context.url, context.options);

  const data = await response.json();

  const result = { data: data, ok: response.ok, status: response.status, statusText: response.statusText };

  return result;
}