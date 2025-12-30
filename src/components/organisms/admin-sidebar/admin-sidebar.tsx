'use client';

import {
  Box,
  Drawer,
  NavLink,
  ScrollArea,
  Stack,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBook,
  IconChevronLeft,
  IconChevronRight,
  IconGift,
  IconLayoutDashboard,
  IconSettings,
  IconTimeline,
  IconUsers,
  IconWorld,
} from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { useAdminAuth } from '@/src/hooks';

interface AdminSidebarProps {
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isDrawerOpen: boolean;
  onDrawerClose: () => void;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  isSuperAdminOnly?: boolean;
}

export const AdminSidebar = ({
  isCollapsed,
  onToggleCollapse,
  isDrawerOpen,
  onDrawerClose,
}: AdminSidebarProps) => {
  const t = useTranslations('admin.sidebar');
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { isSuperAdmin } = useAdminAuth();

  const navItems: NavItem[] = [
    {
      label: t('dashboard'),
      href: '/admin/dashboard',
      icon: <IconLayoutDashboard size={20} />,
    },
    {
      label: t('countries'),
      href: '/admin/countries',
      icon: <IconWorld size={20} />,
    },
    {
      label: t('timeline'),
      href: '/admin/timeline',
      icon: <IconTimeline size={20} />,
    },
    {
      label: t('essays'),
      href: '/admin/essays',
      icon: <IconBook size={20} />,
    },
    {
      label: t('contributions'),
      href: '/admin/contribution',
      icon: <IconGift size={20} />,
    },
    {
      label: t('settings'),
      href: '/admin/profile',
      icon: <IconSettings size={20} />,
    },
    {
      label: t('admins'),
      href: '/admin/admins',
      icon: <IconUsers size={20} />,
      isSuperAdminOnly: true,
    },
  ];

  const filteredNavItems = navItems.filter(
    (item) => !item.isSuperAdminOnly || isSuperAdmin,
  );

  const sidebarContent = (
    <Box
      h='100%'
      style={{
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Logo Section */}
      <Box
        p='md'
        style={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Link
          href='/admin/dashboard'
          style={{ textDecoration: 'none' }}
          onClick={onDrawerClose}
        >
          <Box
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            <Box
              style={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <IconLayoutDashboard size={20} color='#000' />
            </Box>
            {!isCollapsed ? (
              <Box>
                <Text
                  c='white'
                  fw={600}
                  fz='0.95rem'
                  style={{ lineHeight: 1.2 }}
                >
                  {t('appName')}
                </Text>
                <Text c='rgba(255, 255, 255, 0.5)' fz='0.75rem'>
                  {t('adminPanel')}
                </Text>
              </Box>
            ) : null}
          </Box>
        </Link>
      </Box>

      {/* Navigation Links */}
      <ScrollArea flex={1} p='sm'>
        <Stack gap='xs'>
          {filteredNavItems.map((item) => {
            const isActive = pathname === item.href;

            if (isCollapsed && !isMobile) {
              return (
                <Tooltip
                  key={item.href}
                  label={item.label}
                  position='right'
                  withArrow
                >
                  <UnstyledButton
                    component={Link}
                    href={item.href}
                    onClick={onDrawerClose}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '100%',
                      height: 44,
                      borderRadius: '8px',
                      color: isActive ? '#fbbf24' : 'rgba(255, 255, 255, 0.7)',
                      background: isActive
                        ? 'rgba(251, 191, 36, 0.15)'
                        : 'transparent',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    {item.icon}
                  </UnstyledButton>
                </Tooltip>
              );
            }

            return (
              <NavLink
                key={item.href}
                component={Link}
                href={item.href}
                onClick={onDrawerClose}
                label={item.label}
                leftSection={item.icon}
                active={isActive}
                styles={{
                  root: {
                    borderRadius: '8px',
                    color: isActive ? '#fbbf24' : 'rgba(255, 255, 255, 0.7)',
                    backgroundColor: isActive
                      ? 'rgba(251, 191, 36, 0.15)'
                      : 'transparent',
                    '&:hover': {
                      backgroundColor: isActive
                        ? 'rgba(251, 191, 36, 0.2)'
                        : 'rgba(255, 255, 255, 0.05)',
                    },
                  },
                  label: {
                    fontWeight: isActive ? 500 : 400,
                  },
                }}
              />
            );
          })}
        </Stack>
      </ScrollArea>

      {/* Collapse Toggle (Desktop Only) */}
      {!isMobile ? (
        <Box
          p='sm'
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <UnstyledButton
            onClick={onToggleCollapse}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: isCollapsed ? 'center' : 'flex-start',
              gap: '0.5rem',
              width: '100%',
              padding: '0.5rem',
              borderRadius: '8px',
              color: 'rgba(255, 255, 255, 0.5)',
              transition: 'all 0.2s ease',
            }}
          >
            {isCollapsed ? (
              <IconChevronRight size={18} />
            ) : (
              <>
                <IconChevronLeft size={18} />
                <Text fz='0.85rem'>{t('collapse')}</Text>
              </>
            )}
          </UnstyledButton>
        </Box>
      ) : null}
    </Box>
  );

  // Mobile: Use Drawer
  if (isMobile) {
    return (
      <Drawer
        opened={isDrawerOpen}
        onClose={onDrawerClose}
        size='280px'
        padding={0}
        styles={{
          content: {
            background:
              'linear-gradient(180deg, rgba(10, 10, 25, 0.98) 0%, rgba(5, 5, 15, 0.99) 100%)',
            backdropFilter: 'blur(20px)',
          },
          header: {
            display: 'none',
          },
        }}
      >
        {sidebarContent}
      </Drawer>
    );
  }

  // Desktop: Fixed Sidebar
  return (
    <Box
      component='aside'
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: isCollapsed ? 80 : 280,
        background:
          'linear-gradient(180deg, rgba(10, 10, 25, 0.98) 0%, rgba(5, 5, 15, 0.99) 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        zIndex: 100,
        transition: 'width 0.3s ease',
      }}
    >
      {sidebarContent}
    </Box>
  );
};
