'use client';

import {
  Box,
  Card,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Switch,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconDeviceFloppy, IconEye, IconSettings } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { Button } from '@/src/components/atoms';

interface ContributionFieldConfig {
  id: string;
  label: string;
  description: string;
  isEnabled: boolean;
  isRequired: boolean;
}

export const AdminContributions = () => {
  const t = useTranslations('admin.contributions');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const [fields, setFields] = useState<ContributionFieldConfig[]>([
    {
      id: 'email',
      label: t('fields.email.label'),
      description: t('fields.email.description'),
      isEnabled: true,
      isRequired: true,
    },
    {
      id: 'name',
      label: t('fields.name.label'),
      description: t('fields.name.description'),
      isEnabled: true,
      isRequired: true,
    },
    {
      id: 'country',
      label: t('fields.country.label'),
      description: t('fields.country.description'),
      isEnabled: true,
      isRequired: false,
    },
    {
      id: 'year',
      label: t('fields.year.label'),
      description: t('fields.year.description'),
      isEnabled: true,
      isRequired: false,
    },
    {
      id: 'description',
      label: t('fields.description.label'),
      description: t('fields.description.description'),
      isEnabled: true,
      isRequired: true,
    },
    {
      id: 'file',
      label: t('fields.file.label'),
      description: t('fields.file.description'),
      isEnabled: false,
      isRequired: false,
    },
    {
      id: 'tags',
      label: t('fields.tags.label'),
      description: t('fields.tags.description'),
      isEnabled: true,
      isRequired: false,
    },
    {
      id: 'sources',
      label: t('fields.sources.label'),
      description: t('fields.sources.description'),
      isEnabled: true,
      isRequired: false,
    },
  ]);

  const toggleField = (fieldId: string) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, isEnabled: !field.isEnabled }
          : field,
      ),
    );
  };

  const toggleRequired = (fieldId: string) => {
    setFields(
      fields.map((field) =>
        field.id === fieldId
          ? { ...field, isRequired: !field.isRequired }
          : field,
      ),
    );
  };

  const enabledFields = fields.filter((f) => f.isEnabled);

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

      <Grid gutter='lg'>
        {/* Settings Panel */}
        <Grid.Col span={isMobile ? 12 : 7}>
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
              <Group gap='sm'>
                <IconSettings size={20} color='#fbbf24' />
                <Title order={3} c='white' fz='1.1rem' fw={600}>
                  {t('settings.title')}
                </Title>
              </Group>
              <Button leftSection={<IconDeviceFloppy size={16} />}>
                {t('settings.save')}
              </Button>
            </Group>

            <Stack gap='md'>
              {fields.map((field, index) => (
                <Box key={field.id}>
                  {index > 0 ? (
                    <Divider mb='md' color='rgba(255, 255, 255, 0.1)' />
                  ) : null}
                  <Group justify='space-between' wrap='nowrap'>
                    <Box style={{ flex: 1 }}>
                      <Text c='white' fw={500} fz='0.95rem'>
                        {field.label}
                      </Text>
                      <Text c='rgba(255, 255, 255, 0.5)' fz='0.85rem'>
                        {field.description}
                      </Text>
                    </Box>
                    <Group gap='md' wrap='nowrap'>
                      <Box ta='center'>
                        <Text c='rgba(255, 255, 255, 0.5)' fz='0.75rem' mb={4}>
                          {t('settings.required')}
                        </Text>
                        <Switch
                          checked={field.isRequired}
                          onChange={() => toggleRequired(field.id)}
                          disabled={!field.isEnabled}
                          color='green'
                          size='sm'
                        />
                      </Box>
                      <Box ta='center'>
                        <Text c='rgba(255, 255, 255, 0.5)' fz='0.75rem' mb={4}>
                          {t('settings.enabled')}
                        </Text>
                        <Switch
                          checked={field.isEnabled}
                          onChange={() => toggleField(field.id)}
                          color='yellow'
                          size='sm'
                        />
                      </Box>
                    </Group>
                  </Group>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Preview Panel */}
        <Grid.Col span={isMobile ? 12 : 5}>
          <Paper
            p='lg'
            radius='md'
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              position: 'sticky',
              top: 80,
            }}
          >
            <Group gap='sm' mb='lg'>
              <IconEye size={20} color='#fbbf24' />
              <Title order={3} c='white' fz='1.1rem' fw={600}>
                {t('preview.title')}
              </Title>
            </Group>

            <Card
              p='md'
              radius='sm'
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
              }}
            >
              <Text c='rgba(255, 255, 255, 0.7)' fz='0.9rem' fw={500} mb='md'>
                {t('preview.formTitle')}
              </Text>
              <Stack gap='sm'>
                {enabledFields.map((field) => (
                  <TextInput
                    key={field.id}
                    label={field.isRequired ? `${field.label} *` : field.label}
                    placeholder={`Enter ${field.label.toLowerCase()}...`}
                    disabled
                    styles={{
                      label: {
                        color: 'rgba(255, 255, 255, 0.6)',
                        fontSize: '0.8rem',
                      },
                      input: {
                        backgroundColor: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'rgba(255, 255, 255, 0.4)',
                        fontSize: '0.85rem',
                        '&:disabled': {
                          backgroundColor: 'rgba(255, 255, 255, 0.03)',
                          opacity: 0.7,
                        },
                      },
                    }}
                  />
                ))}
                <Button disabled fullWidth mt='sm'>
                  {t('preview.submitButton')}
                </Button>
              </Stack>
            </Card>

            <Text c='rgba(255, 255, 255, 0.4)' fz='0.8rem' ta='center' mt='md'>
              {t('preview.note')}
            </Text>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
