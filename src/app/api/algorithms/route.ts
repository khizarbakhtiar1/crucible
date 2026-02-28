import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/db';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

export async function GET() {
  try {
    const algorithms = await prisma.algorithm.findMany({
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
          take: 1,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: algorithms });
  } catch (error) {
    console.error('Failed to fetch algorithms:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch algorithms' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      name,
      version,
      category,
      description,
      sourceCode,
      language,
      researcherName,
      researcherEmail,
      affiliation,
    } = body;

    // Validate required fields
    if (!name || !version || !category || !description || !sourceCode || !language) {
      return NextResponse.json(
        { success: false, error: 'Missing required algorithm fields' },
        { status: 400 }
      );
    }

    if (!researcherName || !researcherEmail) {
      return NextResponse.json(
        { success: false, error: 'Missing researcher information' },
        { status: 400 }
      );
    }

    // Find or create researcher
    let researcher = await prisma.researcher.findUnique({
      where: { email: researcherEmail },
    });

    if (!researcher) {
      researcher = await prisma.researcher.create({
        data: {
          id: uuidv4(),
          name: researcherName,
          email: researcherEmail,
          affiliation: affiliation || null,
          passwordHash: await bcrypt.hash(uuidv4(), 10), // temporary password
        },
      });
    }

    // Check for duplicate algorithm
    const existing = await prisma.algorithm.findUnique({
      where: {
        name_version: { name, version },
      },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Algorithm with this name and version already exists' },
        { status: 400 }
      );
    }

    // Create algorithm
    const algorithm = await prisma.algorithm.create({
      data: {
        id: uuidv4(),
        name,
        version,
        category,
        description,
        sourceCode,
        language,
        researcherId: researcher.id,
        verified: false,
      },
      include: {
        researcher: {
          select: {
            id: true,
            name: true,
            affiliation: true,
          },
        },
      },
    });

    return NextResponse.json({ success: true, data: algorithm }, { status: 201 });
  } catch (error) {
    console.error('Failed to create algorithm:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create algorithm' },
      { status: 500 }
    );
  }
}
