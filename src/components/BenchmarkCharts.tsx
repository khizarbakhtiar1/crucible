'use client';

import dynamic from 'next/dynamic';
import { Benchmark } from '@/lib/types';

const BenchmarkChart = dynamic(() => import('@/components/BenchmarkChart'), {
  ssr: false,
  loading: () => (
    <div className="bg-white border border-neutral-200 rounded-lg p-4">
      <div className="h-64 flex items-center justify-center text-neutral-400">
        Loading chart...
      </div>
    </div>
  ),
});

interface BenchmarkChartsProps {
  benchmarks: Benchmark[];
}

export default function BenchmarkCharts({ benchmarks }: BenchmarkChartsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <BenchmarkChart
        benchmarks={benchmarks}
        metric="keyGenTime"
        title="Key Generation (us)"
      />
      {benchmarks.some((b) => b.signTime) && (
        <BenchmarkChart
          benchmarks={benchmarks}
          metric="signTime"
          title="Sign Time (us)"
        />
      )}
      {benchmarks.some((b) => b.encapsTime) && (
        <BenchmarkChart
          benchmarks={benchmarks}
          metric="encapsTime"
          title="Encapsulation Time (us)"
        />
      )}
      <BenchmarkChart
        benchmarks={benchmarks}
        metric="peakMemory"
        title="Peak Memory (KB)"
      />
    </div>
  );
}
