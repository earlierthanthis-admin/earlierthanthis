'use client';

import type {
  PasswordInputProps,
  TextInputProps,
} from '@/src/components/atoms';
import { PasswordInput, TextInput } from '@/src/components/atoms';

interface FormFieldProps {
  label: string;
  type?: string;
  id?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
}

const inputStyles = {
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
  label: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '0.875rem',
    fontWeight: 500,
    marginBottom: '0.5rem',
  },
  innerInput: {
    color: '#fff',
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.4)',
    },
  },
  visibilityToggle: {
    color: 'rgba(255, 255, 255, 0.6)',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'transparent',
    },
  },
};

export const FormField = ({
  label,
  type = 'text',
  id,
  ...props
}: FormFieldProps) => {
  if (type === 'password') {
    return (
      <PasswordInput
        label={label}
        id={id}
        styles={inputStyles}
        {...(props as Omit<PasswordInputProps, 'label' | 'type'>)}
      />
    );
  }

  return (
    <TextInput
      label={label}
      type={type}
      id={id}
      styles={inputStyles}
      {...(props as Omit<TextInputProps, 'label' | 'type'>)}
    />
  );
};
