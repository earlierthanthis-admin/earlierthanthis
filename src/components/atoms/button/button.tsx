'use client';

import type { ButtonProps as MantineButtonProps } from '@mantine/core';
import { Button as MantineButton } from '@mantine/core';
import type { ReactNode } from 'react';

import { useButtonStyles } from './use-button-styles';

interface ButtonProps extends Omit<MantineButtonProps, 'variant'> {
  children: ReactNode;
  variant?: 'primary' | 'ghost';
  fullWidth?: boolean;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export const Button = ({
  children,
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonProps) => {
  const { styles } = useButtonStyles(variant);

  return (
    <MantineButton
      fullWidth={fullWidth}
      styles={styles}
      variant='filled'
      {...props}
    >
      {children}
    </MantineButton>
  );
};
