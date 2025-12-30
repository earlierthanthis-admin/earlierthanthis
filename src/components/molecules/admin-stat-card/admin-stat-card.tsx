'use client';

import { Box, Paper, Text, Title } from '@mantine/core';
import type { ReactNode } from 'react';

interface AdminStatCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export const AdminStatCard = ({
  title,
  value,
  icon,
  trend,
  color = '#fbbf24',
}: AdminStatCardProps) => {
  return (
    <Paper
      p='lg'
      radius='md'
      style={{
        background:
          'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Box
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        <Box>
          <Text c='rgba(255, 255, 255, 0.6)' fz='0.85rem' fw={500} mb='xs'>
            {title}
          </Text>
          <Title order={2} c='white' fz='2rem' fw={600}>
            {value}
          </Title>
          {trend ? (
            <Text
              fz='0.8rem'
              mt='xs'
              c={trend.isPositive ? '#10b981' : '#ef4444'}
            >
              {trend.isPositive ? '+' : ''}
              {trend.value}% from last month
            </Text>
          ) : null}
        </Box>
        <Box
          style={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            background: `${color}20`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: color,
          }}
        >
          {icon}
        </Box>
      </Box>
    </Paper>
  );
};
