import React from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
  return (
    <div style={{display:"flex",justifyContent:"center",flexDirection:"row"}} >
     <Typography variant='h4' sx={{color:"#000000",fontWeight:"bold",margin:"20px",margin:"300px"}} >Hmm...this page doesn’t exist. Try searching for something else.
     <Button variant="contained" size='large'
     sx={{borderRadius:"20px",fontWeight:"bold",width:"300px",backgroundColor:"#000000",  
     textTransform: "none",color:"#FFFFFF",border:"0.3px solid #ffffff",":hover":{
        backgroundColor:"gray"} }}
   onClick={()=>{
    navigate("/")
   }}
     >Search</Button>
     </Typography>


    </div>
  )
}

export default Error