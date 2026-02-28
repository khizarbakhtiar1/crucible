export type AlgorithmCategory = 
  | 'lattice'
  | 'code-based'
  | 'hash-based'
  | 'isogeny'
  | 'multivariate';

export type AlgorithmType = 'signature' | 'kem';

export interface Algorithm {
  id: string;
  name: string;
  version: string;
  category: AlgorithmCategory;
  description: string;
  sourceCode: string;
  language: string;
  compiledHash?: string;
  researcherId: string;
  researcher?: Researcher;
  benchmarks?: Benchmark[];
  createdAt: Date;
  updatedAt: Date;
  verified: boolean;
}

export interface Researcher {
  id: string;
  name: string;
  email: string;
  affiliation?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Benchmark {
  id: string;
  algorithmId: string;
  algorithm?: Algorithm;
  
  keyGenTime: number;
  signTime?: number | null;
  verifyTime?: number | null;
  encapsTime?: number | null;
  decapsTime?: number | null;
  
  peakMemory: number;
  stackUsage?: number | null;
  
  publicKeySize: number;
  secretKeySize: number;
  signatureSize?: number | null;
  ciphertextSize?: number | null;
  
  cpuModel: string;
  cpuCores: number;
  ramMb: number;
  osVersion: string;
  compilerVersion: string;
  
  runHash: string;
  chainTxHash?: string | null;
  
  createdAt: Date;
}

export interface LeaderboardEntry {
  id: string;
  algorithmId: string;
  algorithmName: string;
  category: string;
  
  speedScore: number;
  memoryScore: number;
  sizeScore: number;
  overallScore: number;
  
  bestKeyGenTime: number;
  bestSignTime?: number | null;
  bestVerifyTime?: number | null;
  bestEncapsTime?: number | null;
  bestDecapsTime?: number | null;
  lowestMemory: number;
  
  runCount: number;
  lastUpdated: Date;
}

export interface SubmitAlgorithmInput {
  name: string;
  version: string;
  category: AlgorithmCategory;
  description: string;
  sourceCode: string;
  language: string;
  researcherEmail: string;
  researcherName: string;
  affiliation?: string;
}

export interface BenchmarkResult {
  algorithmId: string;
  metrics: {
    keyGenTime: number;
    signTime?: number;
    verifyTime?: number;
    encapsTime?: number;
    decapsTime?: number;
    peakMemory: number;
    stackUsage?: number;
    publicKeySize: number;
    secretKeySize: number;
    signatureSize?: number;
    ciphertextSize?: number;
  };
  environment: {
    cpuModel: string;
    cpuCores: number;
    ramMb: number;
    osVersion: string;
    compilerVersion: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}
