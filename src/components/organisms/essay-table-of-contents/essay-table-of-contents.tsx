'use client';

import { Box, Stack, Text } from '@mantine/core';
import { useTranslations } from 'next-intl';

import { TableOfContentsItem } from '@/src/components/molecules';
import type { TableOfContentsEntry } from '@/src/types';

interface EssayTableOfContentsProps {
  entries: TableOfContentsEntry[];
  activeId: string | null;
}

export const EssayTableOfContents = ({
  entries,
  activeId,
}: EssayTableOfContentsProps) => {
  const t = useTranslations('timeline.essay');

  if (entries.length === 0) {
    return null;
  }

  return (
    <Box>
      <Text
        size='xs'
        fw={600}
        tt='uppercase'
        mb='md'
        style={{ color: 'rgba(255, 255, 255, 0.5)', letterSpacing: '0.05em' }}
      >
        {t('tableOfContents')}
      </Text>

      <Stack gap={2}>
        {entries.map((entry) => (
          <TableOfContentsItem
            key={entry.id}
            entry={entry}
            isActive={activeId === entry.id}
          />
        ))}
      </Stack>
    </Box>
  );
};
