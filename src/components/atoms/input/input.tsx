'use client';

import type { TextInputProps } from '@mantine/core';
import { TextInput } from '@mantine/core';

interface InputProps extends TextInputProps {
  fullWidth?: boolean;
}

export const Input = ({ fullWidth = true, ...props }: InputProps) => {
  return (
    <TextInput
      styles={{
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          padding: '0.875rem 1rem',
          color: '#fff',
          fontSize: '1rem',
          transition: 'all 0.3s ease',
          height: 'auto',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.4)',
          },
          '&:focus': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
        wrapper: {
          width: fullWidth ? '100%' : 'auto',
        },
      }}
      {...props}
    />
  );
};
