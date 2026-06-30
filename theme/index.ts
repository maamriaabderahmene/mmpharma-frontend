import type {} from '@mui/material/themeCssVarsAugmentation';
import { createTheme } from '@mui/material/styles';
import { palette } from './palette';

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    primary: true;
    secondary: true;
    ghost: true;
    destructive: true;
  }
}

const theme = createTheme({
  cssVariables: true,
  colorSchemes: { light: true, dark: true },
  defaultColorScheme: 'light',
  shape: { borderRadius: 8 },
  spacing: 4,
  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  palette: {
    ...palette,
    background: {
      default: palette.neutral[50],
      paper: palette.neutral[0],
    },
    text: {
      primary: palette.neutral[900],
      secondary: palette.neutral[700],
      disabled: palette.neutral[500],
    },
    divider: palette.neutral[200],
  },
  typography: {
    fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    h1: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 700,
      fontSize: '3.052rem',
      lineHeight: 1.1,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 700,
      fontSize: '2.441rem',
      lineHeight: 1.15,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 700,
      fontSize: '1.953rem',
      lineHeight: 1.2,
      letterSpacing: '-0.015em',
    },
    h4: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 700,
      fontSize: '1.563rem',
      lineHeight: 1.25,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.3,
      letterSpacing: '-0.005em',
    },
    h6: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 600,
      fontSize: '1.05rem',
      lineHeight: 1.4,
      letterSpacing: 0,
    },
    subtitle1: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 400,
      fontSize: '1.125rem',
      lineHeight: 1.6,
      letterSpacing: 0,
    },
    body1: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 400,
      fontSize: '1rem',
      lineHeight: 1.6,
      letterSpacing: 0,
    },
    body2: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: 1.55,
      letterSpacing: 0,
    },
    button: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 600,
      fontSize: '0.875rem',
      lineHeight: 1.4,
      letterSpacing: 0,
      textTransform: 'none',
    },
    caption: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 500,
      fontSize: '0.75rem',
      lineHeight: 1.4,
      letterSpacing: '0.02em',
      textTransform: 'uppercase',
    },
    overline: {
      fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      fontWeight: 600,
      fontSize: '0.6875rem',
      lineHeight: 1.4,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          backgroundColor: palette.neutral[50],
          color: palette.neutral[700],
          WebkitFontSmoothing: 'antialiased',
          MozOsxFontSmoothing: 'grayscale',
        },
        '*:focus-visible': {
          outline: 'none',
          boxShadow: '0 0 0 4px rgba(14,90,167,.16)',
          borderRadius: 4,
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          minWidth: 120,
          borderRadius: 8,
          fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 600,
          textTransform: 'none',
        },
        sizeSmall: { height: 36, paddingBlock: 0, paddingInline: 3 },
        sizeMedium: { height: 44, paddingBlock: 0, paddingInline: 4 },
        sizeLarge: { height: 52, paddingBlock: 0, paddingInline: 5 },
      },
      variants: [
        {
          props: { variant: 'primary' },
          style: {
            backgroundColor: palette.primary[500],
            color: palette.neutral[0],
            '&:hover': { backgroundColor: palette.primary[700] },
            '&:active': { backgroundColor: palette.primary[900] },
            '&.Mui-disabled': {
              backgroundColor: palette.neutral[300],
              color: palette.neutral[500],
            },
          },
        },
        {
          props: { variant: 'secondary' },
          style: {
            backgroundColor: 'transparent',
            color: palette.primary[500],
            border: `1px solid ${palette.primary[300]}`,
            '&:hover': {
              backgroundColor: palette.primary[50],
              borderColor: palette.primary[500],
            },
            '&.Mui-disabled': {
              borderColor: palette.neutral[300],
              color: palette.neutral[500],
            },
          },
        },
        {
          props: { variant: 'ghost' },
          style: {
            backgroundColor: 'transparent',
            color: palette.neutral[700],
            '&:hover': { backgroundColor: palette.neutral[100] },
            '&.Mui-disabled': { color: palette.neutral[500] },
          },
        },
        {
          props: { variant: 'destructive' },
          style: {
            backgroundColor: palette.error[500],
            color: palette.neutral[0],
            '&:hover': { backgroundColor: '#B82E2E' },
            '&.Mui-disabled': {
              backgroundColor: palette.neutral[300],
              color: palette.neutral[500],
            },
          },
        },
      ],
    },
    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      defaultProps: { elevation: 0, variant: 'outlined' },
      styleOverrides: {
        root: {
          borderRadius: 12,
          borderColor: palette.neutral[200],
        },
      },
    },
    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'medium' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          },
        },
      },
    },
    MuiLink: {
      defaultProps: { underline: 'hover' },
      styleOverrides: {
        root: {
          color: palette.primary[500],
          fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontWeight: 500,
          fontSize: '0.75rem',
          letterSpacing: '0.02em',
          textTransform: 'uppercase',
        },
      },
    },
    MuiTooltip: {
      defaultProps: { enterDelay: 400 },
      styleOverrides: {
        tooltip: {
          fontFamily: "'Inter', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: '0.75rem',
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
