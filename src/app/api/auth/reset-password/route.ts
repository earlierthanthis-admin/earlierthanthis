import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { hashPassword, verifyToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { resetPasswordSchema } from '@/src/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Bad request', message: 'Token is required' },
        { status: 400 },
      );
    }

    const body = await request.json();

    const validation = resetPasswordSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { password } = validation.data;

    const payload = await verifyToken(token);

    if (payload.type !== 'password_reset') {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid token type' },
        { status: 401 },
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Not found', message: 'User not found' },
        { status: 404 },
      );
    }

    const hashedPassword = await hashPassword(password);

    await prisma.user.update({
      where: { id: payload.id },
      data: { password: hashedPassword },
    });

    await prisma.authentication.updateMany({
      where: { userId: user.id },
      data: { value: hashedPassword },
    });

    return NextResponse.json({ message: 'Password reset successfully' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Invalid or expired reset token';
    return NextResponse.json(
      { error: 'Unauthorized', message: errorMessage },
      { status: 401 },
    );
  }
}
