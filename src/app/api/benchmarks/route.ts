import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';
import { generateRunHash, calculateOverallScore, normalizeScore } from '@/lib/utils';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      algorithmId,
      metrics,
      environment,
    } = body;

    // Validate
    if (!algorithmId) {
      return NextResponse.json(
        { success: false, error: 'Algorithm ID is required' },
        { status: 400 }
      );
    }

    if (!metrics || !environment) {
      return NextResponse.json(
        { success: false, error: 'Metrics and environment are required' },
        { status: 400 }
      );
    }

    // Check algorithm exists
    const algorithm = await prisma.algorithm.findUnique({
      where: { id: algorithmId },
    });

    if (!algorithm) {
      return NextResponse.json(
        { success: false, error: 'Algorithm not found' },
        { status: 404 }
      );
    }

    // Generate run hash for reproducibility
    const runHash = generateRunHash({
      algorithmId,
      metrics,
      environment,
      timestamp: Date.now(),
    });

    // Create benchmark
    const benchmark = await prisma.benchmark.create({
      data: {
        id: uuidv4(),
        algorithmId,
        keyGenTime: metrics.keyGenTime,
        signTime: metrics.signTime || null,
        verifyTime: metrics.verifyTime || null,
        encapsTime: metrics.encapsTime || null,
        decapsTime: metrics.decapsTime || null,
        peakMemory: metrics.peakMemory,
        stackUsage: metrics.stackUsage || null,
        publicKeySize: metrics.publicKeySize,
        secretKeySize: metrics.secretKeySize,
        signatureSize: metrics.signatureSize || null,
        ciphertextSize: metrics.ciphertextSize || null,
        cpuModel: environment.cpuModel,
        cpuCores: environment.cpuCores,
        ramMb: environment.ramMb,
        osVersion: environment.osVersion,
        compilerVersion: environment.compilerVersion,
        runHash,
      },
    });

    // Update leaderboard
    await updateLeaderboard(algorithmId, algorithm.name, algorithm.category);

    return NextResponse.json({ success: true, data: benchmark }, { status: 201 });
  } catch (error) {
    console.error('Failed to create benchmark:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create benchmark' },
      { status: 500 }
    );
  }
}

async function updateLeaderboard(algorithmId: string, algorithmName: string, category: string) {
  // Get all benchmarks for this algorithm
  const benchmarks = await prisma.benchmark.findMany({
    where: { algorithmId },
  });

  if (benchmarks.length === 0) return;

  // Calculate best metrics
  const bestKeyGenTime = Math.min(...benchmarks.map((b) => b.keyGenTime));
  const bestSignTime = benchmarks.some((b) => b.signTime)
    ? Math.min(...benchmarks.filter((b) => b.signTime).map((b) => b.signTime!))
    : null;
  const bestVerifyTime = benchmarks.some((b) => b.verifyTime)
    ? Math.min(...benchmarks.filter((b) => b.verifyTime).map((b) => b.verifyTime!))
    : null;
  const bestEncapsTime = benchmarks.some((b) => b.encapsTime)
    ? Math.min(...benchmarks.filter((b) => b.encapsTime).map((b) => b.encapsTime!))
    : null;
  const bestDecapsTime = benchmarks.some((b) => b.decapsTime)
    ? Math.min(...benchmarks.filter((b) => b.decapsTime).map((b) => b.decapsTime!))
    : null;
  const lowestMemory = Math.min(...benchmarks.map((b) => b.peakMemory));

  // Get all algorithms in category for normalization
  const allInCategory = await prisma.leaderboardEntry.findMany({
    where: { category },
  });

  // Calculate normalized scores (simplified - in production would be more sophisticated)
  const allKeyGenTimes = allInCategory.map((e) => e.bestKeyGenTime);
  const allMemory = allInCategory.map((e) => e.lowestMemory);

  const speedScore = allKeyGenTimes.length > 0
    ? normalizeScore(bestKeyGenTime, Math.min(...allKeyGenTimes), Math.max(...allKeyGenTimes))
    : 50;
  
  const memoryScore = allMemory.length > 0
    ? normalizeScore(lowestMemory, Math.min(...allMemory), Math.max(...allMemory))
    : 50;
  
  const sizeScore = 50; // Simplified

  const overallScore = calculateOverallScore(speedScore, memoryScore, sizeScore);

  // Upsert leaderboard entry
  await prisma.leaderboardEntry.upsert({
    where: { algorithmId },
    update: {
      algorithmName,
      category,
      speedScore,
      memoryScore,
      sizeScore,
      overallScore,
      bestKeyGenTime,
      bestSignTime,
      bestVerifyTime,
      bestEncapsTime,
      bestDecapsTime,
      lowestMemory,
      runCount: benchmarks.length,
    },
    create: {
      id: uuidv4(),
      algorithmId,
      algorithmName,
      category,
      speedScore,
      memoryScore,
      sizeScore,
      overallScore,
      bestKeyGenTime,
      bestSignTime,
      bestVerifyTime,
      bestEncapsTime,
      bestDecapsTime,
      lowestMemory,
      runCount: benchmarks.length,
    },
  });
}
