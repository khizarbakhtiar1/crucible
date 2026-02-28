import { createHash } from 'crypto';

export function generateRunHash(input: Record<string, unknown>): string {
  const serialized = JSON.stringify(input, Object.keys(input).sort());
  return createHash('sha256').update(serialized).digest('hex');
}

export function formatMicroseconds(us: number): string {
  if (us < 1000) {
    return `${us.toFixed(2)} us`;
  }
  if (us < 1000000) {
    return `${(us / 1000).toFixed(2)} ms`;
  }
  return `${(us / 1000000).toFixed(2)} s`;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return `${bytes} B`;
  }
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(2)} KB`;
  }
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}

export function formatKilobytes(kb: number): string {
  if (kb < 1024) {
    return `${kb.toFixed(2)} KB`;
  }
  return `${(kb / 1024).toFixed(2)} MB`;
}

export function calculateOverallScore(
  speedScore: number,
  memoryScore: number,
  sizeScore: number
): number {
  // Weighted average: speed 40%, memory 30%, size 30%
  return speedScore * 0.4 + memoryScore * 0.3 + sizeScore * 0.3;
}

export function normalizeScore(value: number, min: number, max: number): number {
  if (max === min) return 100;
  // Lower is better for all metrics, so invert the normalization
  return Math.max(0, Math.min(100, ((max - value) / (max - min)) * 100));
}

export function classNames(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function timeAgo(date: Date): string {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)} minutes ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)} hours ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)} days ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 604800)} weeks ago`;
  return `${Math.floor(seconds / 2592000)} months ago`;
}

export const CATEGORY_LABELS: Record<string, string> = {
  'lattice': 'Lattice-based',
  'code-based': 'Code-based',
  'hash-based': 'Hash-based',
  'isogeny': 'Isogeny-based',
  'multivariate': 'Multivariate',
};

export const LANGUAGE_OPTIONS = [
  'C',
  'C++',
  'Rust',
  'Go',
  'Python',
  'Java',
  'Assembly',
  'Other',
];
