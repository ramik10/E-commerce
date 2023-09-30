"use client"
import { Grid } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";

type category = {
    id: string,
    name: string,
    image: string
  }
  
export default function Categories(){
    const [categories, setCategories] = useState<category[]>([]) ;
    useEffect(() => {
      axios.get("/api/categories").then((res) => {
        setCategories(res.data)
      })
    }, [])
    
    return(
      <Grid container spacing={2} sx={{ display:"flex", justifyContent:"center", marginTop:"1%"}}>
        {categories.map((c:category) =>  <Grid item lg={3} key={c.id}>
        <img src={c.image} alt={c.name} style={{maxHeight:"25vh", width:"100%"}}/>
        <h3  style={{display:"flex",justifyContent:"center", color:"white"}}>{c.name}</h3>
      </Grid>)}
      </Grid> 
      )

        
  }