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
      return NextResponse.redirect(`${frontendUrl}/admin-approval-failed`);
    }

    const payload = await verifyToken(token);

    if (
      payload.type !== 'admin_approval' ||
      !payload.email ||
      !payload.password
    ) {
      return NextResponse.redirect(`${frontendUrl}/admin-approval-failed`);
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { email: payload.email },
    });

    if (existingAdmin) {
      return NextResponse.redirect(`${frontendUrl}/admin-approval-failed`);
    }

    const superKey = payload.superKey
      ? Math.random().toString(36).slice(-8)
      : null;

    await prisma.admin.create({
      data: {
        email: payload.email,
        password: payload.password,
        superKey,
      },
    });

    return NextResponse.redirect(`${frontendUrl}/admin-approval-success`);
  } catch {
    return NextResponse.redirect(`${frontendUrl}/admin-approval-failed`);
  }
}
