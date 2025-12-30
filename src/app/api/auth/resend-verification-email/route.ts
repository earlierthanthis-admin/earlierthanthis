import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { signEmailVerificationToken } from '@/src/lib/auth';
import {
  buildVerificationLink,
  getEmailVerificationTemplate,
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

    if (user.isEmailVerified) {
      return NextResponse.json(
        { error: 'Conflict', message: 'Email is already verified' },
        { status: 409 },
      );
    }

    const verificationToken = await signEmailVerificationToken(user.id);
    const verificationLink = buildVerificationLink(verificationToken);

    await sendEmail({
      to: user.email,
      subject: 'Verify Your Email Address',
      html: getEmailVerificationTemplate(user.fullName, verificationLink),
    });

    return NextResponse.json({
      message: 'Verification email sent successfully',
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
