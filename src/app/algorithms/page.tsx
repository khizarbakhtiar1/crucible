'use client';

import { useState, useEffect } from 'react';
import AlgorithmCard from '@/components/AlgorithmCard';
import LeaderboardTable from '@/components/LeaderboardTable';
import CategoryFilter from '@/components/CategoryFilter';
import { Algorithm, LeaderboardEntry } from '@/lib/types';
import { CATEGORY_LABELS } from '@/lib/utils';

export default function AlgorithmsPage() {
  const [view, setView] = useState<'cards' | 'table'>('table');
  const [category, setCategory] = useState<string | null>(null);
  const [algorithms, setAlgorithms] = useState<Algorithm[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [algoRes, leaderRes] = await Promise.all([
          fetch('/api/algorithms'),
          fetch('/api/leaderboard'),
        ]);
        
        if (algoRes.ok) {
          const data = await algoRes.json();
          setAlgorithms(data.data || []);
        }
        
        if (leaderRes.ok) {
          const data = await leaderRes.json();
          setLeaderboard(data.data || []);
        }
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  const categories = Object.keys(CATEGORY_LABELS);
  
  const filteredAlgorithms = category
    ? algorithms.filter((a) => a.category === category)
    : algorithms;

  const filteredLeaderboard = category
    ? leaderboard.filter((e) => e.category === category)
    : leaderboard;

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-neutral-900">Algorithms</h1>
          <p className="mt-1 text-neutral-600">
            Browse and compare PQC algorithm implementations.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView('table')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              view === 'table'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Leaderboard
          </button>
          <button
            onClick={() => setView('cards')}
            className={`px-3 py-1.5 text-sm rounded-md ${
              view === 'cards'
                ? 'bg-neutral-900 text-white'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
            }`}
          >
            Cards
          </button>
        </div>
      </div>

      <div className="mb-6">
        <CategoryFilter
          categories={categories.map((k) => CATEGORY_LABELS[k])}
          selected={category ? CATEGORY_LABELS[category] : null}
          onChange={(cat) => {
            if (cat === null) {
              setCategory(null);
            } else {
              const key = Object.keys(CATEGORY_LABELS).find(
                (k) => CATEGORY_LABELS[k] === cat
              );
              setCategory(key || null);
            }
          }}
        />
      </div>

      {loading ? (
        <div className="text-center py-12 text-neutral-500">
          Loading...
        </div>
      ) : view === 'table' ? (
        <div className="bg-white border border-neutral-200 rounded-lg overflow-hidden">
          <LeaderboardTable entries={filteredLeaderboard} />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filteredAlgorithms.length === 0 ? (
            <div className="col-span-2 text-center py-12 text-neutral-500">
              No algorithms found.
            </div>
          ) : (
            filteredAlgorithms.map((algo) => (
              <AlgorithmCard
                key={algo.id}
                id={algo.id}
                name={algo.name}
                version={algo.version}
                category={algo.category}
                description={algo.description}
                language={algo.language}
                researcherName={algo.researcher?.name || 'Unknown'}
                benchmarkCount={algo.benchmarks?.length || 0}
                verified={algo.verified}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}
