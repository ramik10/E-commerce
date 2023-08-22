
import { ClientNav } from './TokenDepend';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

export  function Navbar() {
    return(
<AppBar  position="fixed" color='transparent' >
        <Toolbar sx={{ justifyContent: 'flex-start', width: "auto" }}>
          <Typography color="white" variant="h5" component="div" sx={{ display: { xs: "none", lg: "block" }, flexGrow: 1 }}>
            SHOPIFY
          </Typography>
          <ClientNav />
        </Toolbar>
      </AppBar>
    )
}

