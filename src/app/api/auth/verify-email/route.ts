import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { verifyToken } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';

const frontendUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(
        `${frontendUrl}/email-verified?success=false&error=Token is required`,
      );
    }

    const payload = await verifyToken(token);

    if (payload.type !== 'email_verification') {
      return NextResponse.redirect(
        `${frontendUrl}/email-verified?success=false&error=Invalid token type`,
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: payload.id },
    });

    if (!user) {
      return NextResponse.redirect(
        `${frontendUrl}/email-verified?success=false&error=User not found`,
      );
    }

    if (user.isEmailVerified) {
      return NextResponse.redirect(
        `${frontendUrl}/email-verified?success=false&error=Email already verified`,
      );
    }

    await prisma.user.update({
      where: { id: payload.id },
      data: { isEmailVerified: true },
    });

    return NextResponse.redirect(`${frontendUrl}/email-verified?success=true`);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Verification failed';
    return NextResponse.redirect(
      `${frontendUrl}/email-verified?success=false&error=${encodeURIComponent(errorMessage)}`,
    );
  }
}
