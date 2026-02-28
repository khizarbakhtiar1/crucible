import Link from 'next/link';
import { CATEGORY_LABELS } from '@/lib/utils';

interface AlgorithmCardProps {
  id: string;
  name: string;
  version: string;
  category: string;
  description: string;
  language: string;
  researcherName: string;
  benchmarkCount: number;
  verified: boolean;
  bestKeyGenTime?: number;
}

export default function AlgorithmCard({
  id,
  name,
  version,
  category,
  description,
  language,
  researcherName,
  benchmarkCount,
  verified,
  bestKeyGenTime,
}: AlgorithmCardProps) {
  return (
    <Link
      href={`/algorithms/${id}`}
      className="block border border-neutral-200 rounded-lg p-5 hover:border-neutral-300 transition-colors bg-white"
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-neutral-900">
            {name}
            <span className="ml-2 text-sm text-neutral-500">v{version}</span>
          </h3>
          <p className="mt-1 text-sm text-neutral-500">
            {CATEGORY_LABELS[category] || category} / {language}
          </p>
        </div>
        {verified && (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
            Verified
          </span>
        )}
      </div>
      <p className="mt-3 text-sm text-neutral-600 line-clamp-2">
        {description}
      </p>
      <div className="mt-4 flex items-center justify-between text-sm">
        <span className="text-neutral-500">by {researcherName}</span>
        <div className="flex items-center space-x-4 text-neutral-500">
          <span>{benchmarkCount} benchmarks</span>
          {bestKeyGenTime && (
            <span>Best keygen: {bestKeyGenTime.toFixed(2)} us</span>
          )}
        </div>
      </div>
    </Link>
  );
}
