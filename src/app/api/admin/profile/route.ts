import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { withAdminAuth } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { updateAdminSchema } from '@/src/lib/validators';

export async function GET(request: NextRequest) {
  const authResult = await withAdminAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const admin = await prisma.admin.findUnique({
      where: { id: authResult.userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profilePicture: true,
        superKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Not found', message: 'Admin not found' },
        { status: 404 },
      );
    }

    return NextResponse.json({
      ...admin,
      role: admin.superKey ? 'super_admin' : 'admin',
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

export async function PUT(request: NextRequest) {
  const authResult = await withAdminAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const body = await request.json();

    const validation = updateAdminSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const existingAdmin = await prisma.admin.findUnique({
      where: { id: authResult.userId },
    });

    if (!existingAdmin) {
      return NextResponse.json(
        { error: 'Not found', message: 'Admin not found' },
        { status: 404 },
      );
    }

    const updatedAdmin = await prisma.admin.update({
      where: { id: authResult.userId },
      data: validation.data,
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        profilePicture: true,
        superKey: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json({
      ...updatedAdmin,
      role: updatedAdmin.superKey ? 'super_admin' : 'admin',
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
