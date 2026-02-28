export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
          <div className="text-sm text-neutral-500">
            Crucible - PQC Algorithm Benchmark Arena
          </div>
          <div className="flex space-x-6">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-neutral-500 hover:text-neutral-700"
            >
              GitHub
            </a>
            <a
              href="/about"
              className="text-sm text-neutral-500 hover:text-neutral-700"
            >
              About
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
