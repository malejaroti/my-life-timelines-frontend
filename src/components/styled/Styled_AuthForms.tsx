import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import MuiCard from '@mui/material/Card';

/**
 * Full-page layout wrapper for the sign-in and sign-up forms.
 *
 * - Uses `flex-start` + a responsive `paddingTop` (via `clamp`) so both pages
 *   always share the same top position — no visual jump when switching.
 * - On mobile the SignUp form nearly fills the screen, so a small `paddingTop`
 *   (capped at 48 px) keeps it visually centered.
 * - On `sm+` screens the larger `paddingTop` (≈ 12 vh) centers the form in the
 *   viewport.
 */
export const SignContainer = styled(Stack)(({ theme }) => ({
  justifyContent: 'flex-start',
  alignItems: 'center',
  minHeight: '100%',
  padding: theme.spacing(2),
  paddingTop: 'clamp(16px, 5vh, 48px)',
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
    paddingTop: 'clamp(48px, 12vh, 160px)',
  },
  backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
}));

/** Outlined card that constrains the form width and centers it horizontally. */
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
}));