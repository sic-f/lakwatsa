import { isEmptySession } from '@/services/session';
import { broName } from '@/services/identity';

export default async function Greeting() {
  if (await isEmptySession()) return;

  return <p className="mr-3 hidden">Hi {await broName()}😁</p>;
}
