'use client';

import {
  ActionIcon,
  Badge,
  Box,
  Button as MantineButton,
  Card,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Tabs,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBook,
  IconCalendar,
  IconDeviceFloppy,
  IconLink,
  IconMapPin,
  IconPhoto,
  IconPlus,
  IconTrash,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Button } from '@/src/components/atoms';
import { mockCountries } from '@/src/data/mock/countries';
import type { AdminContentBlock } from '@/src/types';

// Mock essays data
const mockEssays = [
  {
    id: 'e1',
    countryId: 'united-states',
    year: 1776,
    title: 'The Declaration of Independence',
    subtitle: 'The Birth of American Freedom',
    summary:
      'The Declaration of Independence marked the formal separation of the thirteen American colonies from British rule.',
    coverImageUrl: '',
    contentBlocks: [
      {
        id: 'b1',
        type: 'paragraph' as const,
        content:
          'In the summer of 1776, representatives from the thirteen colonies gathered in Philadelphia...',
      },
      {
        id: 'b2',
        type: 'heading' as const,
        content: 'The Committee of Five',
        metadata: { level: 2 as const },
      },
    ],
    tags: ['revolution', 'independence', 'founding'],
    era: 'EarlyModern',
    readingTimeMinutes: 8,
  },
  {
    id: 'e2',
    countryId: 'united-states',
    year: 1776,
    title: 'The Birth of a Nation',
    subtitle: 'From Colonies to Country',
    summary:
      'How thirteen disparate colonies came together to form a new nation.',
    coverImageUrl: '',
    contentBlocks: [],
    tags: ['colonial', 'unity'],
    era: 'EarlyModern',
    readingTimeMinutes: 6,
  },
];

