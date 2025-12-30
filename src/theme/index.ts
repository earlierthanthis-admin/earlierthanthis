import type { MantineColorsTuple } from '@mantine/core';
import { createTheme } from '@mantine/core';
import type { CSSProperties } from 'react';

// Shared card styles for auth pages and glassmorphism effects
export const cardStyles: CSSProperties = {
  background:
    'linear-gradient(135deg, rgba(15, 15, 35, 0.9) 0%, rgba(5, 5, 20, 0.95) 100%)',
  backdropFilter: 'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
};

// Custom color palette for dark theme
const dark: MantineColorsTuple = [
  '#f5f5f5',
  '#e0e0e0',
  '#b8b8b8',
  '#8c8c8c',
  '#606060',
  '#3d3d3d',
  '#2a2a2a',
  '#1a1a1a',
  '#0f0f23',
  '#050514',
];

export const theme = createTheme({
  primaryColor: 'dark',
  colors: {
    dark,
  },
  fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
  headings: {
    fontFamily: 'var(--font-poppins), system-ui, sans-serif',
    fontWeight: '600',
  },
  radius: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
  },
  defaultRadius: 'sm',
  components: {
    Button: {
      defaultProps: {
        radius: 'sm',
      },
      styles: {
        root: {
          fontWeight: 500,
          transition: 'all 0.3s ease',
        },
      },
    },
    TextInput: {
      defaultProps: {
        radius: 'sm',
      },
      styles: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fff',
          transition: 'all 0.3s ease',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.4)',
          },
          '&:focus': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
        label: {
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '0.5rem',
        },
      },
    },
    PasswordInput: {
      defaultProps: {
        radius: 'sm',
      },
      styles: {
        input: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          color: '#fff',
          transition: 'all 0.3s ease',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.4)',
          },
          '&:focusWithin': {
            borderColor: 'rgba(255, 255, 255, 0.4)',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
          },
        },
        innerInput: {
          color: '#fff',
          '&::placeholder': {
            color: 'rgba(255, 255, 255, 0.4)',
          },
        },
        label: {
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '0.5rem',
        },
        visibilityToggle: {
          color: 'rgba(255, 255, 255, 0.6)',
          '&:hover': {
            color: '#fff',
          },
        },
      },
    },
    Paper: {
      styles: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
    Menu: {
      styles: {
        dropdown: {
          backgroundColor: 'rgba(20, 20, 40, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
        },
        item: {
          color: 'rgba(255, 255, 255, 0.8)',
          '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: '#fff',
          },
        },
      },
    },
    Anchor: {
      styles: {
        root: {
          color: 'rgba(255, 255, 255, 0.9)',
          '&:hover': {
            color: '#fff',
          },
        },
      },
    },
    Alert: {
      styles: {
        root: {
          backgroundColor: 'rgba(239, 68, 68, 0.1)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
        },
        message: {
          color: '#f87171',
        },
      },
    },
  },
});
