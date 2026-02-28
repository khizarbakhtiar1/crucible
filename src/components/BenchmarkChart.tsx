'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Benchmark } from '@/lib/types';

interface BenchmarkChartProps {
  benchmarks: Benchmark[];
  metric: 'keyGenTime' | 'signTime' | 'verifyTime' | 'encapsTime' | 'decapsTime' | 'peakMemory';
  title: string;
}

function BenchmarkChartInner({ benchmarks, metric, title }: BenchmarkChartProps) {
  const data = benchmarks
    .filter((b) => b[metric] !== null && b[metric] !== undefined)
    .map((b, index) => ({
      run: index + 1,
      value: b[metric],
      date: new Date(b.createdAt).toLocaleDateString(),
    }));

  if (data.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border border-neutral-200 rounded-lg p-4">
      <h3 className="text-sm font-medium text-neutral-700 mb-4">{title}</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
            <XAxis
              dataKey="run"
              tick={{ fontSize: 12 }}
              stroke="#737373"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#737373"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: '4px',
                fontSize: '12px',
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#171717"
              strokeWidth={1.5}
              dot={{ fill: '#171717', r: 3 }}
              name={title}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default BenchmarkChartInner;
