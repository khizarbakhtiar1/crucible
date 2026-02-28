export default function AlgorithmDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-8 w-64 bg-neutral-200 rounded animate-pulse" />
        <div className="mt-2 h-5 w-40 bg-neutral-100 rounded animate-pulse" />
        <div className="mt-4 h-16 w-full bg-neutral-100 rounded animate-pulse" />
      </div>
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-24 bg-neutral-100 rounded-lg animate-pulse" />
        ))}
      </div>
      <div className="h-64 bg-neutral-100 rounded-lg animate-pulse" />
    </div>
  );
}
