'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CATEGORY_LABELS, LANGUAGE_OPTIONS } from '@/lib/utils';

export default function SubmitPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    version: '',
    category: 'lattice',
    description: '',
    sourceCode: '',
    language: 'C',
    researcherName: '',
    researcherEmail: '',
    affiliation: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/algorithms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit algorithm');
      }

      router.push(`/algorithms/${data.data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-neutral-900">Submit Algorithm</h1>
        <p className="mt-1 text-neutral-600">
          Submit your PQC algorithm implementation for benchmarking.
        </p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Algorithm Details */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Algorithm Details</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="name">Algorithm Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="e.g., CRYSTALS-Dilithium"
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="version">Version</label>
              <input
                type="text"
                id="version"
                name="version"
                value={formData.version}
                onChange={handleChange}
                required
                placeholder="e.g., 3.1"
                className="w-full"
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 mt-4">
            <div>
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full"
              >
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="language">Language</label>
              <select
                id="language"
                name="language"
                value={formData.language}
                onChange={handleChange}
                className="w-full"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang} value={lang}>
                    {lang}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={3}
              placeholder="Brief description of your implementation, optimizations, and target use case."
              className="w-full"
            />
          </div>
        </section>

        {/* Source Code */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Source Code</h2>
          <p className="text-sm text-neutral-600 mb-4">
            Paste your source code below. For larger codebases, provide a link to a public repository.
          </p>
          <div>
            <label htmlFor="sourceCode">Code</label>
            <textarea
              id="sourceCode"
              name="sourceCode"
              value={formData.sourceCode}
              onChange={handleChange}
              required
              rows={12}
              placeholder="// Your implementation here..."
              className="w-full font-mono text-sm"
            />
          </div>
        </section>

        {/* Researcher Info */}
        <section className="bg-white border border-neutral-200 rounded-lg p-6">
          <h2 className="text-lg font-medium text-neutral-900 mb-4">Researcher Information</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="researcherName">Your Name</label>
              <input
                type="text"
                id="researcherName"
                name="researcherName"
                value={formData.researcherName}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
            <div>
              <label htmlFor="researcherEmail">Email</label>
              <input
                type="email"
                id="researcherEmail"
                name="researcherEmail"
                value={formData.researcherEmail}
                onChange={handleChange}
                required
                className="w-full"
              />
            </div>
          </div>

          <div className="mt-4">
            <label htmlFor="affiliation">Affiliation (optional)</label>
            <input
              type="text"
              id="affiliation"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              placeholder="University, company, or research group"
              className="w-full"
            />
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.back()}
            className="btn-secondary"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
          >
            {loading ? 'Submitting...' : 'Submit Algorithm'}
          </button>
        </div>
      </form>
    </div>
  );
}
