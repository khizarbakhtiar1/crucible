import { Benchmark } from '@/lib/types';
import { formatMicroseconds, formatBytes, formatKilobytes } from '@/lib/utils';

interface BenchmarkTableProps {
  benchmarks: Benchmark[];
}

export default function BenchmarkTable({ benchmarks }: BenchmarkTableProps) {
  if (benchmarks.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No benchmark results yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200 text-sm">
        <thead>
          <tr className="bg-neutral-50">
            <th className="px-3 py-2 text-left font-medium text-neutral-600">Run</th>
            <th className="px-3 py-2 text-right font-medium text-neutral-600">KeyGen</th>
            <th className="px-3 py-2 text-right font-medium text-neutral-600">Sign/Encaps</th>
            <th className="px-3 py-2 text-right font-medium text-neutral-600">Verify/Decaps</th>
            <th className="px-3 py-2 text-right font-medium text-neutral-600">Memory</th>
            <th className="px-3 py-2 text-right font-medium text-neutral-600">PK Size</th>
            <th className="px-3 py-2 text-right font-medium text-neutral-600">SK Size</th>
            <th className="px-3 py-2 text-left font-medium text-neutral-600">Environment</th>
            <th className="px-3 py-2 text-left font-medium text-neutral-600">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {benchmarks.map((benchmark, index) => (
            <tr key={benchmark.id} className="hover:bg-neutral-50">
              <td className="px-3 py-2 font-mono text-neutral-900">
                #{benchmarks.length - index}
              </td>
              <td className="px-3 py-2 text-right font-mono text-neutral-700">
                {formatMicroseconds(benchmark.keyGenTime)}
              </td>
              <td className="px-3 py-2 text-right font-mono text-neutral-700">
                {benchmark.signTime
                  ? formatMicroseconds(benchmark.signTime)
                  : benchmark.encapsTime
                  ? formatMicroseconds(benchmark.encapsTime)
                  : '-'}
              </td>
              <td className="px-3 py-2 text-right font-mono text-neutral-700">
                {benchmark.verifyTime
                  ? formatMicroseconds(benchmark.verifyTime)
                  : benchmark.decapsTime
                  ? formatMicroseconds(benchmark.decapsTime)
                  : '-'}
              </td>
              <td className="px-3 py-2 text-right font-mono text-neutral-700">
                {formatKilobytes(benchmark.peakMemory)}
              </td>
              <td className="px-3 py-2 text-right font-mono text-neutral-700">
                {formatBytes(benchmark.publicKeySize)}
              </td>
              <td className="px-3 py-2 text-right font-mono text-neutral-700">
                {formatBytes(benchmark.secretKeySize)}
              </td>
              <td className="px-3 py-2 text-neutral-600 max-w-[200px] truncate">
                {benchmark.cpuModel} / {benchmark.osVersion}
              </td>
              <td className="px-3 py-2 text-neutral-500">
                {new Date(benchmark.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
