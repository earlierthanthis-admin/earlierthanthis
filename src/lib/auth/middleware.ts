import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { verifyToken } from './jwt';

export interface AuthenticatedRequest extends NextRequest {
  userId?: string;
  userRole?: string;
}

export async function withAuth(
  request: NextRequest,
): Promise<{ userId: string; role?: string } | NextResponse> {
  const authHeader = request.headers.get('authorization');

  if (!authHeader?.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'No token provided' },
      { status: 401 },
    );
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = await verifyToken(token);

    if (!payload.id) {
      return NextResponse.json(
        { error: 'Unauthorized', message: 'Invalid token' },
        { status: 401 },
      );
    }

    return { userId: payload.id, role: payload.role };
  } catch {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Invalid or expired token' },
      { status: 401 },
    );
  }
}

export async function withAdminAuth(
  request: NextRequest,
): Promise<
  { userId: string; role: string; isSuperAdmin: boolean } | NextResponse
> {
  const result = await withAuth(request);

  if (result instanceof NextResponse) {
    return result;
  }

  if (result.role !== 'admin' && result.role !== 'super_admin') {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Admin access required' },
      { status: 403 },
    );
  }

  return {
    userId: result.userId,
    role: result.role,
    isSuperAdmin: result.role === 'super_admin',
  };
}
