"use client"
import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { isLoadingState, userPresentState } from '../atoms/userPresentState';
import { RecoilRoot, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import SignupCard from "./SignupCard";
import Dialog from "@mui/material/Dialog";
import { useRecoilState } from 'recoil';
import { onCloseLogin,onCloseSignup } from '../atoms/onCloseButton';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useRouter } from 'next/navigation';
import { useSession} from 'next-auth/react';
import {signOut} from "next-auth/react"
const theme = createTheme({
  palette: {
    primary: {main:"#daed6e"},
    secondary: {main:"#444444"}
  },
  typography: {
    body1: {
      fontStyle: "italic",
      fontWeight: "bold"
    }
  }
});



export function ClientNav(){
    return(
        <>
        <RecoilRoot>
          <ThemeProvider theme={theme}>
            <TokenDepend />
          </ThemeProvider>
        </RecoilRoot>
        </>
    )
}



function TokenDepend(){
    const setIsLoading = useSetRecoilState(isLoadingState);
    const {status} = useSession();
    
    if(status === "loading"){
      return(
        <LoggedOut/>
      )
    }
    if(status === "authenticated"){
      setIsLoading(false)
      return (
        <LoggedIn />
      )
    }
    if(status === "unauthenticated"){
      return(
        <LoggedOut/>
      )
    }
    }


   function LoggedIn(){
        const router = useRouter(); 
        const {data} = useSession();
        console.log(data)
        const username = data?.user?.name;
        return(
          <>
          <div style={{display: 'flex', justifyContent:"flex-end"}}>
                  {username && <Typography  color="white" variant="h3" component="div" sx={{ fontSize:{lg:"140%", xs:"100%"}, flexGrow: 1,paddingTop:{lg:"1.5%", xs:"3%"}, paddingLeft:{lg:"10px", xs:"5px"}, paddingRight:{lg:"30px", xs:"0px"} }}>
                  {username}
                  </Typography>
                  }
                  <Box sx={{paddingLeft:2}} >
                  <Button variant='contained' color="primary" sx={{paddingLeft:{lg:"10px", xs:"1px"}}} onClick={()=>{router.push("/user/products")}}>products</Button>
                  <LogoutButton />
                  </Box>
           </div>
          </>
        )
      }
      function LogoutButton(){
        const setUser = useSetRecoilState(userPresentState);
        const setIsLoading = useSetRecoilState(isLoadingState);
         async function logout(){
            await signOut();
            setUser(null)
            setIsLoading(true)
            window.location.href="/"};
        return(
          <Button color='primary' sx={{paddingLeft:{lg:"10px", xs:"1px"}}}onClick={logout}>Logout</Button>
        )
      }
      function LoggedOut(){
        const [open, setOpen] = useRecoilState(onCloseLogin);
        const [open2, setOpen2] = useRecoilState(onCloseSignup);
        const handleClickOpen = () => {
          setOpen(true);
        };
        const handleClose = () => {
          setOpen(false);
        };
        const handleClickOpen2 = () => {
          setOpen2(true);
        };
        const handleClose2 = () => {
          setOpen2(false);
        };
        return(   
             <div><Button sx={{marginRight:2}} variant='contained' color='primary' onClick={handleClickOpen}>Login</Button>
             <Button variant='contained' color='primary' onClick={handleClickOpen2}>Signup</Button>
             <Dialog PaperProps={{ sx: { borderRadius: "35px" } }} maxWidth="sm" fullWidth onClose={handleClose} open={open}>
             <SignupCard ButtonName="Login" Redirect="signup" Message="Have not registered yet"/>
             </Dialog>
             <Dialog PaperProps={{ sx: { borderRadius: "35px" } }} maxWidth="sm" fullWidth onClose={handleClose2} open={open2}>
             <SignupCard ButtonName="Signup" Redirect="login" Message="Already registered"/>
             </Dialog>
             </div>
             
        )
      }