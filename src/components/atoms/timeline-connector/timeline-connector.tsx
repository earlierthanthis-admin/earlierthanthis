'use client';

import { Box } from '@mantine/core';

interface TimelineConnectorProps {
  height?: number | string;
  isHighlighted?: boolean;
}

export const TimelineConnector = ({
  height = 60,
  isHighlighted = false,
}: TimelineConnectorProps) => {
  return (
    <Box
      style={{
        width: 2,
        height,
        background: isHighlighted
          ? 'linear-gradient(180deg, #4a9eff 0%, #4a9eff80 100%)'
          : 'linear-gradient(180deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 100%)',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
    />
  );
};
