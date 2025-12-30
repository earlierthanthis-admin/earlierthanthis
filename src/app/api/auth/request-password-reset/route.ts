import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { signPasswordResetToken } from '@/src/lib/auth';
import {
  buildPasswordResetLink,
  getPasswordResetTemplate,
  sendEmail,
} from '@/src/lib/email';
import { prisma } from '@/src/lib/prisma';
import { emailSchema } from '@/src/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = emailSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const { email } = validation.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Not found', message: 'User not found' },
        { status: 404 },
      );
    }

    const resetToken = await signPasswordResetToken(user.id, 'user');
    const resetLink = buildPasswordResetLink(resetToken);

    await sendEmail({
      to: email,
      subject: 'Password Reset Request',
      html: getPasswordResetTemplate(resetLink),
    });

    return NextResponse.json({ message: 'Password reset email sent' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}
