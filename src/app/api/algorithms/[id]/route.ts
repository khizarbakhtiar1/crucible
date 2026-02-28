import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    
    const algorithm = await prisma.algorithm.findUnique({
      where: { id },
      include: {
        researcher: {
          select: {
            id: true,
            name: true,
            affiliation: true,
          },
        },
        benchmarks: {
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!algorithm) {
      return NextResponse.json(
        { success: false, error: 'Algorithm not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: algorithm });
  } catch (error) {
    console.error('Failed to fetch algorithm:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch algorithm' },
      { status: 500 }
    );
  }
}
