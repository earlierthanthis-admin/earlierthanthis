'use client';

import { UnstyledButton } from '@mantine/core';

import { scrollToElement } from '@/src/hooks';
import type { TableOfContentsEntry } from '@/src/types';

interface TableOfContentsItemProps {
  entry: TableOfContentsEntry;
  isActive: boolean;
}

export const TableOfContentsItem = ({
  entry,
  isActive,
}: TableOfContentsItemProps) => {
  const handleClick = () => {
    scrollToElement(entry.id);
  };

  // Indentation based on heading level
  const paddingLeft = (entry.level - 1) * 12 + 12;

  return (
    <UnstyledButton
      onClick={handleClick}
      style={{
        display: 'block',
        width: '100%',
        padding: '8px 12px',
        paddingLeft,
        borderLeft: isActive ? '2px solid #4a9eff' : '2px solid transparent',
        backgroundColor: isActive ? 'rgba(74, 158, 255, 0.1)' : 'transparent',
        color: isActive ? '#fff' : 'rgba(255, 255, 255, 0.6)',
        fontSize: entry.level === 2 ? '0.875rem' : '0.8125rem',
        fontWeight: isActive ? 500 : 400,
        transition: 'all 0.2s ease',
        borderRadius: '0 4px 4px 0',
        textAlign: 'left',
      }}
    >
      {entry.title}
    </UnstyledButton>
  );
};
