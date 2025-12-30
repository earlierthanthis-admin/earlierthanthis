import crypto from 'crypto';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { hashPassword, signToken } from '@/src/lib/auth';
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
    const {
      email,
      given_name: firstName,
      family_name: lastName,
    } = tokenResponse;
    const fullName = [firstName, lastName].filter(Boolean).join(' ') || 'User';

    const authType = await prisma.authenticationType.findUnique({
      where: { name: 'google' },
    });

    if (!authType) {
      return NextResponse.json(
        {
          error: 'Not found',
          message: 'Authentication type for Google not found',
        },
        { status: 404 },
      );
    }

    let user = await prisma.user.findUnique({
      where: { email },
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      const randomPassword = crypto.randomBytes(16).toString('hex');
      const hashedPassword = await hashPassword(randomPassword);

      user = await prisma.user.create({
        data: {
          email,
          fullName,
          password: hashedPassword,
          isEmailVerified: true,
        },
      });

      await prisma.authentication.create({
        data: {
          userId: user.id,
          typeId: authType.id,
          value: hashedPassword,
        },
      });
    }

    const token = await signToken({ id: user.id });

    return NextResponse.json({
      token,
      userId: user.id,
      isNewUser,
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
