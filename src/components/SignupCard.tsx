"use client"
import React from "react"
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { Box, CardContent, Grid, Typography } from "@mui/material";
import {
  useRecoilValue,
  useSetRecoilState
} from 'recoil';
import { useRouter } from 'next/navigation'

import { usernameState, nameState } from "../atoms/username";
import { passwordState } from "../atoms/password";
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { onCloseLogin, onCloseSignup } from "../atoms/onCloseButton";
import Link from '@mui/material/Link';
import {signIn} from "next-auth/react"


function UsernameBox(){
    const setUsername = useSetRecoilState(usernameState);
    return(
      <TextField InputProps={{
        style: {
          borderRadius: "40px",
        }
      }} sx={{paddingLeft:"4%", paddingTop:"8%",height:"20%", width:"90%"}} id="username" variant="outlined" onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="username" />
    );
  }

  function NameBox(){
    const setName = useSetRecoilState(nameState);
    return(
      <TextField InputProps={{
        style: {
          borderRadius: "40px",
        }
      }} sx={{paddingLeft:"4%", paddingTop:"8%",height:"20%", width:"90%"}} id="username" variant="outlined" onChange={(e)=>setName(e.target.value)} type="text" placeholder="name" />
    );
  }
  
function PasswordBox(){
     const setPassword = useSetRecoilState(passwordState);
    return(
      <TextField InputProps={{
        style: {
          borderRadius: "40px",
        }
      }} sx={{paddingLeft:"4%", paddingTop:{lg:"2%",md:"1%",sm:"5%", xs:"6%"}, height:"20%", width:"90%"}} id="password" variant="outlined" onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="password" />
    );
  }

function SignupButton(props:any){
    const email = useRecoilValue(usernameState);
    const name = useRecoilValue(nameState);
    const password = useRecoilValue(passwordState);
    const router = useRouter();
    async function register(){
      if(props.ButtonName==="Login"){
        signIn("credentials", {email, password});
      }
      
     if(props.ButtonName==="Signup"){
      if((email!=="")&&(password!=="")){
        fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password, name }),
        }).then(async (res) => {
          if(res.status===210){
            const newUser = await res.json();
            signIn("credentials", {name:newUser.name, email: newUser.email, password: newUser.password})
          }
        if(res.status===220){
        alert("Email already exists");
        router.push("/api/auth/signin")}
          
        }).catch((err)=>console.log(err));
        ;
          // tokenPresent(true)
      }
    }
    }
    return(
      <Button color="primary" sx={{borderRadius:"16px"}} onClick={()=>{register()}} variant="contained">{props.ButtonName}</Button>
    )
  }
  
  
function SignupCard(props:any){
    const close1 = useSetRecoilState(onCloseSignup);
    const close2 = useSetRecoilState(onCloseLogin);
    const router = useRouter();
      function onClose(){
        close1(false);
        close2(false);
      };
      return (
        <Grid  item xs={12} sm={12} md={12} lg={12} xl={12} sx={{borderRadius:"50px", height:"100%", width:"100%", display:"flex", justifyContent:"center"}}> 
        <Card sx={{height:"100%", width:"100%", bgcolor:"secondary"}} variant="outlined">
          <CardContent sx={{padding:"0%",height:"100%", width:"100%", display:"flex",flexDirection:"column", justifyContent:"center"}}>
          <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: "primary"
          }}
        >
          <CloseIcon />
        </IconButton>
            <Typography fontFamily={'"Times New Roman", Times, serif'} color="#007FFF" variant="h3" sx={{paddingTop:"2%",fontSize: { lg: 50, md: 40, sm: 25, xs: 35 },display:"flex", justifyContent:"center"}}>{props.ButtonName}</Typography>
            {props.ButtonName==="Signup"&&<NameBox/>}
            {props.ButtonName==="Signup"&&<br/>}
             <UsernameBox/>
             <br/>
             <PasswordBox/>
             <br/>
             <Box sx={{paddingTop:{lg:"2%",md:"1%",sm:"5%", xs:"3%"},paddingBottom:{sm:"3%", xs:"5%"}, height:"6%", width:"100%", display:"flex",justifyContent:"center"}}>
              <SignupButton ButtonName={props.ButtonName}/>
              
             </Box>
             <br/>
              <Button color="secondary" sx={{width:"50%", marginLeft:"25%", borderRadius:"16px"}} variant="contained" onClick={()=>{
              signIn("github")
             }} >Sign in with github</Button>
              <br/>
              <Button  sx={{width:"50%", marginLeft:"25%", borderRadius:"16px"}} variant="contained" onClick={()=>{
              signIn("google")
             }} >Sign in with Google</Button>
             <Box sx={{display:"flex",justifyContent:"center"}}>
             <p>{props.Message+" "}<Link sx={{color:"blue"}} onClick={()=>{
              if(props.Redirect==="signup"){
                close2(false);
                close1(true);
              }
              if(props.Redirect==="login"){
                close1(false);
                close2(true);
              }
             }}>{props.Redirect}</Link></p>
             
             </Box>
            
             
          </CardContent>
        </Card>
        </Grid> );
}
export default SignupCard;