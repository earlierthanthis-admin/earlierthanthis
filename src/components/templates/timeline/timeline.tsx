'use client';

import { Box, Button, Loader, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconArrowLeft, IconMapPin } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { TimelineVisual } from '@/src/components/organisms';
import { TimelineLayout } from '@/src/components/templates/layouts';
import { useCountryTimeline } from '@/src/hooks';
import { cardStyles } from '@/src/theme';

interface TimelineProps {
  countryId: string;
}

export const Timeline = ({ countryId }: TimelineProps) => {
  const t = useTranslations('timeline.page');
  const isMobile = useMediaQuery('(max-width: 768px)');
  const { timeline, country, events, totalEssays, isLoading, isError } =
    useCountryTimeline(countryId);

  if (isLoading) {
    return (
      <TimelineLayout selectedCountryId={countryId}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
          }}
        >
          <Stack align='center' gap='lg'>
            <Box
              style={{
                width: 80,
                height: 80,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, rgba(74, 158, 255, 0.2), rgba(139, 92, 246, 0.2))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Loader color='blue' size='lg' />
            </Box>
            <Text size='lg' style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
              {t('loading')}
            </Text>
          </Stack>
        </Box>
      </TimelineLayout>
    );
  }

  if (isError || !timeline) {
    // Format country name from slug
    const formattedCountryName = countryId
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return (
      <TimelineLayout selectedCountryId={countryId}>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            padding: isMobile ? '1rem' : '2rem',
          }}
        >
          <Box
            style={{
              ...cardStyles,
              padding: isMobile ? '2rem' : '3rem',
              maxWidth: 500,
              textAlign: 'center',
            }}
          >
            <Stack align='center' gap='lg'>
              <Box
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: '50%',
                  background:
                    'linear-gradient(135deg, rgba(255, 107, 107, 0.2), rgba(255, 159, 67, 0.2))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <IconMapPin size={36} color='#ff6b6b' />
              </Box>
              <Stack gap='xs' align='center'>
                <Title order={3} style={{ color: '#fff' }}>
                  {t('noDataTitle', { country: formattedCountryName })}
                </Title>
                <Text
                  size='md'
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    maxWidth: 350,
                  }}
                >
                  {t('noDataDescription')}
                </Text>
              </Stack>
              <Button
                component={Link}
                href='/'
                leftSection={<IconArrowLeft size={16} />}
                variant='light'
                color='blue'
                size='md'
              >
                {t('backToGlobe')}
              </Button>
            </Stack>
          </Box>
        </Box>
      </TimelineLayout>
    );
  }

  return (
    <TimelineLayout selectedCountryId={countryId}>
      <Box px={isMobile ? 'sm' : 'xl'}>
        {/* Header */}
        <Box
          mb='xl'
          py='xl'
          style={{
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Stack gap='md'>
            <Title
              order={1}
              style={{
                color: '#fff',
                fontSize: isMobile ? '1.75rem' : '2.5rem',
                background: 'linear-gradient(135deg, #fff 0%, #4a9eff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {t('title', { country: country?.name ?? countryId })}
            </Title>
            <Text
              size={isMobile ? 'md' : 'lg'}
              style={{ color: 'rgba(255, 255, 255, 0.6)' }}
            >
              {t('subtitle', { country: country?.name ?? countryId })}
            </Text>
            <Box
              style={{
                display: 'flex',
                gap: '1.5rem',
                flexWrap: 'wrap',
                marginTop: '0.5rem',
              }}
            >
              <Box
                style={{
                  ...cardStyles,
                  padding: '0.75rem 1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Text size='sm' fw={600} style={{ color: '#4a9eff' }}>
                  {events.length}
                </Text>
                <Text size='sm' style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {t('yearsOfHistory')}
                </Text>
              </Box>
              <Box
                style={{
                  ...cardStyles,
                  padding: '0.75rem 1.25rem',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <Text size='sm' fw={600} style={{ color: '#8b5cf6' }}>
                  {totalEssays}
                </Text>
                <Text size='sm' style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  {t('essaysToExplore')}
                </Text>
              </Box>
            </Box>
          </Stack>
        </Box>

        {/* Timeline */}
        <TimelineVisual events={events} countryId={countryId} />
      </Box>
    </TimelineLayout>
  );
};
