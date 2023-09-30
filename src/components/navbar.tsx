
import { ClientNav } from './TokenDepend';
import AppBar from '@mui/material/AppBar';
import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import {SearchBar} from './SearchBar';
import { Button } from '@mui/material';

export  function Navbar() {
    return(
<AppBar  position="sticky" sx={{backgroundColor:"#1f2937",borderRadius:"16px", width:"100%"}} >
        <Toolbar sx={{ justifyContent: 'space-between', width:"auto" }}>
          <Button size="small" sx={{borderRadius:"50px", marginLeft:"0"}}>
            <img src="2504814.png" alt="Logo" style={{width:"50px", height:"50px", borderRadius:"50%"}}/>
            </Button>
          <SearchBar/>
          <ClientNav />
        </Toolbar>
      </AppBar>
    )
}

