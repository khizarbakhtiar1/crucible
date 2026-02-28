import Link from 'next/link';

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <section className="text-center py-16">
        <h1 className="text-4xl font-bold text-neutral-900 sm:text-5xl">
          Crucible
        </h1>
        <p className="mt-4 text-xl text-neutral-600 max-w-2xl mx-auto">
          The open benchmark arena for Post-Quantum Cryptography algorithms.
          Submit, test, and compare implementations with reproducible results.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/algorithms" className="btn-primary">
            View Leaderboard
          </Link>
          <Link href="/submit" className="btn-secondary">
            Submit Algorithm
          </Link>
        </div>
      </section>

      {/* What is Crucible */}
      <section className="py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
          What is Crucible?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              Standardized Benchmarking
            </h3>
            <p className="text-neutral-600">
              Run your PQC implementations against a consistent benchmark suite. 
              Compare key generation, signing, verification times, and memory usage 
              across different algorithms and categories.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              Reproducible Results
            </h3>
            <p className="text-neutral-600">
              Every benchmark run is recorded with full environment details.
              Results can be verified and reproduced by anyone, with cryptographic
              hashes ensuring data integrity.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">
              Community Driven
            </h3>
            <p className="text-neutral-600">
              Built for the cryptography research community. Submit your implementations,
              contribute to the benchmark suite, and help advance the state of 
              post-quantum security.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
          Algorithm Categories
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            { name: 'Lattice-based', desc: 'CRYSTALS-Kyber, CRYSTALS-Dilithium, NTRU, Falcon' },
            { name: 'Code-based', desc: 'Classic McEliece, BIKE, HQC' },
            { name: 'Hash-based', desc: 'SPHINCS+, XMSS, LMS' },
            { name: 'Isogeny-based', desc: 'SIKE, SIDH variants' },
            { name: 'Multivariate', desc: 'Rainbow, GeMSS, MQDSS' },
          ].map((category) => (
            <div
              key={category.name}
              className="border border-neutral-200 rounded-lg p-4 bg-white"
            >
              <h3 className="font-medium text-neutral-900">{category.name}</h3>
              <p className="mt-1 text-sm text-neutral-500">{category.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
          How It Works
        </h2>
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
              1
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">Submit Your Implementation</h3>
              <p className="mt-1 text-neutral-600">
                Upload your PQC algorithm source code with metadata about the category,
                language, and version.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
              2
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">Automated Benchmarking</h3>
              <p className="mt-1 text-neutral-600">
                Our system compiles and runs your code in isolated environments,
                measuring performance across multiple metrics.
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-neutral-900 text-white flex items-center justify-center text-sm font-medium">
              3
            </div>
            <div>
              <h3 className="font-medium text-neutral-900">Compare and Iterate</h3>
              <p className="mt-1 text-neutral-600">
                View your results on the leaderboard, compare against other implementations,
                and submit improved versions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 border-t border-neutral-200">
        <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
          Benchmark Metrics
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="border border-neutral-200 rounded-lg p-4 bg-white">
            <h3 className="font-medium text-neutral-900">Performance</h3>
            <ul className="mt-2 text-sm text-neutral-600 space-y-1">
              <li>Key generation time (microseconds)</li>
              <li>Signing / Encapsulation time</li>
              <li>Verification / Decapsulation time</li>
            </ul>
          </div>
          <div className="border border-neutral-200 rounded-lg p-4 bg-white">
            <h3 className="font-medium text-neutral-900">Memory</h3>
            <ul className="mt-2 text-sm text-neutral-600 space-y-1">
              <li>Peak memory usage (KB)</li>
              <li>Stack usage</li>
              <li>Heap allocations</li>
            </ul>
          </div>
          <div className="border border-neutral-200 rounded-lg p-4 bg-white">
            <h3 className="font-medium text-neutral-900">Key Sizes</h3>
            <ul className="mt-2 text-sm text-neutral-600 space-y-1">
              <li>Public key size (bytes)</li>
              <li>Secret key size (bytes)</li>
              <li>Signature / Ciphertext size</li>
            </ul>
          </div>
          <div className="border border-neutral-200 rounded-lg p-4 bg-white">
            <h3 className="font-medium text-neutral-900">Environment</h3>
            <ul className="mt-2 text-sm text-neutral-600 space-y-1">
              <li>CPU model and core count</li>
              <li>Operating system version</li>
              <li>Compiler and optimization flags</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
