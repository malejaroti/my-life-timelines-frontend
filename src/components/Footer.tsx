import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function Footer() {
  return (
    <footer>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1,
          py: 3,
          borderTop: '1px solid rgba(0,0,0,0.1)',
          alignSelf: 'flex-end',
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          <IconButton
            component="a"
            href="https://github.com/malejaroti"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            size="small"
            sx={{ color: '#1e3a8a' }}
          >
            <GitHubIcon />
          </IconButton>
          <IconButton
            component="a"
            href="https://www.linkedin.com/in/alejandra-rodriguez-tibana/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            size="small"
            sx={{ color: '#1e3a8a' }}
          >
            <LinkedInIcon />
          </IconButton>
        </Box>
        <Typography variant="body2" sx={{ color: '#475569' }}>
          Made by Alejandra Rodríguez · {new Date().getFullYear()}
        </Typography>
      </Box>
    </footer>
  );
}

export default Footer;

