'use client';

import { Group, Paper, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowRight } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { EraBadge, TimelineDot } from '@/src/components/atoms';
import { cardStyles } from '@/src/theme';
import type { Essay, HistoricalEra } from '@/src/types';

interface TimelineCardProps {
  year: number;
  essays: Essay[];
  countryId: string;
  era: HistoricalEra;
  isMajorEvent?: boolean;
  isActive?: boolean;
}

export const TimelineCard = ({
  year,
  essays,
  countryId,
  era,
  isMajorEvent = false,
  isActive = false,
}: TimelineCardProps) => {
  const t = useTranslations('timeline.page');
  const isMobile = useMediaQuery('(max-width: 768px)');

  // Format year (handle BCE years)
  const formattedYear = year < 0 ? `${Math.abs(year)} BCE` : `${year} CE`;

  // Get the first essay for preview
  const primaryEssay = essays[0];

  return (
    <Group gap={isMobile ? 'sm' : 'lg'} align='flex-start' wrap='nowrap'>
      {/* Timeline indicator */}
      <Stack align='center' gap={0} style={{ width: isMobile ? 16 : 24 }}>
        <TimelineDot
          era={era}
          isActive={isActive}
          isMajorEvent={isMajorEvent}
        />
      </Stack>

      {/* Card content */}
      <Paper
        component={Link}
        href={`/timeline/${countryId}/${year}`}
        style={{
          ...cardStyles,
          flex: 1,
          padding: isMobile ? '1rem' : '1.5rem',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isActive ? 'scale(1.02)' : 'scale(1)',
        }}
        styles={{
          root: {
            '&:hover': {
              transform: 'translateY(-2px) scale(1.01)',
              boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.6)',
            },
          },
        }}
      >
        <Stack gap={isMobile ? 'sm' : 'md'}>
          {/* Header */}
          <Group
            justify='space-between'
            align='flex-start'
            wrap={isMobile ? 'wrap' : 'nowrap'}
          >
            <Stack gap={4} style={{ flex: 1 }}>
              <Text
                size='xs'
                fw={600}
                style={{ color: 'rgba(255, 255, 255, 0.6)' }}
              >
                {formattedYear}
              </Text>
              <Title
                order={isMobile ? 4 : 3}
                style={{ color: '#fff' }}
                lineClamp={isMobile ? 2 : undefined}
              >
                {primaryEssay?.title ?? `Events of ${formattedYear}`}
              </Title>
            </Stack>
            <EraBadge era={era} />
          </Group>

          {/* Summary - hidden on mobile for compact view */}
          {primaryEssay?.summary && !isMobile ? (
            <Text
              size='sm'
              lineClamp={2}
              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
            >
              {primaryEssay.summary}
            </Text>
          ) : null}

          {/* Footer */}
          <Group justify='space-between' align='center'>
            <Text size='xs' style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
              {t('essays', { count: essays.length })}
            </Text>
            <Group gap='xs' style={{ color: '#4a9eff' }}>
              <Text size={isMobile ? 'xs' : 'sm'} fw={500}>
                {t('viewEssay')}
              </Text>
              <IconArrowRight size={isMobile ? 14 : 16} />
            </Group>
          </Group>
        </Stack>
      </Paper>
    </Group>
  );
};
