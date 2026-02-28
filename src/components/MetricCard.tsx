interface MetricCardProps {
  label: string;
  value: string;
  subtext?: string;
}

export default function MetricCard({ label, value, subtext }: MetricCardProps) {
  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4">
      <p className="text-sm text-neutral-500">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-neutral-900 font-mono">{value}</p>
      {subtext && <p className="mt-1 text-xs text-neutral-400">{subtext}</p>}
    </div>
  );
}
