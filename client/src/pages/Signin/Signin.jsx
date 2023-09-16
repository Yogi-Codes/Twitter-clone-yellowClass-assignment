import React, { useEffect, useState } from 'react'
import big_logo from "./../../assets/twitter_big.webp"
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import logo from "./../../assets/logo_twitter.ico"
import Signup from '../../Components/Modal/Signup';
import SigninModal from '../../Components/Modal/Signin';


function Signin() {
  const [screenSize, setScreenSize] = useState(getCurrentDimension()); 
  const [showSignup, setshowSignup] = useState(false)
  const [showSignin, setshowSignin] = useState(false)
  function onCloseSignup() {
    setshowSignup(false)
    
  }
  function onCloseSignin() {
    setshowSignin(false)
    
  }
  function getCurrentDimension(){
    return {
      	width: window.innerWidth,
      	height: window.innerHeight
    }
}
useEffect(() => {
  const updateDimension = () => {
    setScreenSize(getCurrentDimension())
  }
  window.addEventListener('resize', updateDimension);
  
  return(() => {
      window.removeEventListener('resize', updateDimension);
  })
}, [screenSize]) 
  return (
    <div style={{display:"flex",justifyContent:"space-evenly",flexDirection:"row",overflowX:"auto"}} >
      {showSignup?<div>
        <Signup show={showSignup} close={onCloseSignup} />
    </div>:null}
    {showSignin?<div>
        <SigninModal show={showSignin} close={onCloseSignin} />
    </div>:null}
 
    <div style={{height:"100vh",minHeight:"1000px",maxWidth:"50vw",backgroundColor:"#000"}} >
      <img src={big_logo} style={{marginTop:"200px",display:screenSize.width>1024?"block":"none",width:screenSize.width/2}} />
    </div>
    <div style={{height:"100vh",minHeight:"1000px",width:screenSize.width>1024?"50vw":"100vw",backgroundColor:"black"}}>
    <img
            src={logo}
            alt="Twitter Logo"
            width={"50px"}
            style={{marginTop:"100px",marginLeft:"100px",display:screenSize.width>1024?"none":'block'}}
            
          />
    <div style={{marginTop:screenSize.width>1024?"150px":"250px",marginLeft:"100px"}}>
 
    
      
    <Typography variant='h1' sx={{color:"#FFFFFF",fontWeight:"bold",fontSize:"76px"}} >Happening now</Typography>
    <Typography variant='h4' sx={{color:"#FFFFFF",fontWeight:"bold",marginTop:"80px"}} >Join today.</Typography>
   <div style={{display:"flex",justifyContent:"space-evenly",flexDirection:"column"}}>
   <Button variant="contained" size='large'
     sx={{borderRadius:"20px",fontWeight:"bold",backgroundColor:"#1D9BF0",  
     textTransform: "none",width:"300px",marginTop:"50px" }}
    onClick={()=>{setshowSignup(true)}}
     >Create account</Button>
      <Button variant="contained" size='large'
     sx={{borderRadius:"20px",fontWeight:"bold",backgroundColor:"#000000",  
     textTransform: "none",width:"300px",marginTop:"50px",color:"#1D9BF0",border:"0.3px solid #ffffff",":hover":{
      backgroundColor:"#ffffff"
     } }}
    onClick={()=>{
      setshowSignin(true)
    }}
     >Signin</Button>
   </div>

    </div>
   
    </div>
    </div>
  )
}

export default Signin