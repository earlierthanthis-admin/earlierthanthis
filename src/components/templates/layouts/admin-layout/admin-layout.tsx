'use client';

import { Box, Loader } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import type { ReactNode } from 'react';
import { useEffect } from 'react';

import { AdminNavbar, AdminSidebar } from '@/src/components/organisms';
import { useAdminAuth } from '@/src/hooks';

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const router = useRouter();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [isCollapsed, { toggle: toggleCollapse }] = useDisclosure(false);
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { isAuthenticated, isLoading } = useAdminAuth();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/admin-login');
    }
  }, [isAuthenticated, isLoading, router]);

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <Box
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#050514',
        }}
      >
        <Loader color='yellow' size='lg' />
      </Box>
    );
  }

  // Don't render content if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const sidebarWidth = isMobile ? 0 : isCollapsed ? 80 : 280;

  return (
    <Box
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #050514 0%, #0a0a1a 50%, #050514 100%)',
      }}
    >
      {/* Sidebar */}
      <AdminSidebar
        isCollapsed={isCollapsed}
        onToggleCollapse={toggleCollapse}
        isDrawerOpen={isDrawerOpen}
        onDrawerClose={closeDrawer}
      />

      {/* Navbar */}
      <AdminNavbar
        isSidebarCollapsed={isCollapsed}
        onToggleSidebar={openDrawer}
      />

      {/* Main Content */}
      <Box
        component='main'
        style={{
          marginLeft: sidebarWidth,
          marginTop: 64,
          minHeight: 'calc(100vh - 64px)',
          padding: isMobile ? '1rem' : '1.5rem',
          transition: 'margin-left 0.3s ease',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
