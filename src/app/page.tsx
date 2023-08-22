"use client"
import { Button } from "@mui/material";
import {useRouter} from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div style={{display:"flex", justifyContent:"center", paddingTop:"3vh"}}>
      <img  style={{width:"35vw"}} src="/pngegg (1).png" />
      <Button onClick={()=>router.push("/user/products")}>Buy products</Button>
    </div>
  )
}
