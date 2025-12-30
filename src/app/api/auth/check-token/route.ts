import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { withAuth } from '@/src/lib/auth';

async function checkToken(request: NextRequest) {
  const authResult = await withAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  return NextResponse.json({
    message: 'Token is valid',
    userId: authResult.userId,
  });
}

export async function GET(request: NextRequest) {
  return checkToken(request);
}

export async function POST(request: NextRequest) {
  return checkToken(request);
}
