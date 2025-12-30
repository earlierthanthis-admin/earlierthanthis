import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { prisma } from '@/src/lib/prisma';
import { updateUserSchema } from '@/src/lib/validators';

interface RouteParameters {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParameters) {
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
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

    if (!user) {
      return NextResponse.json(
        { error: 'Not found', message: 'User not found' },
        { status: 404 },
      );
    }

    return NextResponse.json(user);
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
  try {
    const { id } = await params;
    const body = await request.json();

    const validation = updateUserSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Validation error',
          message: validation.error.issues[0].message,
        },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!existingUser) {
      return NextResponse.json(
        { error: 'Not found', message: 'User not found' },
        { status: 404 },
      );
    }

    const user = await prisma.user.update({
      where: { id },
      data: validation.data,
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

    return NextResponse.json({
      message: 'User profile updated successfully',
      user,
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
  try {
    const { id } = await params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Not found', message: 'User not found' },
        { status: 404 },
      );
    }

    await prisma.authentication.deleteMany({
      where: { userId: id },
    });

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({
      message: `User with ID ${id} and all associations deleted successfully`,
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
