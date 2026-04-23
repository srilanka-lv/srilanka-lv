import { recipe } from '@vanilla-extract/recipes';

export const buttonStyles = recipe({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '6px',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'background-color 150ms, border-color 150ms, color 150ms',
    border: '1px solid transparent',
    lineHeight: 1,
    textDecoration: 'none',
    selectors: {
      '&:disabled': {
        opacity: 0.5,
        cursor: 'not-allowed',
      },
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: '#0f172a',
        color: '#ffffff',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#1e293b',
          },
        },
      },
      secondary: {
        backgroundColor: '#f1f5f9',
        color: '#0f172a',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#e2e8f0',
          },
        },
      },
      outline: {
        backgroundColor: 'transparent',
        color: '#0f172a',
        borderColor: '#cbd5e1',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#f8fafc',
          },
        },
      },
      ghost: {
        backgroundColor: 'transparent',
        color: '#0f172a',
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
    size: {
      small: {
        fontSize: '13px',
        padding: '6px 12px',
      },
      medium: {
        fontSize: '14px',
        padding: '8px 16px',
      },
      large: {
        fontSize: '16px',
        padding: '12px 24px',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'medium',
  },
});
