'use client';

type ButtonVariant = 'primary' | 'ghost';

export const useButtonStyles = (variant: ButtonVariant) => {
  const getStyles = () => {
    if (variant === 'ghost') {
      return {
        root: {
          background: 'transparent',
          border: 'none',
          color: 'rgba(255, 255, 255, 0.9)',
          padding: 0,
          height: 'auto',
          '&:hover': {
            background: 'transparent',
            color: '#fff',
          },
        },
      };
    }
    // primary variant
    return {
      root: {
        background:
          'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        color: '#fff',
        padding: '1rem',
        height: 'auto',
        fontSize: '1rem',
        fontWeight: 500,
        transition: 'all 0.3s ease',
        '&:hover': {
          background:
            'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.1) 100%)',
          borderColor: 'rgba(255, 255, 255, 0.4)',
          transform: 'translateY(-1px)',
        },
        '&:active': {
          transform: 'translateY(0)',
        },
        '&:disabled': {
          opacity: 0.6,
          cursor: 'not-allowed',
        },
      },
    };
  };

  return { styles: getStyles() };
};
