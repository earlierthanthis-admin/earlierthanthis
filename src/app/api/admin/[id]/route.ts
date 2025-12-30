import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { withAdminAuth } from '@/src/lib/auth';
import { prisma } from '@/src/lib/prisma';
import { updateAdminSchema } from '@/src/lib/validators';

interface RouteParameters {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParameters) {
  try {
    const { id } = await params;

    const admin = await prisma.admin.findUnique({
      where: { id },
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

    return NextResponse.json(admin);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}

export async function PATCH(request: NextRequest, { params }: RouteParameters) {
  const authResult = await withAdminAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const { id } = await params;
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
      where: { id },
    });

    if (!existingAdmin) {
      return NextResponse.json(
        { error: 'Not found', message: 'Admin not found' },
        { status: 404 },
      );
    }

    await prisma.admin.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json({
      message: `Admin profile with ID ${id} has been updated successfully`,
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

export async function DELETE(
  request: NextRequest,
  { params }: RouteParameters,
) {
  const authResult = await withAdminAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  if (!authResult.isSuperAdmin) {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Super admin access required' },
      { status: 403 },
    );
  }

  try {
    const { id } = await params;

    const admin = await prisma.admin.findUnique({
      where: { id },
    });

    if (!admin) {
      return NextResponse.json(
        { error: 'Not found', message: 'Admin not found' },
        { status: 404 },
      );
    }

    await prisma.admin.delete({
      where: { id },
    });

    return NextResponse.json({
      message: `Admin with ID ${id} has been removed successfully`,
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
