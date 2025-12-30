'use client';

import type { ReactNode } from 'react';

import { AdminLayout } from '@/src/components/templates';

interface AdminRootLayoutProps {
  children: ReactNode;
}

export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
