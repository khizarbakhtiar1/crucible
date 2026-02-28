import { NextResponse } from 'next/server';
import prisma from '@/lib/db';

export async function GET() {
  try {
    const leaderboard = await prisma.leaderboardEntry.findMany({
      orderBy: { overallScore: 'desc' },
    });

    return NextResponse.json({ success: true, data: leaderboard });
  } catch (error) {
    console.error('Failed to fetch leaderboard:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
