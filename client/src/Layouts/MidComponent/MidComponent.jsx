import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MidComponent.css"
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";
import {useNavigate} from "react-router-dom"
import Timeline from "../../Components/Timeline/Timeline";


const MidComponent= () => {
  const [userData, setUserData] = useState(null);
  const location = useLocation().pathname;
  const [selected, setselected] = useState("one")
const navigate = useNavigate();
const [expanded, setExpanded] = React.useState(false);
const {currentUser} = useSelector((state)=>state.user)
useEffect(() => {
 
if(!currentUser){
  navigate("/signin")
}

}, [])

const handleExpandClick = () => {
  setExpanded(!expanded);
};

  return (
  
    <div style={{width:"100%",maxWidth:"600px"}}>
      <div className="navbar-container">    
  <div style={{marginTop:"25px",width:"100%"}}>
  
  <Box
  
  sx={{
    width: "100%",
    display: "flex",
    justifyContent: "space-evenly",
    flexDirection: "row",
    flexWrap:"wrap",
    ...darkThemeStyles // Apply dark theme styles to the container
  }}
>
<Typography variant="h5" className="titleTop" sx={{width:"100%",marginLeft:"65px"}} >Home</Typography>
  <Tabs
    value={selected}
    textColor="inherit"
    indicatorColor="primary"
    aria-label="secondary tabs example"
   TabIndicatorProps={{style: {width:60,alignItems:"center",marginLeft:"120px",height:"5px"}}}

  >
    <Tab
      value="one"
      className="tab"
   
      label="For You"
      sx={darkThemeStyles}
      onClick={()=>{
        setselected("one")
      }}
      
    />
    <Tab
      value="two"
    
      className="tab"
      label="Following"
      sx={darkThemeStyles}
      onClick={()=>{
        setselected("two")
      }} // Apply dark theme styles to the tab
    />
  </Tabs>
</Box>
  </div>
        
      </div>
     <Timeline/>


    </div>
  );
};

export default MidComponent;
const darkThemeStyles = {
  background: "#000000", // Background color for the dark theme
  color: "#ffffff",
   textTransform: "none" 
  
};
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));