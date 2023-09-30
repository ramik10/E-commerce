import { TextField } from "@mui/material"


export function SearchBar() {
    return(
        <div style={{display:"flex", flexDirection:"row", alignItems:"center", justifyContent:"center"}}>
            <TextField size="small" sx={{borderRadius:"16px", border:"none" , width:{xs:"30vw", md:"50vw"}, backgroundColor:"#374151", input:{color:"white"}}} placeholder="Search for products" />
        </div>
    )
}