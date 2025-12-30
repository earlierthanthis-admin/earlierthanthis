import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { hashPassword, withAuth } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { signupSchema } from '@/src/lib/validators';

export async function GET() {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePicture: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(users);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  const authResult = await withAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const body = await request.json();

    const validation = signupSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { fullName, email, password } = validation.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Conflict', message: 'User with this email already exists' },
        { status: 409 },
      );
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        fullName,
        email,
        password: hashedPassword,
        isEmailVerified: false,
      },
      select: {
        id: true,
        fullName: true,
        email: true,
        profilePicture: true,
        isEmailVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}
