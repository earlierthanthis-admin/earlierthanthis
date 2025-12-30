import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { comparePassword, signToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { loginSchema } from '@/src/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = loginSchema.safeParse(body);
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

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const authentication = await prisma.authentication.findFirst({
      where: { userId: user.id },
      include: { type: true },
    });

    if (!authentication) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'No authentication record found' },
        { status: 401 },
      );
    }

    if (authentication.type.name === 'google') {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'Please use Google Login for this account',
        },
        { status: 401 },
      );
    }

    const isPasswordValid = await comparePassword(
      password,
      authentication.value,
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid email or password' },
        { status: 401 },
      );
    }

    const token = await signToken({ id: user.id });

    return NextResponse.json({
      token,
      userId: user.id,
      user: {
        fullName: user.fullName,
        email: user.email,
        profilePicture: user.profilePicture,
        isVerified: user.isEmailVerified,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
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
