'use client';

import { Box } from '@mantine/core';

import type { HistoricalEra } from '@/src/types';

// Era colors for visual distinction
const eraColors: Record<HistoricalEra, string> = {
  Ancient: '#c9a227',
  Medieval: '#8b4513',
  EarlyModern: '#4a7c59',
  Modern: '#4a5568',
  Contemporary: '#4a9eff',
};

interface TimelineDotProps {
  era: HistoricalEra;
  isActive?: boolean;
  isMajorEvent?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const sizeMap = {
  sm: 12,
  md: 16,
  lg: 24,
};

export const TimelineDot = ({
  era,
  isActive = false,
  isMajorEvent = false,
  size = 'md',
}: TimelineDotProps) => {
  const dotSize = sizeMap[size];
  const baseColor = eraColors[era];

  return (
    <Box
      style={{
        width: dotSize,
        height: dotSize,
        borderRadius: '50%',
        backgroundColor: isActive ? baseColor : 'rgba(255, 255, 255, 0.2)',
        border: `2px solid ${baseColor}`,
        boxShadow: isMajorEvent
          ? `0 0 12px ${baseColor}, 0 0 24px ${baseColor}40`
          : isActive
            ? `0 0 8px ${baseColor}80`
            : 'none',
        transition: 'all 0.3s ease',
        flexShrink: 0,
        position: 'relative',
      }}
    >
      {isMajorEvent ? (
        <Box
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: dotSize * 2,
            height: dotSize * 2,
            borderRadius: '50%',
            border: `1px solid ${baseColor}40`,
            animation: 'pulse 2s infinite',
          }}
        />
      ) : null}
    </Box>
  );
};
