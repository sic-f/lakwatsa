'use server';

import { Token } from "@/interfaces/session";
import { getToken } from "../session";
import { jwtDecode } from "jwt-decode";
import dayjs, { Dayjs } from "dayjs";

export async function tokenExpiry(): Promise<Dayjs> {
  return dayjs.unix(await getTokenExpiryRaw());
}

export async function getTokenExpiryRaw(): Promise<number> {
  return jwtDecode<Token>((await getToken())!).exp;
}