export const AdminEssays = () => {
  const t = useTranslations('admin.essays');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedProvince, setSelectedProvince] = useState<string | null>(null);
  const [selectedYear, setSelectedYear] = useState<string | null>(null);
  const [selectedEssayId, setSelectedEssayId] = useState<string | null>(null);

  // Essay editing state
  const [essayTitle, setEssayTitle] = useState('');
  const [essaySubtitle, setEssaySubtitle] = useState('');
  const [essaySummary, setEssaySummary] = useState('');
  const [essayTags, setEssayTags] = useState<string[]>([]);
  const [contentBlocks, setContentBlocks] = useState<AdminContentBlock[]>([]);

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

  const filteredEssays = useMemo(() => {
    return mockEssays.filter((essay) => {
      if (selectedCountry && essay.countryId !== selectedCountry) return false;
      if (selectedYear && essay.year !== Number(selectedYear)) return false;
      return true;
    });
  }, [selectedCountry, selectedYear]);

  const yearOptions = useMemo(() => {
    const essays = mockEssays.filter(
      (essay) => !selectedCountry || essay.countryId === selectedCountry,
    );
    const years = new Set(essays.map((essay) => essay.year));
    return Array.from(years)
      .sort((a, b) => a - b)
      .map((year) => ({
        value: String(year),
        label: String(year),
      }));
  }, [selectedCountry]);

  const essayOptions = useMemo(() => {
    return filteredEssays.map((essay) => ({
      value: essay.id,
      label: `${essay.title} (${essay.year})`,
    }));
  }, [filteredEssays]);

  const selectedEssay = useMemo(() => {
    return mockEssays.find((essay) => essay.id === selectedEssayId);
  }, [selectedEssayId]);

  const handleSelectEssay = (essayId: string | null) => {
    setSelectedEssayId(essayId);
    if (essayId) {
      const essay = mockEssays.find((item) => item.id === essayId);
      if (essay) {
        setEssayTitle(essay.title);
        setEssaySubtitle(essay.subtitle || '');
        setEssaySummary(essay.summary);
        setEssayTags(essay.tags);
        setContentBlocks(essay.contentBlocks as AdminContentBlock[]);
      }
    } else {
      setEssayTitle('');
      setEssaySubtitle('');
      setEssaySummary('');
      setEssayTags([]);
      setContentBlocks([]);
    }
  };

  const addContentBlock = (type: AdminContentBlock['type']) => {
    const newBlock: AdminContentBlock = {
      id: `block-${Date.now()}`,
      type,
      content: '',
      metadata:
        type === 'heading'
          ? { level: 2 }
          : type === 'list'
            ? { listType: 'unordered', listItems: [] }
            : undefined,
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateContentBlock = (
    id: string,
    updates: Partial<AdminContentBlock>,
  ) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === id ? { ...block, ...updates } : block,
      ),
    );
  };

  const removeContentBlock = (id: string) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id));
  };

  const inputStyles = {
    label: { color: 'rgba(255, 255, 255, 0.7)' },
    input: {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      color: 'white',
    },
  };

  const selectStyles = {
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
          <Grid.Col span={isMobile ? 12 : 3}>
            <Select
              label={t('filters.country')}
              placeholder={t('filters.selectCountry')}
              data={countryOptions}
              value={selectedCountry}
              onChange={(value) => {
                setSelectedCountry(value);
                setSelectedProvince(null);
                setSelectedYear(null);
                setSelectedEssayId(null);
              }}
              searchable
              clearable
              leftSection={<IconWorld size={16} />}
              styles={selectStyles}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 3}>
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
              styles={selectStyles}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 3}>
            <Select
              label={t('filters.year')}
              placeholder={t('filters.selectYear')}
              data={yearOptions}
              value={selectedYear}
              onChange={(value) => {
                setSelectedYear(value);
                setSelectedEssayId(null);
              }}
              disabled={!selectedCountry}
              clearable
              leftSection={<IconCalendar size={16} />}
              styles={selectStyles}
            />
          </Grid.Col>
          <Grid.Col span={isMobile ? 12 : 3}>
            <Select
              label={t('filters.essay')}
              placeholder={t('filters.selectEssay')}
              data={essayOptions}
              value={selectedEssayId}
              onChange={handleSelectEssay}
              disabled={!selectedCountry}
              clearable
              leftSection={<IconBook size={16} />}
              styles={selectStyles}
            />
          </Grid.Col>
        </Grid>
      </Paper>

      {/* Essay Editor */}
      {selectedEssay ? (
        <Paper
          p='lg'
          radius='md'
          style={{
            background:
              'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Group justify='space-between' mb='lg'>
            <Title order={3} c='white' fz='1.1rem' fw={600}>
              {t('editor.title')}
            </Title>
            <Button leftSection={<IconDeviceFloppy size={16} />}>
              {t('editor.save')}
            </Button>
          </Group>

          <Tabs
            defaultValue='content'
            styles={{
              tab: {
                color: 'rgba(255, 255, 255, 0.6)',
                '&[data-active]': {
                  color: '#fbbf24',
                  borderColor: '#fbbf24',
                },
              },
            }}
          >
            <Tabs.List mb='lg'>
              <Tabs.Tab value='content'>{t('editor.tabs.content')}</Tabs.Tab>
              <Tabs.Tab value='metadata'>{t('editor.tabs.metadata')}</Tabs.Tab>
              <Tabs.Tab value='media'>{t('editor.tabs.media')}</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value='content'>
              <Stack gap='md'>
                <TextInput
                  label={t('editor.fields.title')}
                  value={essayTitle}
                  onChange={(inputEvent) =>
                    setEssayTitle(inputEvent.target.value)
                  }
                  styles={inputStyles}
                />
                <TextInput
                  label={t('editor.fields.subtitle')}
                  value={essaySubtitle}
                  onChange={(inputEvent) =>
                    setEssaySubtitle(inputEvent.target.value)
                  }
                  styles={inputStyles}
                />
                <Textarea
                  label={t('editor.fields.summary')}
                  value={essaySummary}
                  onChange={(inputEvent) =>
                    setEssaySummary(inputEvent.target.value)
                  }
                  minRows={3}
                  styles={inputStyles}
                />

                <Box>
                  <Text c='rgba(255, 255, 255, 0.7)' fz='sm' mb='sm'>
                    {t('editor.contentBlocks')}
                  </Text>
                  <Stack gap='sm'>
                    {contentBlocks.map((block) => (
                      <Card
                        key={block.id}
                        p='sm'
                        style={{
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                        }}
                      >
                        <Group justify='space-between' mb='xs'>
                          <Badge variant='light' color='blue' size='sm'>
                            {block.type}
                          </Badge>
                          <ActionIcon
                            variant='subtle'
                            color='red'
                            size='sm'
                            onClick={() => removeContentBlock(block.id)}
                          >
                            <IconTrash size={14} />
                          </ActionIcon>
                        </Group>
                        <Textarea
                          value={block.content}
                          onChange={(inputEvent) =>
                            updateContentBlock(block.id, {
                              content: inputEvent.target.value,
                            })
                          }
                          placeholder={`${block.type} content...`}
                          minRows={2}
                          styles={inputStyles}
                        />
                      </Card>
                    ))}
                  </Stack>

                  <Group mt='md' gap='sm'>
                    <MantineButton
                      variant='subtle'
                      size='sm'
                      color='yellow'
                      leftSection={<IconPlus size={14} />}
                      onClick={() => addContentBlock('paragraph')}
                    >
                      Paragraph
                    </MantineButton>
                    <MantineButton
                      variant='subtle'
                      size='sm'
                      color='yellow'
                      leftSection={<IconPlus size={14} />}
                      onClick={() => addContentBlock('heading')}
                    >
                      Heading
                    </MantineButton>
                    <MantineButton
                      variant='subtle'
                      size='sm'
                      color='yellow'
                      leftSection={<IconPlus size={14} />}
                      onClick={() => addContentBlock('quote')}
                    >
                      Quote
                    </MantineButton>
                    <MantineButton
                      variant='subtle'
                      size='sm'
                      color='yellow'
                      leftSection={<IconPlus size={14} />}
                      onClick={() => addContentBlock('list')}
                    >
                      List
                    </MantineButton>
                  </Group>
                </Box>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value='metadata'>
              <Stack gap='md'>
                <TagsInput
                  label={t('editor.fields.tags')}
                  value={essayTags}
                  onChange={setEssayTags}
                  placeholder={t('editor.fields.tagsPlaceholder')}
                  styles={{
                    ...inputStyles,
                    pill: {
                      backgroundColor: 'rgba(251, 191, 36, 0.2)',
                      color: '#fbbf24',
                    },
                  }}
                />
                <Select
                  label={t('editor.fields.era')}
                  value={selectedEssay.era}
                  data={[
                    { value: 'Ancient', label: 'Ancient' },
                    { value: 'Medieval', label: 'Medieval' },
                    { value: 'EarlyModern', label: 'Early Modern' },
                    { value: 'Modern', label: 'Modern' },
                    { value: 'Contemporary', label: 'Contemporary' },
                  ]}
                  styles={selectStyles}
                />
                <Text c='rgba(255, 255, 255, 0.6)' fz='sm'>
                  {t('editor.readingTime')}: {selectedEssay.readingTimeMinutes}{' '}
                  min
                </Text>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value='media'>
              <Stack gap='md'>
                <Box>
                  <Text c='rgba(255, 255, 255, 0.7)' fz='sm' mb='sm'>
                    {t('editor.coverImage')}
                  </Text>
                  <MantineButton
                    variant='outline'
                    leftSection={<IconPhoto size={16} />}
                    styles={{
                      root: {
                        borderColor: 'rgba(255, 255, 255, 0.2)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                      },
                    }}
                  >
                    {t('editor.uploadImage')}
                  </MantineButton>
                </Box>
                <Box>
                  <Text c='rgba(255, 255, 255, 0.7)' fz='sm' mb='sm'>
                    {t('editor.videoLinks')}
                  </Text>
                  <Group gap='sm'>
                    <TextInput
                      placeholder='https://youtube.com/...'
                      leftSection={<IconLink size={16} />}
                      style={{ flex: 1 }}
                      styles={inputStyles}
                    />
                    <MantineButton
                      variant='subtle'
                      color='yellow'
                      leftSection={<IconPlus size={14} />}
                    >
                      {t('editor.addVideo')}
                    </MantineButton>
                  </Group>
                </Box>
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Paper>
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
            <IconBook
              size={64}
              color='rgba(255, 255, 255, 0.2)'
              style={{ marginBottom: 16 }}
            />
            <Title order={3} c='rgba(255, 255, 255, 0.7)' fz='1.25rem' mb='xs'>
              {t('selectEssayPrompt.title')}
            </Title>
            <Text c='rgba(255, 255, 255, 0.5)'>
              {t('selectEssayPrompt.description')}
            </Text>
          </Box>
        </Paper>
      )}
    </Box>
  );
};
