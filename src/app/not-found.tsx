import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="text-6xl font-bold text-neutral-900">404</h1>
      <p className="mt-4 text-xl text-neutral-600">Page not found</p>
      <p className="mt-2 text-neutral-500">
        The page you are looking for does not exist or has been moved.
      </p>
      <div className="mt-8">
        <Link href="/" className="btn-primary">
          Go Home
        </Link>
      </div>
    </div>
  );
}
