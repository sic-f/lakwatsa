import { ReactNode } from 'react';
import { hasSession } from '@/services/session';
import Link from 'next/link';

export default async function SessionLinks(): Promise<ReactNode | undefined> {
  if (await hasSession()) return;

  return (
    <div>
      <Link href="/register">Create Account</Link>
      <Link href="/login" className="mx-8">Sign In</Link>
    </div>
  );
}