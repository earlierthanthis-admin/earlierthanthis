'use client';

import { Badge } from '@mantine/core';
import { useTranslations } from 'next-intl';

import type { HistoricalEra } from '@/src/types';

// Era colors and labels
const eraConfig: Record<HistoricalEra, { color: string; bgColor: string }> = {
  Ancient: { color: '#c9a227', bgColor: 'rgba(201, 162, 39, 0.15)' },
  Medieval: { color: '#8b4513', bgColor: 'rgba(139, 69, 19, 0.15)' },
  EarlyModern: { color: '#4a7c59', bgColor: 'rgba(74, 124, 89, 0.15)' },
  Modern: { color: '#4a5568', bgColor: 'rgba(74, 85, 104, 0.15)' },
  Contemporary: { color: '#4a9eff', bgColor: 'rgba(74, 158, 255, 0.15)' },
};

interface EraBadgeProps {
  era: HistoricalEra;
  size?: 'xs' | 'sm' | 'md';
}

export const EraBadge = ({ era, size = 'sm' }: EraBadgeProps) => {
  const t = useTranslations('timeline.eras');
  const config = eraConfig[era];

  // Map era to translation key
  const eraLabels: Record<HistoricalEra, string> = {
    Ancient: t('ancient'),
    Medieval: t('medieval'),
    EarlyModern: t('earlyModern'),
    Modern: t('modern'),
    Contemporary: t('contemporary'),
  };

  return (
    <Badge
      size={size}
      style={{
        backgroundColor: config.bgColor,
        color: config.color,
        border: `1px solid ${config.color}40`,
        fontWeight: 500,
        textTransform: 'none',
      }}
    >
      {eraLabels[era]}
    </Badge>
  );
};
