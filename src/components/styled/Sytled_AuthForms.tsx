import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MuiCard from '@mui/material/Card';

/**
 * SignContainer is a full-page layout wrapper for the sign-in and sign-up forms.
 *
 * - Aligns the form card to the top (`flex-start`) with a fixed `paddingTop`
 *   so both pages start at the same vertical position (no visual jump).
 * - The `::before` pseudo-element renders a subtle full-screen background
 *   gradient (light blue → white in light mode, dark blue in dark mode).
 */
export const SignContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100dvh',
  padding: theme.spacing(2),
  paddingTop: '15vh',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    paddingTop: '15vh',
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export const CardForSignContainer = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: '0 auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));