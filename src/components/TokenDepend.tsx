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




export function ClientNav(){
    return(
        <>
        <RecoilRoot>
            <TokenDepend />
        </RecoilRoot>
        </>
    )
}



function TokenDepend(){
    const setUser = useSetRecoilState(userPresentState);
    const setIsLoading = useSetRecoilState(isLoadingState);
    // axios.get(process.env.NEXT_URL+"/users/me",{withCredentials:true}).then((res)=>{
    //   const username = res.data.username;
    //   setUser(username);
    //   setIsLoading(false);})
    // const isLoading = useRecoilValue(isLoadingState);
    if (false) {
      return (
        <LoggedIn />
      )}
    else{
        return(
          <LoggedOut/>
        )
      }
    }
    type username = String | null;

    function LoggedIn(){
        const username:username = useRecoilValue(userPresentState);
        return(
          // <div style={{display: 'flex', justifyContent:"flex-end"}}>
          //         {username && <Typography  color="white" variant="h3" component="div" sx={{ fontSize:{lg:"140%", xs:"100%"}, flexGrow: 1,paddingTop:{lg:"1.5%", xs:"3%"}, paddingLeft:{lg:"10px", xs:"5px"}, paddingRight:{lg:"30px", xs:"0px"} }}>
          //           {username}
          //         </Typography>
          //         }
          //         <Box sx={{paddingLeft:2}} >
          //         <Button variant='contained' color="primary" sx={{paddingLeft:{lg:"10px", xs:"1px"}}} onClick={()=>{navigate("/courses")}}>Courses</Button>
          //         <Button variant='contained' color="primary" sx={{paddingLeft:{lg:"10px", xs:"1px"}}} onClick={()=>{navigate("/courses/purchased")}}>MyCourses</Button>
          //         <LogoutButton />
          //         </Box>
          //  </div>
          <div>SUCCESS</div>
        )
      }
      function LogoutButton(){
        const setUser = useSetRecoilState(userPresentState);
        const setIsLoading = useSetRecoilState(isLoadingState);
        function logout(){
            localStorage.removeItem("token");
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