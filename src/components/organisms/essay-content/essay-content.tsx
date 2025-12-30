'use client';

import { Box, Group, Image, Stack, Text, Title } from '@mantine/core';
import { IconClock } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import { EraBadge } from '@/src/components/atoms';
import { EssayContentBlock } from '@/src/components/molecules';
import type { Essay } from '@/src/types';

interface EssayContentProps {
  essay: Essay;
}

export const EssayContent = ({ essay }: EssayContentProps) => {
  const t = useTranslations('timeline.essay');

  // Format year (handle BCE years)
  const formattedYear =
    essay.year < 0 ? `${Math.abs(essay.year)} BCE` : `${essay.year} CE`;

  return (
    <Box
      style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '0 2rem 4rem',
      }}
    >
      {/* Essay Header */}
      <Stack gap='md' mb='xl'>
        <Group gap='md'>
          <Text
            size='sm'
            fw={600}
            style={{ color: 'rgba(255, 255, 255, 0.6)' }}
          >
            {formattedYear}
          </Text>
          <EraBadge era={essay.era} />
        </Group>

        <Title order={1} style={{ color: '#fff', fontSize: '2.5rem' }}>
          {essay.title}
        </Title>

        {essay.subtitle ? (
          <Text size='xl' style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            {essay.subtitle}
          </Text>
        ) : null}

        <Group gap='md' style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          <Group gap={4}>
            <IconClock size={14} />
            <Text size='sm'>
              {essay.readingTimeMinutes} {t('minRead')}
            </Text>
          </Group>
        </Group>
      </Stack>

      {/* Cover Image */}
      {essay.coverImageUrl ? (
        <Box mb='xl'>
          <Image
            src={essay.coverImageUrl}
            alt={essay.title}
            radius='md'
            style={{
              width: '100%',
              maxHeight: 400,
              objectFit: 'cover',
            }}
          />
        </Box>
      ) : null}

      {/* Summary */}
      {essay.summary ? (
        <Text
          size='lg'
          mb='xl'
          style={{
            color: 'rgba(255, 255, 255, 0.85)',
            lineHeight: 1.8,
            fontStyle: 'italic',
            borderLeft: '3px solid rgba(74, 158, 255, 0.5)',
            paddingLeft: '1rem',
          }}
        >
          {essay.summary}
        </Text>
      ) : null}

      {/* Content Blocks */}
      <Stack gap={0}>
        {essay.contentBlocks.map((block) => (
          <EssayContentBlock key={block.id} block={block} />
        ))}
      </Stack>

      {/* Tags */}
      {essay.tags.length > 0 ? (
        <Box
          mt='xl'
          pt='xl'
          style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}
        >
          <Text
            size='xs'
            fw={600}
            tt='uppercase'
            mb='sm'
            style={{ color: 'rgba(255, 255, 255, 0.5)' }}
          >
            {t('tags')}
          </Text>
          <Group gap='xs'>
            {essay.tags.map((tag) => (
              <Text
                key={tag}
                size='sm'
                style={{
                  color: 'rgba(255, 255, 255, 0.7)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  padding: '4px 12px',
                  borderRadius: 16,
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                #{tag}
              </Text>
            ))}
          </Group>
        </Box>
      ) : null}
    </Box>
  );
};
