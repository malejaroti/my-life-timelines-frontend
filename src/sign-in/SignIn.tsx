import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import api from '../services/config.services';
import { AuthContext } from '../context/auth.context';
import { useNavigate } from 'react-router';
import { SignContainer, CardForSignContainer } from '../components/styled/Styled_AuthForms';
import { Alert } from '@mui/material';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';


export default function SignIn() {
  const authContext = React.useContext(AuthContext);
  if (!authContext) {
    throw new Error('SignIn must be used within an AuthWrapper');
  }
  const { authenticateUser } = authContext;

  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [serverErrorMsg, setServerErrorMsg] = React.useState("");
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (emailError || passwordError) {

      return;
    }

    const userCredentials = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await api.post('/auth/login', userCredentials);
      if(response.status === 200){
        setServerErrorMsg("")
      }

      //* the user is now authenticated

      localStorage.setItem('authToken', response.data.authToken);

      await authenticateUser(); // this verifies that the token was correctly stored and is valid. Also it updates the context states.

      navigate('/timelines');
    } catch (error: any) {
      console.log("Login error:", error);
      if (error.response && error.response.status === 400 && error.response.data && error.response.data.errorMessage ) {
        console.log("Error message:", error.response.data.errorMessage);
        setServerErrorMsg(error.response.data.errorMessage)
      }else{
        navigate("/error")
      }
    }
  };

  const validateInputs = () => {
    const email = document.getElementById('email') as HTMLInputElement;
    const password = document.getElementById('password') as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    return isValid;
  };

  return (
      <SignContainer direction="column">
        <CardForSignContainer variant="outlined">
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
          >
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
            }}
          >
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                value={formData.email}
                onChange={handleOnChange}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                autoComplete="current-password"
                // autoFocus
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                value={formData.password}
                onChange={handleOnChange}
              />
            </FormControl>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={validateInputs}
            >
              Sign in
            </Button>
            {
              serverErrorMsg !== ""
              ?
                <Alert severity='error'>
                  {serverErrorMsg}
                </Alert>
              : null
            }
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>or</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography sx={{ textAlign: 'center' }}>
              Don&apos;t have an account?{' '}
              <Link
                component="button"
                type="button"
                onClick={() => navigate('/sign-up')}
                variant="body2"
                sx={{ alignSelf: 'center' }}
              >
                Sign up
              </Link>
            </Typography>
          </Box>
        </CardForSignContainer>
      </SignContainer>
  );
}
