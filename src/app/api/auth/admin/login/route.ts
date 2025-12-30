import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { comparePassword, signToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { adminLoginSchema } from '@/src/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = adminLoginSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { email, password } = validation.data;

    const admin = await prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const isPasswordValid = await comparePassword(password, admin.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const role = admin.superKey ? 'super_admin' : 'admin';
    const token = await signToken({ id: admin.id, role });

    return NextResponse.json({
      token,
      role,
      userId: admin.id,
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}
