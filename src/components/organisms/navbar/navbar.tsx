'use client';

import {
  Anchor,
  Burger,
  Drawer,
  Group,
  Loader,
  Menu,
  Stack,
  UnstyledButton,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconLogout, IconUser } from '@tabler/icons-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { useAuth, useLogout } from '@/src/hooks';

import styles from './navbar.module.css';

export const Navbar = () => {
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');

  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [isDrawerOpened, { toggle: toggleDrawer, close: closeDrawer }] =
    useDisclosure(false);

  const { isAuthenticated, userName, isLoading } = useAuth();
  const logoutMutation = useLogout({ redirectTo: '/' });

  const handleLogout = () => {
    setIsMenuOpened(false);
    closeDrawer();
    logoutMutation.mutate();
  };

  const displayName = userName?.split(' ')[0] || tCommon('user');

  const navLinkStyles = {
    color: 'rgba(255, 255, 255, 0.75)',
    textDecoration: 'none',
    fontSize: '0.95rem',
    fontWeight: 400,
    letterSpacing: '0.3px',
    padding: '0.5rem 0',
    transition: 'color 0.3s ease',
    '&:hover': {
      color: '#fff',
    },
  };

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => (
    <>
      <Anchor
        component={Link}
        href='/timeline'
        onClick={closeDrawer}
        style={navLinkStyles}
        fz={mobile ? '1.2rem' : '0.95rem'}
      >
        {t('timeline')}
      </Anchor>

      <Anchor
        component={Link}
        href='/about'
        onClick={closeDrawer}
        style={navLinkStyles}
        fz={mobile ? '1.2rem' : '0.95rem'}
      >
        {t('about')}
      </Anchor>

      {isLoading ? (
        <Loader size='xs' color='gray' />
      ) : isAuthenticated ? (
        <Menu
          opened={isMenuOpened}
          onChange={setIsMenuOpened}
          position={mobile ? 'bottom' : 'bottom-end'}
          offset={8}
          zIndex={1100}
          classNames={{
            item: styles.menuItem,
          }}
          styles={{
            dropdown: {
              backgroundColor: 'rgba(20, 20, 40, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '8px',
              minWidth: '120px',
            },
            itemSection: {
              marginRight: '0.5rem',
            },
          }}
        >
          <Menu.Target>
            <UnstyledButton
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                color: 'rgba(255, 255, 255, 0.75)',
                fontSize: mobile ? '1.2rem' : '0.95rem',
                fontWeight: 400,
                letterSpacing: '0.3px',
                transition: 'color 0.3s ease',
              }}
            >
              {displayName}
              <IconChevronDown
                size={12}
                style={{
                  transition: 'transform 0.2s ease',
                  transform: isMenuOpened ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </UnstyledButton>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Item
              component={Link}
              href='/profile'
              onClick={closeDrawer}
              leftSection={<IconUser size={14} />}
            >
              {t('profile')}
            </Menu.Item>
            <Menu.Item
              onClick={handleLogout}
              disabled={logoutMutation.isPending}
              leftSection={<IconLogout size={14} />}
            >
              {logoutMutation.isPending ? t('loggingOut') : t('logout')}
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      ) : (
        <Anchor
          component={Link}
          href='/login'
          onClick={closeDrawer}
          style={navLinkStyles}
          fz={mobile ? '1.2rem' : '0.95rem'}
        >
          {t('login')}
        </Anchor>
      )}

      <Anchor
        component={Link}
        href='/contribution'
        onClick={closeDrawer}
        style={navLinkStyles}
        fz={mobile ? '1.2rem' : '0.95rem'}
      >
        {t('contributions')}
      </Anchor>
    </>
  );

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem 2rem',
        background:
          'linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.3) 70%, transparent 100%)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        pointerEvents: 'none',
      }}
    >
      <Anchor
        component={Link}
        href='/'
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontSize: '1.25rem',
          fontWeight: 600,
          color: 'rgba(255, 255, 255, 0.9)',
          textDecoration: 'none',
          letterSpacing: '0.5px',
          transition: 'color 0.3s ease',
          pointerEvents: 'auto',
          '&:hover': {
            color: '#fff',
          },
        }}
      >
        {tCommon('appName')}
      </Anchor>

      {/* Desktop Navigation */}
      <Group gap='2.5rem' visibleFrom='sm' style={{ pointerEvents: 'auto' }}>
        <NavLinks />
      </Group>

      {/* Mobile Burger */}
      <Burger
        opened={isDrawerOpened}
        onClick={toggleDrawer}
        hiddenFrom='sm'
        color='rgba(255, 255, 255, 0.9)'
        size='sm'
        style={{ pointerEvents: 'auto' }}
      />

      {/* Mobile Drawer */}
      <Drawer
        opened={isDrawerOpened}
        onClose={closeDrawer}
        position='right'
        size='70%'
        hiddenFrom='sm'
        styles={{
          content: {
            background:
              'linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(10, 10, 30, 0.95) 100%)',
            backdropFilter: 'blur(10px)',
          },
          header: {
            backgroundColor: 'transparent',
          },
          close: {
            color: 'rgba(255, 255, 255, 0.9)',
          },
        }}
      >
        <Stack align='center' justify='center' h='70vh' gap='2rem'>
          <NavLinks mobile />
        </Stack>
      </Drawer>
    </nav>
  );
};
