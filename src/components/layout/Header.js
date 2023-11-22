import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {  useNavigate } from 'react-router-dom';



export default function Header() {

  const navigate = useNavigate()

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
        <Box sx={{display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between'}}>
          <Typography
            onClick={() => { navigate('/') }}
            variant="h6"
            noWrap
            sx={{ flexGrow: 1, display: {  sm: 'block', cursor: 'pointer' } }}
          >
            NEAR BY
          </Typography>

          <Typography
            onClick={() => { navigate('/u-blizini') }}
            variant="h6"
            noWrap

            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block', cursor: 'pointer' }, fontSize: '16px', textAlign: 'right' }}
          >
            Pogledajte vozila u blizini
          </Typography>
          </Box>     
        </Toolbar>
      </AppBar>
    </Box>
  );
}