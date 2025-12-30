'use client';

import {
  ActionIcon,
  Box,
  Drawer,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconMenu2, IconSearch, IconX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { CountryListItem, SortDropdown } from '@/src/components/molecules';
import { useCountries } from '@/src/hooks';
import { cardStyles } from '@/src/theme';
import type { SidebarSortOption } from '@/src/types';

interface TimelineSidebarProps {
  selectedCountryId: string | null;
}

const SIDEBAR_WIDTH = 280;
const TABLET_SIDEBAR_WIDTH = 240;

export const TimelineSidebar = ({
  selectedCountryId,
}: TimelineSidebarProps) => {
  const router = useRouter();
  const t = useTranslations('timeline.sidebar');
  const [isDrawerOpen, { open: openDrawer, close: closeDrawer }] =
    useDisclosure(false);

  // Responsive breakpoints
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(min-width: 769px) and (max-width: 1024px)');

  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] =
    useState<SidebarSortOption>('alphabetical');
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(
    new Set(),
  );

  const { countries, isLoading } = useCountries(sortOption);

  // Filter countries based on search
  const filteredCountries = useMemo(() => {
    if (!searchQuery.trim()) return countries;
    const query = searchQuery.toLowerCase();
    return countries.filter((country) =>
      country.name.toLowerCase().includes(query),
    );
  }, [countries, searchQuery]);

  const handleToggleExpand = (countryId: string) => {
    setExpandedCountries((previous) => {
      const next = new Set(previous);
      if (next.has(countryId)) {
        next.delete(countryId);
      } else {
        next.add(countryId);
      }
      return next;
    });
  };

  const handleSelectCountry = (countryId: string) => {
    router.push(`/timeline/${countryId}`);
    if (isMobile) {
      closeDrawer();
    }
  };

  const sidebarWidth = isTablet ? TABLET_SIDEBAR_WIDTH : SIDEBAR_WIDTH;

  const sidebarContent = (
    <>
      {/* Search and Sort */}
      <Stack gap='sm' p='md'>
        <TextInput
          placeholder={t('searchPlaceholder')}
          leftSection={<IconSearch size={16} />}
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
          size='sm'
          styles={{
            input: {
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#fff',
              '&::placeholder': {
                color: 'rgba(255, 255, 255, 0.4)',
              },
            },
          }}
        />
        <SortDropdown value={sortOption} onChange={setSortOption} />
      </Stack>

      {/* Country List */}
      <ScrollArea style={{ flex: 1 }} px='md' pb='md'>
        {isLoading ? (
          <Text size='sm' c='dimmed' ta='center' py='xl'>
            Loading...
          </Text>
        ) : filteredCountries.length === 0 ? (
          <Text size='sm' c='dimmed' ta='center' py='xl'>
            {t('noResults')}
          </Text>
        ) : (
          <Stack gap='xs'>
            {filteredCountries.map((country) => (
              <CountryListItem
                key={country.id}
                country={country}
                isExpanded={expandedCountries.has(country.id)}
                isSelected={selectedCountryId === country.id}
                onToggle={() => handleToggleExpand(country.id)}
                onSelect={() => handleSelectCountry(country.id)}
              />
            ))}
          </Stack>
        )}
      </ScrollArea>
    </>
  );

  // Mobile: Show hamburger menu and drawer
  if (isMobile) {
    return (
      <>
        {/* Mobile menu button */}
        <ActionIcon
          variant='filled'
          size='lg'
          onClick={openDrawer}
          style={{
            position: 'fixed',
            left: 16,
            top: 88,
            zIndex: 99,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
          }}
          aria-label={t('openMenu')}
        >
          <IconMenu2 size={20} />
        </ActionIcon>

        {/* Mobile drawer */}
        <Drawer
          opened={isDrawerOpen}
          onClose={closeDrawer}
          size='85%'
          padding={0}
          withCloseButton={false}
          styles={{
            content: {
              backgroundColor: 'rgba(10, 10, 20, 0.98)',
              backdropFilter: 'blur(20px)',
            },
          }}
        >
          <Box
            style={{
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 16,
            }}
          >
            {/* Close button */}
            <Box px='md' pb='sm'>
              <ActionIcon
                variant='subtle'
                onClick={closeDrawer}
                aria-label={t('closeMenu')}
              >
                <IconX size={20} />
              </ActionIcon>
            </Box>
            {sidebarContent}
          </Box>
        </Drawer>
      </>
    );
  }

  // Desktop/Tablet: Fixed sidebar
  return (
    <Box
      style={{
        ...cardStyles,
        width: sidebarWidth,
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        paddingTop: 80,
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      {sidebarContent}
    </Box>
  );
};
