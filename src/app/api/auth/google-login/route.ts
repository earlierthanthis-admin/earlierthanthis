import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { signToken } from '@/src/lib/auth';
import { exchangeCodeForTokens } from '@/src/lib/google';
import { prisma } from '@/src/lib/prisma';
import { googleAuthSchema } from '@/src/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = googleAuthSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { code } = validation.data;

    const tokenResponse = await exchangeCodeForTokens(code);
    const { email } = tokenResponse;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        {
          error: 'Unauthorized',
          message: 'User is not registered, Please Signup First',
        },
        { status: 401 },
      );
    }

    const authentication = await prisma.authentication.findFirst({
      where: { userId: user.id },
      include: { type: true },
    });

    if (!authentication) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Authentication record not found' },
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
