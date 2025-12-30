import { put } from '@vercel/blob';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { withAuth } from '@/src/lib/auth';

export async function POST(request: NextRequest) {
  const authResult = await withAuth(request);

  if (authResult instanceof NextResponse) {
    return authResult;
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { error: 'Bad request', message: 'No file provided' },
        { status: 400 },
      );
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        {
          error: 'Bad request',
          message:
            'Invalid file type. Only JPEG, PNG, GIF, and WebP are allowed.',
        },
        { status: 400 },
      );
    }

    const maxSize = 5 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'Bad request', message: 'File size exceeds 5MB limit' },
        { status: 400 },
      );
    }

    const timestamp = Date.now();
    const extension = file.name.split('.').pop();
    const filename = `profile-pictures/${authResult.userId}-${timestamp}.${extension}`;

    const blob = await put(filename, file, {
      access: 'public',
    });

    return NextResponse.json({
      url: blob.url,
      message: 'File uploaded successfully',
    });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Failed to upload file';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}
