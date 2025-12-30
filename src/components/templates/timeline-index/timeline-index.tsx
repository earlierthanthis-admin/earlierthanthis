'use client';

import { Box, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconGlobe } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import {
  Navbar,
  StarFieldBackground,
  TimelineSidebar,
} from '@/src/components/organisms';
import { NIGHT_SKY_IMAGE_URL } from '@/src/constants';
import { cardStyles } from '@/src/theme';

const SIDEBAR_WIDTH = 280;
const TABLET_SIDEBAR_WIDTH = 240;
const NAVBAR_HEIGHT = 80;

export const TimelineIndex = () => {
  const t = useTranslations('timeline');
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
        background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.85), rgba(0, 0, 0, 0.95)), url('${NIGHT_SKY_IMAGE_URL}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        position: 'relative',
      }}
    >
      {/* Three.js Star Field Background */}
      <StarFieldBackground intensity={0.6} hasScrollParallax={false} />

      {/* Fixed navbar */}
      <Box
        style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100 }}
      >
        <Navbar />
      </Box>

      {/* Sidebar */}
      <TimelineSidebar selectedCountryId={null} />

      {/* Main content */}
      <Box
        style={{
          marginLeft: sidebarWidth,
          paddingTop: NAVBAR_HEIGHT,
          paddingLeft: isMobile ? 16 : 0,
          paddingRight: isMobile ? 16 : 0,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <Box
          style={{
            ...cardStyles,
            padding: isMobile ? '2rem' : '3rem',
            maxWidth: 500,
            textAlign: 'center',
            margin: '2rem',
            position: 'relative',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Stack align='center' gap='lg'>
            <Box
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, rgba(255, 215, 0, 0.2), rgba(201, 169, 89, 0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 30px rgba(255, 215, 0, 0.2)',
              }}
            >
              <IconGlobe size={36} color='#ffd700' />
            </Box>
            <Stack gap='xs' align='center'>
              <Title
                order={isMobile ? 3 : 2}
                style={{
                  color: '#fff',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
                }}
              >
                {t('index.title')}
              </Title>
              <Text
                size='md'
                style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  maxWidth: 350,
                  lineHeight: 1.6,
                }}
              >
                {t('index.description')}
              </Text>
            </Stack>
            {isMobile ? (
              <Text
                size='sm'
                style={{
                  color: 'rgba(255, 215, 0, 0.8)',
                  fontStyle: 'italic',
                }}
              >
                {t('index.mobileHint')}
              </Text>
            ) : null}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};
