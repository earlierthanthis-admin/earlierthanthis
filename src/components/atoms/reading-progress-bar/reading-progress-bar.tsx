'use client';

import { Box } from '@mantine/core';

import { useReadingProgress } from '@/src/hooks';

export const ReadingProgressBar = () => {
  const progress = useReadingProgress();

  return (
    <Box
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1000,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      }}
    >
      <Box
        style={{
          height: '100%',
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #4a9eff 0%, #00d4ff 100%)',
          transition: 'width 0.1s ease-out',
          boxShadow: '0 0 8px #4a9eff',
        }}
      />
    </Box>
  );
};
