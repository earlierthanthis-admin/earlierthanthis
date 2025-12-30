'use client';

import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import type { ReactNode } from 'react';

import { theme } from '@/src/theme';

interface MantineProviderWrapperProps {
  children: ReactNode;
}

export function MantineProviderWrapper({
  children,
}: MantineProviderWrapperProps) {
  return (
    <MantineProvider theme={theme} defaultColorScheme='dark'>
      <ModalsProvider>
        <Notifications
          position='top-right'
          containerWidth={320}
          top={70}
          styles={{
            root: {
              pointerEvents: 'none',
            },
            notification: {
              pointerEvents: 'auto',
            },
          }}
        />
        {children}
      </ModalsProvider>
    </MantineProvider>
  );
}
