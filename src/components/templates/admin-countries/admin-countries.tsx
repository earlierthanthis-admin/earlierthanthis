'use client';

import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Group,
  Modal,
  Paper,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {
  IconEdit,
  IconPlus,
  IconSearch,
  IconTrash,
  IconWorld,
} from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo, useState } from 'react';

import { Button as CustomButton } from '@/src/components/atoms';
import { mockCountries } from '@/src/data/mock/countries';
import type { Country, SubRegion } from '@/src/types';

export const AdminCountries = () => {
  const t = useTranslations('admin.countries');

  const [searchQuery, setSearchQuery] = useState('');
  const [regionFilter, setRegionFilter] = useState<string | null>(null);
  const [isEditModalOpen, { open: openEditModal, close: closeEditModal }] =
    useDisclosure(false);
  const [
    isSubRegionModalOpen,
    { open: openSubRegionModal, close: closeSubRegionModal },
  ] = useDisclosure(false);
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [editingSubRegion, setEditingSubRegion] = useState<SubRegion | null>(
    null,
  );
  const [newSubRegionName, setNewSubRegionName] = useState('');
  const [newSubRegionType, setNewSubRegionType] = useState<string>('province');

  const regions = useMemo(() => {
    const uniqueRegions = new Set(mockCountries.map((c) => c.region));
    return Array.from(uniqueRegions).map((region) => ({
      value: region,
      label: region.replace(/([A-Z])/g, ' $1').trim(),
    }));
  }, []);

  const filteredCountries = useMemo(() => {
    return mockCountries.filter((country) => {
      const isMatchingSearch = country.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const isMatchingRegion = !regionFilter || country.region === regionFilter;
      return isMatchingSearch && isMatchingRegion;
    });
  }, [searchQuery, regionFilter]);

  const handleEditCountry = (country: Country) => {
    setSelectedCountry(country);
    openEditModal();
  };

  const handleAddSubRegion = (country: Country) => {
    setSelectedCountry(country);
    setEditingSubRegion(null);
    setNewSubRegionName('');
    setNewSubRegionType('province');
    openSubRegionModal();
  };

  const handleEditSubRegion = (country: Country, subRegion: SubRegion) => {
    setSelectedCountry(country);
    setEditingSubRegion(subRegion);
    setNewSubRegionName(subRegion.name);
    setNewSubRegionType(subRegion.type);
    openSubRegionModal();
  };

  const getRegionColor = (region: string) => {
    const colors: Record<string, string> = {
      NorthAmerica: 'blue',
      SouthAmerica: 'green',
      Europe: 'grape',
      Asia: 'red',
      Africa: 'orange',
      Oceania: 'cyan',
      MiddleEast: 'yellow',
    };
    return colors[region] || 'gray';
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
        <Group gap='md' wrap='wrap'>
          <TextInput
            placeholder={t('searchPlaceholder')}
            leftSection={<IconSearch size={16} />}
            value={searchQuery}
            onChange={(inputEvent) => setSearchQuery(inputEvent.target.value)}
            style={{ flex: 1, minWidth: 200 }}
            styles={{
              input: {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'white',
                '&::placeholder': {
                  color: 'rgba(255, 255, 255, 0.4)',
                },
              },
            }}
          />
          <Select
            placeholder={t('filterByRegion')}
            data={regions}
            value={regionFilter}
            onChange={setRegionFilter}
            clearable
            style={{ minWidth: 180 }}
            styles={{
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
        </Group>
      </Paper>

      {/* Countries Table */}
      <Paper
        p='lg'
        radius='md'
        style={{
          background:
            'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Box style={{ overflowX: 'auto' }}>
          <Table
            striped
            highlightOnHover
            styles={{
              table: {
                backgroundColor: 'transparent',
                minWidth: 700,
              },
              tr: {
                backgroundColor: 'transparent',
                '&[data-striped]': {
                  backgroundColor: 'rgba(255, 255, 255, 0.02)',
                },
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                },
              },
              th: {
                color: 'rgba(255, 255, 255, 0.6)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                fontWeight: 500,
                whiteSpace: 'nowrap',
              },
              td: {
                color: 'rgba(255, 255, 255, 0.8)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
              },
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th>{t('table.country')}</Table.Th>
                <Table.Th>{t('table.isoCode')}</Table.Th>
                <Table.Th>{t('table.region')}</Table.Th>
                <Table.Th>{t('table.provinces')}</Table.Th>
                <Table.Th>{t('table.eras')}</Table.Th>
                <Table.Th style={{ textAlign: 'right' }}>
                  {t('table.actions')}
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {filteredCountries.map((country) => (
                <Table.Tr key={country.id}>
                  <Table.Td>
                    <Group gap='xs'>
                      <IconWorld size={18} color='#fbbf24' />
                      <Text fw={500}>{country.name}</Text>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      size='sm'
                      variant='light'
                      color='gray'
                      styles={{
                        root: {
                          backgroundColor: 'rgba(255, 255, 255, 0.1)',
                          color: 'rgba(255, 255, 255, 0.8)',
                        },
                      }}
                    >
                      {country.isoA2}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Badge
                      size='sm'
                      variant='light'
                      color={getRegionColor(country.region)}
                    >
                      {country.region.replace(/([A-Z])/g, ' $1').trim()}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{country.subRegions.length}</Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      {country.historicalEras.slice(0, 2).map((era) => (
                        <Badge
                          key={era}
                          size='xs'
                          variant='outline'
                          color='yellow'
                          styles={{
                            root: {
                              borderColor: 'rgba(251, 191, 36, 0.5)',
                              color: '#fbbf24',
                            },
                          }}
                        >
                          {era}
                        </Badge>
                      ))}
                      {country.historicalEras.length > 2 ? (
                        <Text fz='xs' c='rgba(255, 255, 255, 0.5)'>
                          +{country.historicalEras.length - 2}
                        </Text>
                      ) : null}
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap='xs' justify='flex-end'>
                      <ActionIcon
                        variant='subtle'
                        color='blue'
                        onClick={() => handleAddSubRegion(country)}
                      >
                        <IconPlus size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant='subtle'
                        color='yellow'
                        onClick={() => handleEditCountry(country)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>

        {filteredCountries.length === 0 ? (
          <Box ta='center' py='xl'>
            <IconWorld
              size={48}
              color='rgba(255, 255, 255, 0.2)'
              style={{ marginBottom: 8 }}
            />
            <Text c='rgba(255, 255, 255, 0.5)'>{t('noResults')}</Text>
          </Box>
        ) : null}
      </Paper>

      {/* Edit Country Modal */}
      <Modal
        opened={isEditModalOpen}
        onClose={closeEditModal}
        title={t('editModal.title')}
        centered
        size='lg'
        styles={{
          content: {
            background:
              'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(5, 5, 20, 0.99) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          },
          header: {
            backgroundColor: 'transparent',
          },
          title: {
            color: 'white',
            fontWeight: 600,
          },
          close: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
      >
        {selectedCountry ? (
          <Stack gap='md'>
            <TextInput
              label={t('editModal.countryName')}
              defaultValue={selectedCountry.name}
              styles={{
                label: { color: 'rgba(255, 255, 255, 0.7)' },
                input: {
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: 'white',
                },
              }}
            />

            <Box>
              <Text c='rgba(255, 255, 255, 0.7)' fz='sm' mb='xs'>
                {t('editModal.provinces')} ({selectedCountry.subRegions.length})
              </Text>
              <Stack gap='xs'>
                {selectedCountry.subRegions.map((subRegion) => (
                  <Paper
                    key={subRegion.id}
                    p='sm'
                    style={{
                      backgroundColor: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <Group justify='space-between'>
                      <Box>
                        <Text c='white' fw={500} fz='sm'>
                          {subRegion.name}
                        </Text>
                        <Badge size='xs' variant='light' color='gray'>
                          {subRegion.type}
                        </Badge>
                      </Box>
                      <Group gap='xs'>
                        <ActionIcon
                          variant='subtle'
                          color='yellow'
                          size='sm'
                          onClick={() =>
                            handleEditSubRegion(selectedCountry, subRegion)
                          }
                        >
                          <IconEdit size={14} />
                        </ActionIcon>
                        <ActionIcon variant='subtle' color='red' size='sm'>
                          <IconTrash size={14} />
                        </ActionIcon>
                      </Group>
                    </Group>
                  </Paper>
                ))}
              </Stack>
              <Button
                variant='subtle'
                color='blue'
                leftSection={<IconPlus size={14} />}
                mt='sm'
                size='sm'
                onClick={() => handleAddSubRegion(selectedCountry)}
              >
                {t('editModal.addProvince')}
              </Button>
            </Box>

            <Group justify='flex-end' mt='md'>
              <Button variant='subtle' color='gray' onClick={closeEditModal}>
                {t('editModal.cancel')}
              </Button>
              <CustomButton onClick={closeEditModal}>
                {t('editModal.save')}
              </CustomButton>
            </Group>
          </Stack>
        ) : null}
      </Modal>

      {/* Add/Edit SubRegion Modal */}
      <Modal
        opened={isSubRegionModalOpen}
        onClose={closeSubRegionModal}
        title={
          editingSubRegion
            ? t('subRegionModal.editTitle')
            : t('subRegionModal.addTitle')
        }
        centered
        styles={{
          content: {
            background:
              'linear-gradient(135deg, rgba(15, 15, 35, 0.98) 0%, rgba(5, 5, 20, 0.99) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
          },
          header: {
            backgroundColor: 'transparent',
          },
          title: {
            color: 'white',
            fontWeight: 600,
          },
          close: {
            color: 'rgba(255, 255, 255, 0.6)',
          },
        }}
      >
        <Stack gap='md'>
          <TextInput
            label={t('subRegionModal.name')}
            value={newSubRegionName}
            onChange={(inputEvent) =>
              setNewSubRegionName(inputEvent.target.value)
            }
            placeholder={t('subRegionModal.namePlaceholder')}
            styles={{
              label: { color: 'rgba(255, 255, 255, 0.7)' },
              input: {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: 'white',
              },
            }}
          />
          <Select
            label={t('subRegionModal.type')}
            value={newSubRegionType}
            onChange={(value) => setNewSubRegionType(value || 'province')}
            data={[
              { value: 'province', label: 'Province' },
              { value: 'state', label: 'State' },
              { value: 'territory', label: 'Territory' },
              { value: 'region', label: 'Region' },
            ]}
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
          <Group justify='flex-end' mt='md'>
            <Button variant='subtle' color='gray' onClick={closeSubRegionModal}>
              {t('subRegionModal.cancel')}
            </Button>
            <CustomButton onClick={closeSubRegionModal}>
              {editingSubRegion
                ? t('subRegionModal.update')
                : t('subRegionModal.add')}
            </CustomButton>
          </Group>
        </Stack>
      </Modal>
    </Box>
  );
};
