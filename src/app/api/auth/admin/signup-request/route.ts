import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { hashPassword, signAdminApprovalToken } from '@/src/lib/auth';
import {
  buildAdminApprovalLink,
  getAdminApprovalTemplate,
  sendEmail,
} from '@/src/lib/email';
import { prisma } from '@/src/lib/prisma';
import { emailSchema } from '@/src/lib/validators';

const superAdminEmail = process.env.SUPER_ADMIN_EMAIL;

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

    const existingAdmin = await prisma.admin.findUnique({
      where: { email },
    });

    if (existingAdmin) {
      return NextResponse.json(
        { error: 'Conflict', message: 'Admin with this email already exists' },
        { status: 409 },
      );
    }

    const randomPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await hashPassword(randomPassword);

    const approvalToken = await signAdminApprovalToken(
      email,
      hashedPassword,
      false,
    );
    const superAdminToken = await signAdminApprovalToken(
      email,
      hashedPassword,
      true,
    );

    const approvalLink = buildAdminApprovalLink(approvalToken);
    const superAdminLink = buildAdminApprovalLink(superAdminToken);

    if (!superAdminEmail) {
      return NextResponse.json(
        {
          error: 'Configuration error',
          message: 'Super admin email not configured',
        },
        { status: 500 },
      );
    }

    await sendEmail({
      to: superAdminEmail,
      subject: 'Approve New Admin Request',
      html: getAdminApprovalTemplate(
        email,
        randomPassword,
        approvalLink,
        superAdminLink,
      ),
    });

    return NextResponse.json({ message: 'Approval email sent to super admin' });
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { error: 'Server error', message: errorMessage },
      { status: 500 },
    );
  }
}
