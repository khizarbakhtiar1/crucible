import Link from 'next/link';
import { LeaderboardEntry } from '@/lib/types';
import { formatMicroseconds, formatKilobytes, CATEGORY_LABELS } from '@/lib/utils';

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  category?: string;
}

export default function LeaderboardTable({ entries, category }: LeaderboardTableProps) {
  const filteredEntries = category
    ? entries.filter((e) => e.category === category)
    : entries;

  if (filteredEntries.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-500">
        No algorithms benchmarked yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-neutral-200">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Rank
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Algorithm
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Score
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
              KeyGen
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Memory
            </th>
            <th className="px-4 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
              Runs
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {filteredEntries.map((entry, index) => (
            <tr key={entry.id} className="hover:bg-neutral-50">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-neutral-900">
                {index + 1}
              </td>
              <td className="px-4 py-4 whitespace-nowrap">
                <Link
                  href={`/algorithms/${entry.algorithmId}`}
                  className="text-sm font-medium text-neutral-900 hover:text-neutral-600"
                >
                  {entry.algorithmName}
                </Link>
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500">
                {CATEGORY_LABELS[entry.category] || entry.category}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-900 text-right font-mono">
                {entry.overallScore.toFixed(1)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600 text-right font-mono">
                {formatMicroseconds(entry.bestKeyGenTime)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-600 text-right font-mono">
                {formatKilobytes(entry.lowestMemory)}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-neutral-500 text-right">
                {entry.runCount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
