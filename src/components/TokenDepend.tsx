"use client"
import React from 'react';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { isLoadingState, userPresentState } from '../atoms/userPresentState';
import { RecoilRoot,  useSetRecoilState } from 'recoil';
import SignupCard from "./SignupCard";
import Dialog from "@mui/material/Dialog";
import { useRecoilState } from 'recoil';
import { onCloseLogin, onCloseSignup } from '../atoms/onCloseButton';
import { Box, Typography, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { signOut } from "next-auth/react"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
const theme = createTheme({
  palette: {
    primary: { main: "#daed6e" },
    secondary: { main: "#444444" }
  },
  typography: {
    body1: {
      fontStyle: "italic",
      fontWeight: "bold"
    }
  }
});



export function ClientNav() {
  return (
    <div style={{ display: "flex", justifyContent: "flex-end" }}>
      <RecoilRoot>
        <ThemeProvider theme={theme}>
          <TokenDepend />
        </ThemeProvider>
      </RecoilRoot>
    </div>
  )
}



function TokenDepend() {
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { status } = useSession();

  if (status === "loading") {
    return (
      <LoggedOut />
    )
  }
  if (status === "authenticated") {
    setIsLoading(false)
    return (
      <LoggedIn />
    )
  }
  if (status === "unauthenticated") {
    return (
      <LoggedOut />
    )
  }
}


function LoggedIn() {
  const setUser = useSetRecoilState(userPresentState);
  const setIsLoading = useSetRecoilState(isLoadingState);
  const { data } = useSession();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const userImage = data?.user?.image;
  return (
    <>
      <div style={{ display: 'flex', justifyContent:"space-between"}}>
        <Button sx={{ borderRadius: "50px", width:"30px", height:"50px", marginTop:"4%" }}>
          <ShoppingCartIcon sx={{ color: "white", fontSize: "30px" }} />
        </Button>
        <Button sx={{ borderRadius: "50px", width:"30px", height:"50px", marginTop:"3%" }}>
          <ShoppingBagIcon onClick={() => { }} sx={{ color: "white", fontSize: "30px", marginTop: "5%" }} />
        </Button>
        <Button aria-describedby={id} onClick={handleClick} sx={{ borderRadius: "50px",width:"50px", height:"50px", marginTop:"3%" }}>
        <img src={userImage ?? ""} alt="userImage" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box sx={{ p: 2, backgroundColor:"#1f2937" }}>
        <Button onClick={async ()=> {await signOut();
    setUser(null)
    setIsLoading(true)
    window.location.href = "/"} }>Logout</Button>
        </Box>
      </Popover>
      </div>
    </>
  )
}
function LoggedOut() {
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
  return (
    <div><Button sx={{ maxWidth:"15vw", marginRight:{xs:"0vw", md:"2vw", lg:"1vw"}}} variant="text" color='primary' onClick={handleClickOpen}>Login</Button>
      <Button sx={{ maxWidth:"15vw"}} variant='contained' color='primary' onClick={handleClickOpen2}>Signup</Button>
      <Dialog PaperProps={{ sx: { borderRadius: "35px" } }} maxWidth="sm" fullWidth onClose={handleClose} open={open}>
        <SignupCard ButtonName="Login" Redirect="signup" Message="Have not registered yet" />
      </Dialog>
      <Dialog PaperProps={{ sx: { borderRadius: "35px" } }} maxWidth="sm" fullWidth onClose={handleClose2} open={open2}>
        <SignupCard ButtonName="Signup" Redirect="login" Message="Already registered" />
      </Dialog>
    </div>

  )
}