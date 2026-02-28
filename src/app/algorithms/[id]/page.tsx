import { notFound } from 'next/navigation';
import prisma from '@/lib/db';
import MetricCard from '@/components/MetricCard';
import BenchmarkTable from '@/components/BenchmarkTable';
import BenchmarkCharts from '@/components/BenchmarkCharts';
import CodeBlock from '@/components/CodeBlock';
import { formatMicroseconds, formatBytes, formatKilobytes, CATEGORY_LABELS } from '@/lib/utils';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AlgorithmDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  const algorithm = await prisma.algorithm.findUnique({
    where: { id },
    include: {
      researcher: true,
      benchmarks: {
        orderBy: { createdAt: 'desc' },
      },
    },
  });

  if (!algorithm) {
    notFound();
  }

  const benchmarks = algorithm.benchmarks;
  const latestBenchmark = benchmarks[0];

  // Calculate best metrics
  const bestKeyGenTime = benchmarks.length > 0
    ? Math.min(...benchmarks.map((b) => b.keyGenTime))
    : null;
  
  const lowestMemory = benchmarks.length > 0
    ? Math.min(...benchmarks.map((b) => b.peakMemory))
    : null;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              {algorithm.name}
              <span className="ml-2 text-lg text-neutral-500">v{algorithm.version}</span>
            </h1>
            <p className="mt-1 text-neutral-600">
              {CATEGORY_LABELS[algorithm.category] || algorithm.category} / {algorithm.language}
            </p>
          </div>
          {algorithm.verified && (
            <span className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-green-100 text-green-800">
              Verified
            </span>
          )}
        </div>
        <p className="mt-4 text-neutral-700">{algorithm.description}</p>
        <p className="mt-2 text-sm text-neutral-500">
          Submitted by {algorithm.researcher.name}
          {algorithm.researcher.affiliation && ` (${algorithm.researcher.affiliation})`}
        </p>
      </div>

      {/* Metrics Overview */}
      {latestBenchmark && (
        <section className="mb-8">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Latest Benchmark</h2>
          <div className="grid gap-4 md:grid-cols-4">
            <MetricCard
              label="Key Generation"
              value={formatMicroseconds(latestBenchmark.keyGenTime)}
              subtext={bestKeyGenTime ? `Best: ${formatMicroseconds(bestKeyGenTime)}` : undefined}
            />
            {latestBenchmark.signTime && (
              <MetricCard
                label="Sign Time"
                value={formatMicroseconds(latestBenchmark.signTime)}
              />
            )}
            {latestBenchmark.verifyTime && (
              <MetricCard
                label="Verify Time"
                value={formatMicroseconds(latestBenchmark.verifyTime)}
              />
            )}
            {latestBenchmark.encapsTime && (
              <MetricCard
                label="Encapsulation"
                value={formatMicroseconds(latestBenchmark.encapsTime)}
              />
            )}
            {latestBenchmark.decapsTime && (
              <MetricCard
                label="Decapsulation"
                value={formatMicroseconds(latestBenchmark.decapsTime)}
              />
            )}
            <MetricCard
              label="Peak Memory"
              value={formatKilobytes(latestBenchmark.peakMemory)}
              subtext={lowestMemory ? `Best: ${formatKilobytes(lowestMemory)}` : undefined}
            />
            <MetricCard
              label="Public Key"
              value={formatBytes(latestBenchmark.publicKeySize)}
            />
            <MetricCard
              label="Secret Key"
              value={formatBytes(latestBenchmark.secretKeySize)}
            />
          </div>
        </section>
      )}

      {/* Performance Charts */}
      {benchmarks.length > 1 && (
        <section className="mb-8">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Performance Over Time</h2>
          <BenchmarkCharts benchmarks={benchmarks} />
        </section>
      )}

      {/* Benchmark History */}
      <section className="mb-8">
        <h2 className="text-lg font-medium text-neutral-900 mb-4">
          Benchmark History ({benchmarks.length} runs)
        </h2>
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <BenchmarkTable benchmarks={benchmarks} />
        </div>
      </section>

      {/* Environment Info */}
      {latestBenchmark && (
        <section className="mb-8">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Latest Environment</h2>
          <div className="bg-white border border-neutral-200 rounded-lg p-4">
            <dl className="grid gap-4 md:grid-cols-2 text-sm">
              <div>
                <dt className="text-neutral-500">CPU</dt>
                <dd className="text-neutral-900">{latestBenchmark.cpuModel} ({latestBenchmark.cpuCores} cores)</dd>
              </div>
              <div>
                <dt className="text-neutral-500">RAM</dt>
                <dd className="text-neutral-900">{latestBenchmark.ramMb} MB</dd>
              </div>
              <div>
                <dt className="text-neutral-500">OS</dt>
                <dd className="text-neutral-900">{latestBenchmark.osVersion}</dd>
              </div>
              <div>
                <dt className="text-neutral-500">Compiler</dt>
                <dd className="text-neutral-900">{latestBenchmark.compilerVersion}</dd>
              </div>
              <div className="md:col-span-2">
                <dt className="text-neutral-500">Run Hash</dt>
                <dd className="text-neutral-900 font-mono text-xs break-all">{latestBenchmark.runHash}</dd>
              </div>
              {latestBenchmark.chainTxHash && (
                <div className="md:col-span-2">
                  <dt className="text-neutral-500">Chain TX</dt>
                  <dd className="text-neutral-900 font-mono text-xs break-all">{latestBenchmark.chainTxHash}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>
      )}

      {/* Source Code */}
      <section>
        <h2 className="text-lg font-medium text-neutral-900 mb-4">Source Code</h2>
        <CodeBlock code={algorithm.sourceCode} language={algorithm.language.toLowerCase()} />
      </section>
    </div>
  );
}
