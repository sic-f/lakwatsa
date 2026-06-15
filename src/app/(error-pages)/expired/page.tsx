import Link from 'next/link';
 
export default function Expired() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-2">
      <i className="fa-solid fa-face-frown"></i>
      <h2 className="text-xl font-semibold">Access expired.</h2>
      <p>Acess tokens have expired. Please sign in again.</p>
      <Link
        href="/login"
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        Login
      </Link>
    </main>
  );
}