import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import {
  hashPassword,
  signEmailVerificationToken,
  signToken,
} from '@/src/lib/auth';
import {
  buildVerificationLink,
  getEmailVerificationTemplate,
  sendEmail,
} from '@/src/lib/email';
import { prisma } from '@/src/lib/prisma';
import { signupSchema } from '@/src/lib/validators';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { searchParams } = new URL(request.url);
    const authTypeName = searchParams.get('authTypeName') || 'local';

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

    const authType = await prisma.authenticationType.findUnique({
      where: { name: authTypeName },
    });

    if (!authType) {
      return NextResponse.json(
        { error: 'Not found', message: 'Authentication type not found' },
        { status: 404 },
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
    });

    await prisma.authentication.create({
      data: {
        userId: user.id,
        typeId: authType.id,
        value: hashedPassword,
      },
    });

    const verificationToken = await signEmailVerificationToken(user.id);
    const verificationLink = buildVerificationLink(verificationToken);

    try {
      await sendEmail({
        to: email,
        subject: 'Verify Your Email Address',
        html: getEmailVerificationTemplate(fullName, verificationLink),
      });
    } catch {
      // Email sending failed but user was created
    }

    const token = await signToken({ id: user.id });

    return NextResponse.json({ token, userId: user.id }, { status: 201 });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}
