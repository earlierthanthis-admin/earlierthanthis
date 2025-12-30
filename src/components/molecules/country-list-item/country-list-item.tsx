'use client';

import {
  Box,
  Collapse,
  Group,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronDown,
  IconChevronRight,
  IconMapPin,
} from '@tabler/icons-react';

import type { Country } from '@/src/types';

interface CountryListItemProps {
  country: Country;
  isExpanded: boolean;
  isSelected: boolean;
  onToggle: () => void;
  onSelect: () => void;
}

export const CountryListItem = ({
  country,
  isExpanded,
  isSelected,
  onToggle,
  onSelect,
}: CountryListItemProps) => {
  const hasSubRegions = country.subRegions.length > 0;

  return (
    <Box>
      <Group gap='xs' wrap='nowrap'>
        {/* Expand/collapse button */}
        {hasSubRegions ? (
          <UnstyledButton
            onClick={(event) => {
              event.stopPropagation();
              onToggle();
            }}
            style={{
              padding: 4,
              borderRadius: 4,
              color: 'rgba(255, 255, 255, 0.6)',
              transition: 'all 0.2s ease',
            }}
          >
            {isExpanded ? (
              <IconChevronDown size={14} />
            ) : (
              <IconChevronRight size={14} />
            )}
          </UnstyledButton>
        ) : null}

        {/* Country button */}
        <UnstyledButton
          onClick={onSelect}
          style={{
            flex: 1,
            padding: '8px 12px',
            borderRadius: 8,
            backgroundColor: isSelected
              ? 'rgba(74, 158, 255, 0.15)'
              : 'transparent',
            border: isSelected
              ? '1px solid rgba(74, 158, 255, 0.3)'
              : '1px solid transparent',
            transition: 'all 0.2s ease',
          }}
        >
          <Group gap='xs' wrap='nowrap'>
            <IconMapPin
              size={16}
              style={{
                color: isSelected ? '#4a9eff' : 'rgba(255, 255, 255, 0.4)',
              }}
            />
            <Text
              size='sm'
              fw={isSelected ? 600 : 400}
              style={{
                color: isSelected ? '#fff' : 'rgba(255, 255, 255, 0.8)',
              }}
            >
              {country.name}
            </Text>
          </Group>
        </UnstyledButton>
      </Group>

      {/* Sub-regions */}
      {hasSubRegions ? (
        <Collapse in={isExpanded}>
          <Stack gap={2} pl={32} pt='xs'>
            {country.subRegions.map((subRegion) => (
              <Text
                key={subRegion.id}
                size='xs'
                style={{
                  color: 'rgba(255, 255, 255, 0.5)',
                  padding: '4px 8px',
                  borderLeft: '2px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {subRegion.name}
              </Text>
            ))}
          </Stack>
        </Collapse>
      ) : null}
    </Box>
  );
};
