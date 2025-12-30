'use client';

import { Select } from '@mantine/core';
import { IconSortAscending } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';

import type { SidebarSortOption } from '@/src/types';

interface SortDropdownProps {
  value: SidebarSortOption;
  onChange: (value: SidebarSortOption) => void;
}

export const SortDropdown = ({ value, onChange }: SortDropdownProps) => {
  const t = useTranslations('timeline.sidebar');

  const options = [
    { value: 'alphabetical', label: t('sortOptions.alphabetical') },
    { value: 'byRegion', label: t('sortOptions.byRegion') },
    { value: 'byHistoricalEra', label: t('sortOptions.byHistoricalEra') },
  ];

  return (
    <Select
      size='xs'
      value={value}
      onChange={(newValue) =>
        onChange((newValue as SidebarSortOption) ?? 'alphabetical')
      }
      data={options}
      leftSection={<IconSortAscending size={14} />}
      comboboxProps={{
        styles: {
          dropdown: {
            backgroundColor: 'rgba(20, 20, 40, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
          option: {
            color: 'rgba(255, 255, 255, 0.8)',
            fontSize: '0.75rem',
          },
        },
      }}
      styles={{
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          color: '#fff',
          fontSize: '0.75rem',
        },
      }}
    />
  );
};
