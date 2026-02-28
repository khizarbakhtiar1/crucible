export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">About Crucible</h1>
      </div>

      <div className="prose prose-neutral max-w-none">
        <section className="mb-8">
          <h2 className="text-xl font-medium text-neutral-900 mb-4">The Problem</h2>
          <p className="text-neutral-700 mb-4">
            As quantum computing advances, the cryptographic algorithms that protect our digital 
            infrastructure are at risk. The transition to post-quantum cryptography (PQC) is 
            not just inevitable—it is urgent.
          </p>
          <p className="text-neutral-700">
            However, comparing PQC implementations is difficult. Benchmarks are scattered across 
            papers, run on different hardware, and use inconsistent methodologies. There is no 
            standardized, incentivized platform for the cryptography community to submit and 
            compare implementations.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium text-neutral-900 mb-4">The Solution</h2>
          <p className="text-neutral-700 mb-4">
            Crucible provides a neutral ground for PQC algorithm benchmarking. Researchers can 
            submit implementations, run automated benchmarks in controlled environments, and 
            compare results on a public leaderboard.
          </p>
          <ul className="list-disc pl-6 text-neutral-700 space-y-2">
            <li>Standardized benchmark suite measuring speed, memory, and key sizes</li>
            <li>Reproducible results with full environment documentation</li>
            <li>Cryptographic hashes for result integrity</li>
            <li>On-chain anchoring for immutable records (optional)</li>
            <li>Open source and community-driven</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium text-neutral-900 mb-4">Supported Categories</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-medium text-neutral-900">Lattice-based</dt>
              <dd className="text-neutral-600">
                Algorithms based on lattice problems like Learning With Errors (LWE). 
                Examples: CRYSTALS-Kyber, CRYSTALS-Dilithium, NTRU, Falcon.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Code-based</dt>
              <dd className="text-neutral-600">
                Algorithms based on error-correcting codes. 
                Examples: Classic McEliece, BIKE, HQC.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Hash-based</dt>
              <dd className="text-neutral-600">
                Signature schemes based on hash functions. 
                Examples: SPHINCS+, XMSS, LMS.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Isogeny-based</dt>
              <dd className="text-neutral-600">
                Algorithms based on isogenies between elliptic curves. 
                Examples: SIKE (broken), CSIDH.
              </dd>
            </div>
            <div>
              <dt className="font-medium text-neutral-900">Multivariate</dt>
              <dd className="text-neutral-600">
                Algorithms based on multivariate polynomial equations. 
                Examples: Rainbow (broken), GeMSS.
              </dd>
            </div>
          </dl>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium text-neutral-900 mb-4">How Benchmarking Works</h2>
          <ol className="list-decimal pl-6 text-neutral-700 space-y-2">
            <li>Submit your implementation with source code and metadata</li>
            <li>Our system compiles your code in an isolated, reproducible environment</li>
            <li>We run multiple benchmark iterations to get stable measurements</li>
            <li>Results are recorded with environment details and a cryptographic hash</li>
            <li>Optional: anchor results on-chain for immutable verification</li>
          </ol>
        </section>

        <section className="mb-8">
          <h2 className="text-xl font-medium text-neutral-900 mb-4">Scoring</h2>
          <p className="text-neutral-700 mb-4">
            The overall score is a weighted combination of three metrics:
          </p>
          <ul className="list-disc pl-6 text-neutral-700 space-y-2">
            <li><strong>Speed Score (40%)</strong>: Based on key generation and operation times</li>
            <li><strong>Memory Score (30%)</strong>: Based on peak memory usage</li>
            <li><strong>Size Score (30%)</strong>: Based on key and signature/ciphertext sizes</li>
          </ul>
          <p className="text-neutral-700 mt-4">
            Lower values are better for all metrics. Scores are normalized relative to the 
            best-performing algorithm in each category.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-medium text-neutral-900 mb-4">Contributing</h2>
          <p className="text-neutral-700">
            Crucible is open source. We welcome contributions to the benchmark suite, 
            new algorithm implementations, and improvements to the platform. Visit our 
            GitHub repository to get involved.
          </p>
        </section>
      </div>
    </div>
  );
}
