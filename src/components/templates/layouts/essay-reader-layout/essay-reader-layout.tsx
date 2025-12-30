'use client';

import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import type { ReactNode } from 'react';

import { ReadingProgressBar } from '@/src/components/atoms';
import { Navbar } from '@/src/components/organisms';
import { NIGHT_SKY_IMAGE_URL } from '@/src/constants';

interface EssayReaderLayoutProps {
  children: ReactNode;
  tableOfContents?: ReactNode;
}

const TOC_WIDTH = 250;

export const EssayReaderLayout = ({
  children,
  tableOfContents,
}: EssayReaderLayoutProps) => {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const shouldShowTableOfContents = !isMobile && !isTablet;

  return (
    <Box
      style={{
        minHeight: '100vh',
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.98)), url('${NIGHT_SKY_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Reading progress bar */}
      <ReadingProgressBar />

      {/* Fixed navbar */}
      <Box
        style={{ position: 'fixed', top: 3, left: 0, right: 0, zIndex: 100 }}
      >
        <Navbar />
      </Box>

      {/* Fixed Table of Contents - hidden on mobile and tablet */}
      {shouldShowTableOfContents ? (
        <Box
          style={{
            position: 'fixed',
            top: 100,
            left: 0,
            width: TOC_WIDTH,
            height: 'calc(100vh - 100px)',
            paddingLeft: '2rem',
            overflowY: 'auto',
            zIndex: 50,
          }}
        >
          {tableOfContents}
        </Box>
      ) : null}

      {/* Scrollable Content Area */}
      <Box
        style={{
          marginLeft: shouldShowTableOfContents ? TOC_WIDTH : 0,
          paddingTop: isMobile ? 80 : 100,
          paddingLeft: isMobile ? 16 : 40,
          paddingRight: isMobile ? 16 : 40,
          paddingBottom: '4rem',
          minHeight: '100vh',
        }}
      >
        {/* Center: Main Content */}
        <Box
          style={{
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};
