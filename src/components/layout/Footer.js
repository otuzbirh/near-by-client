import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Near By
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function Footer() {
  return (
   
    
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            display: 'flex',
            justifyContent: 'center',
            width: '100%',
            mt: 'auto',
            backgroundColor: '#fafafa' }}
        >
        
            <Copyright />

        </Box>
  );
}