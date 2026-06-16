import Link from "next/link";
import { hasSession } from "@/services/session";
import { ReactNode } from "react";

export default async function SessionLinks(): Promise<ReactNode | undefined> {
  if (await hasSession()) return;

  return (
    <div>
      <Link href="/register">Create Account</Link>
      <Link href="/login" className="mx-8">Sign In</Link>
    </div>
  );
}