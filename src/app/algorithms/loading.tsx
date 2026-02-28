export default function AlgorithmsLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <div className="h-8 w-48 bg-neutral-200 rounded animate-pulse" />
        <div className="mt-2 h-5 w-80 bg-neutral-100 rounded animate-pulse" />
      </div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-16 bg-neutral-100 rounded-lg animate-pulse" />
        ))}
      </div>
    </div>
  );
}
