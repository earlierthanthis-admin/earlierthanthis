'use client';

import { Box, Button, Group, Loader, Stack, Text } from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { EssayContent, EssayTableOfContents } from '@/src/components/organisms';
import { EssayReaderLayout } from '@/src/components/templates/layouts';
import { useEssaysForYear, useScrollSpy } from '@/src/hooks';
import type { TableOfContentsEntry } from '@/src/types';

interface EssayReaderProps {
  countryId: string;
  year: number;
}

export const EssayReader = ({ countryId, year }: EssayReaderProps) => {
  const t = useTranslations('timeline.essay');
  const { essays, isLoading, isError } = useEssaysForYear(countryId, year);

  // Get the first essay (primary essay for this year)
  const essay = essays[0];

  // Build table of contents from heading blocks
  const tableOfContents = useMemo<TableOfContentsEntry[]>(() => {
    if (!essay) return [];

    return essay.contentBlocks
      .filter((block) => block.type === 'heading')
      .map((block) => ({
        id: block.id,
        title: block.content,
        level: block.metadata?.level ?? 2,
      }));
  }, [essay]);

  // Track active section for ToC highlighting
  const headingIds = useMemo(
    () => tableOfContents.map((entry) => entry.id),
    [tableOfContents],
  );
  const activeId = useScrollSpy(headingIds);

  if (isLoading) {
    return (
      <EssayReaderLayout>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Stack align='center' gap='md'>
            <Loader color='blue' size='lg' />
            <Text c='dimmed'>{t('loading')}</Text>
          </Stack>
        </Box>
      </EssayReaderLayout>
    );
  }

  if (isError || !essay) {
    return (
      <EssayReaderLayout>
        <Box
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
          }}
        >
          <Text c='red'>{t('error')}</Text>
        </Box>
      </EssayReaderLayout>
    );
  }

  return (
    <EssayReaderLayout
      tableOfContents={
        <EssayTableOfContents entries={tableOfContents} activeId={activeId} />
      }
    >
      {/* Back button */}
      <Box px='xl' mb='lg'>
        <Button
          component={Link}
          href={`/timeline/${countryId}`}
          variant='subtle'
          leftSection={<IconArrowLeft size={16} />}
          style={{
            color: 'rgba(255, 255, 255, 0.7)',
          }}
        >
          {t('backToTimeline')}
        </Button>
      </Box>

      {/* Essay content */}
      <EssayContent essay={essay} />

      {/* Related essays (if there are multiple) */}
      {essays.length > 1 && (
        <Box
          px='xl'
          mt='xl'
          pt='xl'
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            maxWidth: 720,
            margin: '0 auto',
          }}
        >
          <Text
            size='xs'
            fw={600}
            tt='uppercase'
            mb='md'
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            {t('relatedEssays')}
          </Text>
          <Stack gap='sm'>
            {essays.slice(1).map((relatedEssay) => (
              <Group
                key={relatedEssay.id}
                justify='space-between'
                style={{
                  padding: '1rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  borderRadius: 8,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Text style={{ color: '#fff' }}>{relatedEssay.title}</Text>
                <Text size='sm' style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                  {relatedEssay.readingTimeMinutes} {t('minRead')}
                </Text>
              </Group>
            ))}
          </Stack>
        </Box>
      )}
    </EssayReaderLayout>
  );
};
