'use client';

import {
  ActionIcon,
  Badge,
  Box,
  Card,
  Grid,
  Group,
  NumberInput,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBook,
  IconCalendar,
  IconEdit,
  IconMapPin,
  IconTimeline,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { mockCountries } from '@/src/data/mock/countries';

// Mock timeline data
const mockTimelineEvents = [
  {
    id: '1',
    year: 1776,
    countryId: 'united-states',
    essays: [
      { id: 'e1', title: 'The Declaration of Independence' },
      { id: 'e2', title: 'The Birth of a Nation' },
    ],
    era: 'EarlyModern',
    isMajorEvent: true,
  },
  {
    id: '2',
    year: 1789,
    countryId: 'united-states',
    essays: [{ id: 'e3', title: 'The Constitution is Ratified' }],
    era: 'EarlyModern',
    isMajorEvent: true,
  },
  {
    id: '3',
    year: 1861,
    countryId: 'united-states',
    essays: [{ id: 'e4', title: 'The Civil War Begins' }],
    era: 'Modern',
    isMajorEvent: true,
  },
  {
    id: '4',
    year: 1865,
    countryId: 'united-states',
    essays: [
      { id: 'e5', title: 'End of the Civil War' },
      { id: 'e6', title: 'The Reconstruction Era' },
    ],
    era: 'Modern',
    isMajorEvent: true,
  },
  {
    id: '5',
    year: 1969,
    countryId: 'united-states',
    essays: [{ id: 'e7', title: 'Moon Landing' }],
    era: 'Contemporary',
    isMajorEvent: true,
  },
];

export const AdminTimeline = () => {
  const t = useTranslations('admin.timeline');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [editingEventId, setEditingEventId] = useState<string | null>(null);
  const [editingYear, setEditingYear] = useState<number | ''>('');

  const countryOptions = useMemo(() => {
    return mockCountries.map((country) => ({
      value: country.id,
      label: country.name,
    }));
  }, []);

  const selectedCountryData = useMemo(() => {
    return mockCountries.find((c) => c.id === selectedCountry);
  }, [selectedCountry]);

  const provinceOptions = useMemo(() => {
    if (!selectedCountryData) return [];
    return selectedCountryData.subRegions.map((sub) => ({
      value: sub.id,
      label: sub.name,
    }));
  }, [selectedCountryData]);

  const filteredEvents = useMemo(() => {
    return mockTimelineEvents.filter((event) => {
      if (selectedCountry && event.countryId !== selectedCountry) return false;
      return true;
    });
  }, [selectedCountry]);

  const yearOptions = useMemo(() => {
    const years = new Set(filteredEvents.map((event) => event.year));
    return Array.from(years)
      .sort((a, b) => a - b)
      .map((year) => ({
        value: String(year),
        label: String(year),
      }));
  }, [filteredEvents]);

  const displayedEvents = useMemo(() => {
    if (selectedYear) {
      return filteredEvents.filter(
        (event) => event.year === Number(selectedYear),
      );
    }
    return filteredEvents;
  }, [filteredEvents, selectedYear]);

  const handleEditYear = (eventId: string, currentYear: number) => {
    setEditingEventId(eventId);
    setEditingYear(currentYear);
  };

  const handleSaveYear = () => {
    // In production, this would call the API
    setEditingEventId(null);
    setEditingYear('');
  };

  const getEraColor = (era: string) => {
    const colors: Record<string, string> = {
      Ancient: 'orange',
      Medieval: 'grape',
      EarlyModern: 'blue',
      Modern: 'teal',
      Contemporary: 'green',
    };
    return colors[era] || 'gray';
  };

  return (
    <Box>
      {/* Page Header */}
      <Box mb='xl'>
        <Title order={1} c='white' fz='1.75rem' fw={600}>
          {t('title')}
        </Title>
        <Text c='rgba(255, 255, 255, 0.6)' fz='0.95rem'>
          {t('subtitle')}
        </Text>
      </Box>

      {/* Filters */}
      <Paper
        p='md'
        radius='md'
        mb='lg'
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Grid gutter='md'>
          <Grid.Col span={isMobile ? 12 : 4}>
            <Select
              label={t('filters.country')}
              placeholder={t('filters.selectCountry')}
              data={countryOptions}
              value={selectedCountry}
              onChange={(value) => {
                setSelectedCountry(value);
                setSelectedProvince(null);
                setSelectedYear(null);
              }}
              searchable
              clearable
              leftSection={<IconWorld size={16} />}
              styles={{
                label: { color: 'rgba(255, 255, 255, 0.7)' },
                input: {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'white',
                },
                dropdown: {
                  backgroundColor: 'rgba(20, 20, 40, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                },
                option: {
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&[data-selected]': {
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 4}>
            <Select
              label={t('filters.province')}
              placeholder={t('filters.selectProvince')}
              data={provinceOptions}
              value={selectedProvince}
              onChange={setSelectedProvince}
              disabled={!selectedCountry}
              searchable
              clearable
              leftSection={<IconMapPin size={16} />}
              styles={{
                label: { color: 'rgba(255, 255, 255, 0.7)' },
                input: {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  '&:disabled': {
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                dropdown: {
                  backgroundColor: 'rgba(20, 20, 40, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                },
                option: {
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&[data-selected]': {
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                },
              }}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 4}>
            <Select
              label={t('filters.year')}
              placeholder={t('filters.selectYear')}
              data={yearOptions}
              value={selectedYear}
              onChange={setSelectedYear}
              disabled={!selectedCountry}
              clearable
              leftSection={<IconCalendar size={16} />}
              styles={{
                label: { color: 'rgba(255, 255, 255, 0.7)' },
                input: {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'white',
                  '&:disabled': {
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                    color: 'rgba(255, 255, 255, 0.3)',
                  },
                },
                dropdown: {
                  backgroundColor: 'rgba(20, 20, 40, 0.95)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                },
                option: {
                  color: 'rgba(255, 255, 255, 0.8)',
                  '&[data-selected]': {
                    backgroundColor: 'rgba(251, 191, 36, 0.2)',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  },
                },
              }}
            />
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Timeline Events */}
      {selectedCountry ? (
        <Stack gap='md'>
          {displayedEvents.length > 0 ? (
            displayedEvents.map((event) => (
              <Paper
                key={event.id}
                p='lg'
                radius='md'
                style={{
                  background:
                    'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
                  border: event.isMajorEvent
                    ? '1px solid rgba(251, 191, 36, 0.3)'
                    : '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                <Group justify='space-between' align='flex-start'>
                  <Box>
                    <Group gap='md' mb='sm'>
                      {editingEventId === event.id ? (
                        <NumberInput
                          value={editingYear}
                          onChange={(value) =>
                            setEditingYear(value as number | '')
                          }
                          min={-5000}
                          max={2025}
                          w={100}
                          onBlur={handleSaveYear}
                          autoFocus
                          styles={{
                            input: {
                              backgroundColor: 'rgba(255, 255, 255, 0.1)',
                              border: '1px solid #fbbf24',
                              color: '#fbbf24',
                              fontWeight: 600,
                              fontSize: '1.25rem',
                            },
                          }}
                        />
                      ) : (
                        <Group gap='xs'>
                          <Title order={2} c='#fbbf24' fz='1.5rem'>
                            {event.year}
                          </Title>
                          <ActionIcon
                            variant='subtle'
                            color='yellow'
                            size='sm'
                            onClick={() => handleEditYear(event.id, event.year)}
                          >
                            <IconEdit size={14} />
                          </ActionIcon>
                        </Group>
                      )}
                      <Badge
                        variant='light'
                        color={getEraColor(event.era)}
                        size='sm'
                      >
                        {event.era}
                      </Badge>
                      {event.isMajorEvent ? (
                        <Badge
                          variant='light'
                          color='yellow'
                          size='sm'
                          styles={{
                            root: {
                              backgroundColor: 'rgba(251, 191, 36, 0.15)',
                              color: '#fbbf24',
                            },
                          }}
                        >
                          {t('majorEvent')}
                        </Badge>
                      ) : null}
                    </Group>

                    <Text c='rgba(255, 255, 255, 0.6)' fz='sm' mb='md'>
                      {event.essays.length}{' '}
                      {event.essays.length === 1 ? 'essay' : 'essays'}
                    </Text>

                    <Grid gutter='sm'>
                      {event.essays.map((essay) => (
                        <Grid.Col key={essay.id} span={isMobile ? 12 : 6}>
                          <Card
                            p='sm'
                            radius='sm'
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.03)',
                              border: '1px solid rgba(255, 255, 255, 0.08)',
                              cursor: 'pointer',
                            }}
                          >
                            <Group gap='sm'>
                              <IconBook
                                size={16}
                                color='rgba(255, 255, 255, 0.5)'
                              />
                              <Text c='white' fz='sm' fw={500}>
                                {essay.title}
                              </Text>
                            </Group>
                          </Card>
                        </Grid.Col>
                      ))}
                    </Grid>
                  </Box>
                </Group>
              </Paper>
            ))
          ) : (
            <Paper
              p='xl'
              radius='md'
              style={{
                background:
                  'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Box ta='center'>
                <IconTimeline
                  size={48}
                  color='rgba(255, 255, 255, 0.2)'
                  style={{ marginBottom: 16 }}
                />
                <Text c='rgba(255, 255, 255, 0.5)'>{t('noEvents')}</Text>
              </Box>
            </Paper>
          )}
        </Stack>
      ) : (
        <Paper
          p='xl'
          radius='md'
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Box ta='center'>
            <IconWorld
              size={64}
              color='rgba(255, 255, 255, 0.2)'
              style={{ marginBottom: 16 }}
            />
            <Title order={3} c='rgba(255, 255, 255, 0.7)' fz='1.25rem' mb='xs'>
              {t('selectCountryPrompt.title')}
            </Title>
            <Text c='rgba(255, 255, 255, 0.5)'>
              {t('selectCountryPrompt.description')}
            </Text>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
