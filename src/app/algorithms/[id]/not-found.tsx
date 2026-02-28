import Link from 'next/link';

export default function AlgorithmNotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl font-bold text-neutral-900">Algorithm Not Found</h1>
      <p className="mt-4 text-neutral-600">
        The algorithm you are looking for does not exist or has been removed.
      </p>
      <div className="mt-8">
        <Link href="/algorithms" className="btn-primary">
          Browse Algorithms
        </Link>
      </div>
    </div>
  );
}
