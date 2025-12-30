import { Box } from '@mantine/core';
import type { ReactNode } from 'react';

import { Navbar } from '@/src/components/organisms';
import { NIGHT_SKY_IMAGE_URL } from '@/src/constants';

interface AuthLayoutProps {
  children: ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <Box
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: '5rem',
        paddingBottom: '2rem',
      }}
    >
      <Navbar />
      <Box
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.8,
          backgroundImage: `url("${NIGHT_SKY_IMAGE_URL}")`,
          pointerEvents: 'none',
        }}
      />
      <Box
        p='md'
        style={{
          position: 'relative',
          zIndex: 1,
          width: '100%',
          maxWidth: '480px',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};
