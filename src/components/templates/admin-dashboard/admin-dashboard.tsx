'use client';

import {
  Box,
  Grid,
  Paper,
  Progress,
  SimpleGrid,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBook, IconEye, IconGift, IconWorld } from '@tabler/icons-react';
import { useTranslations } from 'next-intl';
import { useMemo } from 'react';

import { AdminStatCard } from '@/src/components/molecules/admin-stat-card';
import { mockCountries } from '@/src/data/mock/countries';

// Mock data for dashboard - in production, this would come from the API
const mockStats = {
  countriesWithHistory: 15,
  totalEssays: 47,
  activeVisitors: 234,
  totalContributions: 18,
};

const mockCountryVisits = [
  { countryId: 'united-states', visits: 1250, percentage: 28 },
  { countryId: 'united-kingdom', visits: 890, percentage: 20 },
  { countryId: 'germany', visits: 650, percentage: 15 },
  { countryId: 'france', visits: 520, percentage: 12 },
  { countryId: 'japan', visits: 480, percentage: 11 },
  { countryId: 'china', visits: 340, percentage: 8 },
  { countryId: 'india', visits: 270, percentage: 6 },
];

const mockRecentActivity = [
  {
    id: '1',
    type: 'essay_view' as const,
    description: 'Essay "The American Revolution" was viewed',
    timestamp: '2 minutes ago',
  },
  {
    id: '2',
    type: 'contribution' as const,
    description: 'New contribution submitted for France',
    timestamp: '15 minutes ago',
  },
  {
    id: '3',
    type: 'signup' as const,
    description: 'New user registered: john@example.com',
    timestamp: '1 hour ago',
  },
  {
    id: '4',
    type: 'essay_view' as const,
    description: 'Essay "Medieval Britain" was viewed',
    timestamp: '2 hours ago',
  },
  {
    id: '5',
    type: 'essay_edit' as const,
    description: 'Essay "Ancient Egypt" was updated',
    timestamp: '3 hours ago',
  },
];

export const AdminDashboard = () => {
  const t = useTranslations('admin.dashboard');
  const isMobile = useMediaQuery('(max-width: 768px)');

  const countryMap = useMemo(() => {
    const map: Record<string, string> = {};
    mockCountries.forEach((country) => {
      map[country.id] = country.name;
    });
    return map;
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'essay_view':
        return <IconEye size={16} color='#60a5fa' />;
      case 'contribution':
        return <IconGift size={16} color='#10b981' />;
      case 'signup':
        return <IconWorld size={16} color='#fbbf24' />;
      case 'essay_edit':
        return <IconBook size={16} color='#a78bfa' />;
      default:
        return <IconEye size={16} color='#60a5fa' />;
    }
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

      {/* Stats Grid */}
      <SimpleGrid cols={isMobile ? 1 : 4} spacing='lg' mb='xl'>
        <AdminStatCard
          title={t('stats.countries')}
          value={mockStats.countriesWithHistory}
          icon={<IconWorld size={24} />}
          color='#60a5fa'
        />
        <AdminStatCard
          title={t('stats.essays')}
          value={mockStats.totalEssays}
          icon={<IconBook size={24} />}
          color='#a78bfa'
        />
        <AdminStatCard
          title={t('stats.visitors')}
          value={mockStats.activeVisitors}
          icon={<IconEye size={24} />}
          color='#10b981'
          trend={{ value: 12, isPositive: true }}
        />
        <AdminStatCard
          title={t('stats.contributions')}
          value={mockStats.totalContributions}
          icon={<IconGift size={24} />}
          color='#fbbf24'
        />
      </SimpleGrid>

      {/* Main Content Grid */}
      <Grid gutter='lg'>
        {/* Country Visits Chart */}
        <Grid.Col span={isMobile ? 12 : 8}>
          <Paper
            p='lg'
            radius='md'
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%',
            }}
          >
            <Title order={3} c='white' fz='1.1rem' fw={600} mb='lg'>
              {t('countryVisits.title')}
            </Title>
            <Stack gap='md'>
              {mockCountryVisits.map((item) => (
                <Box key={item.countryId}>
                  <Box
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: 4,
                    }}
                  >
                    <Text c='rgba(255, 255, 255, 0.8)' fz='0.9rem'>
                      {countryMap[item.countryId] || item.countryId}
                    </Text>
                    <Text c='rgba(255, 255, 255, 0.6)' fz='0.85rem'>
                      {item.visits.toLocaleString()} ({item.percentage}%)
                    </Text>
                  </Box>
                  <Progress
                    value={item.percentage}
                    size='sm'
                    radius='xl'
                    color='yellow'
                    styles={{
                      root: {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      },
                    }}
                  />
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Recent Activity */}
        <Grid.Col span={isMobile ? 12 : 4}>
          <Paper
            p='lg'
            radius='md'
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              height: '100%',
            }}
          >
            <Title order={3} c='white' fz='1.1rem' fw={600} mb='lg'>
              {t('recentActivity.title')}
            </Title>
            <Stack gap='sm'>
              {mockRecentActivity.map((activity) => (
                <Box
                  key={activity.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    padding: '0.5rem',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(255, 255, 255, 0.02)',
                  }}
                >
                  <Box
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    {getActivityIcon(activity.type)}
                  </Box>
                  <Box style={{ flex: 1, minWidth: 0 }}>
                    <Text
                      c='rgba(255, 255, 255, 0.8)'
                      fz='0.85rem'
                      lineClamp={2}
                    >
                      {activity.description}
                    </Text>
                    <Text c='rgba(255, 255, 255, 0.4)' fz='0.75rem'>
                      {activity.timestamp}
                    </Text>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Paper>
        </Grid.Col>

        {/* Top Countries Table */}
        <Grid.Col span={12}>
          <Paper
            p='lg'
            radius='md'
            style={{
              background:
                'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Title order={3} c='white' fz='1.1rem' fw={600} mb='lg'>
              {t('topCountries.title')}
            </Title>
            <Table
              striped
              highlightOnHover
              styles={{
                table: {
                  backgroundColor: 'transparent',
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
                },
                td: {
                  color: 'rgba(255, 255, 255, 0.8)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
                },
              }}
            >
              <Table.Thead>
                <Table.Tr>
                  <Table.Th>{t('topCountries.country')}</Table.Th>
                  <Table.Th>{t('topCountries.visits')}</Table.Th>
                  <Table.Th>{t('topCountries.essays')}</Table.Th>
                  <Table.Th>{t('topCountries.share')}</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>
                {mockCountryVisits.slice(0, 5).map((item, index) => (
                  <Table.Tr key={item.countryId}>
                    <Table.Td>
                      <Box
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                        }}
                      >
                        <Box
                          style={{
                            width: 24,
                            height: 24,
                            borderRadius: '50%',
                            backgroundColor: 'rgba(251, 191, 36, 0.2)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fbbf24',
                            fontSize: '0.75rem',
                            fontWeight: 600,
                          }}
                        >
                          {index + 1}
                        </Box>
                        {countryMap[item.countryId] || item.countryId}
                      </Box>
                    </Table.Td>
                    <Table.Td>{item.visits.toLocaleString()}</Table.Td>
                    <Table.Td>{Math.floor(item.visits / 50)}</Table.Td>
                    <Table.Td>{item.percentage}%</Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};
