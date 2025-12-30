'use client';

import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { ReactNode } from 'react';

import { Navbar, TimelineSidebar } from '@/src/components/organisms';
import { NIGHT_SKY_IMAGE_URL } from '@/src/constants';

interface TimelineLayoutProps {
  children: ReactNode;
  selectedCountryId: string | null;
}

const SIDEBAR_WIDTH = 280;
const TABLET_SIDEBAR_WIDTH = 240;
const NAVBAR_HEIGHT = 80;

export const TimelineLayout = ({
  children,
  selectedCountryId,
}: TimelineLayoutProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const sidebarWidth = isMobile
    ? 0
    : isTablet
      ? TABLET_SIDEBAR_WIDTH
      : SIDEBAR_WIDTH;

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.95)), url('${NIGHT_SKY_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Fixed navbar */}
      <Box
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <Navbar />
      </Box>

      {/* Sidebar */}
      <TimelineSidebar selectedCountryId={selectedCountryId} />

      {/* Main content */}
      <Box
        style={{
          marginLeft: sidebarWidth,
          paddingTop: NAVBAR_HEIGHT,
          paddingLeft: isMobile ? 16 : 0,
          paddingRight: isMobile ? 16 : 0,
          minHeight: '100vh',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
