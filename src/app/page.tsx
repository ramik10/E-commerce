import { Grid } from "@mui/material";

import { getServerSession } from "next-auth"
import Categories from "@/components/Categories";

export default async function Home() {
  
  const session = await getServerSession();
  const username = session?.user?.name;
  
  return (
    <>
    <div style={{display:"flex",justifyContent:"center", marginTop:"1%", maxHeight:"60vh"}}>
      <img src="https://www.passionateinmarketing.com/wp-content/uploads/2022/06/Flipkart.jpg" alt="Logo" style={{maxWidth:"80%", height:"auto"}}/>
    </div>
    <div style={{display:"flex",justifyContent:"center", marginTop:"1%"}}>
      <h1 style={{color:"white"}}>Welcome {username}</h1>
    </div>
    <div style={{display:"flex",justifyContent:"center", marginTop:"1%"}}>
      <h1 style={{color:"white"}}>Categories</h1>
    </div>
    <div style={{marginLeft:"10%", marginRight:"10%"}}>
      <Categories/>
    </div>
    </>
  )
}


