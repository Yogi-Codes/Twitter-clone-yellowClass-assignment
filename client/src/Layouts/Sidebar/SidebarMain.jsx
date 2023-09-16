import React from 'react';
import { useState } from 'react';
import logo from "../../assets/logo_twitter.ico";
import { Typography } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import ListAltIcon from "@mui/icons-material/ListAlt";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import Tweet from "./../../Components/Modal/Tweet"
import Button from '@mui/material/Button';
import { NavLink } from 'react-router-dom';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Fab from '@mui/material/Fab';
import { useSelector } from "react-redux";
import PersonIcon from '@mui/icons-material/Person';
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/useSlice';
import { useNavigate } from "react-router-dom"
import { red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';


function MenuItem(props) {
  const text = props.text;
  const Icon = props.Icon;

  return (
    <div className="SideTabMain">
      <Icon fontSize={"large"} style={{ color: "white" }} />
      <Typography id="TabText">{text}</Typography>
    </div>
  );
}

function SidebarMain(props) {

  const { currentUser } = useSelector((state) => state.user);
  const location = props.location;
  const [Show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handlLogout = (params) => {

    dispatch(logout());
    navigate("/signin")

  }

  function onClose() {
    setShow(false)
  }

  console.log(location);

  return (
    <div className="SidebarMain">

      {Show ? <div style={{ margin: "0", padding: "0" }}>
        <Tweet show={Show} close={onClose} />
      </div> : null}

      <div>
        <img src={logo} alt="Twitter Logo" width={"35px"} className="ml-8" />
      </div>

      <div className="Links">
        <NavLink
          to="/user/home"
          style={{
            textDecoration: "none",
            color: "white"
          }}
        >
          <MenuItem text="Home" Icon={(location.pathname == "/user" || location.pathname == "/user/home" || location.pathname == "/user/" || location.pathname == "/user/home/") ? HomeIcon : HomeOutlinedIcon} />
        </NavLink>
        <NavLink
          to="/user/home"
          style={{
            textDecoration: "none",
            color: "white"
          }}
        >
          <MenuItem text="Explore" Icon={(location.pathname == "/explore") ? SearchIcon : SearchOutlinedIcon} />
        </NavLink>
        <MenuItem text="Notifications" Icon={NotificationsNoneIcon} />
        <MenuItem text="Messages" Icon={MailOutlineIcon} />
        <MenuItem text="Bookmarks" Icon={BookmarkBorderIcon} />
        <MenuItem text="Lists" Icon={ListAltIcon} />
        <NavLink
          to={"/user/profile/" + currentUser._id}
          style={{
            textDecoration: "none",
            color: "white"
          }}
        >
          <MenuItem text="Profile" Icon={(location.pathname.includes("user/profile/")) ? PersonIcon : PermIdentityIcon} />
        </NavLink>
        <MenuItem text="More" Icon={MoreHorizIcon} />
        <Button id="post" variant="contained" size='large'
          sx={{
            paddingLeft:0,paddingRight:0,
            borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
            textTransform: "none", marginBottom: "10px", maxWidth: "200px"
          }}
          onClick={() => { setShow(true) }}
        >
          <Typography id = "TabText">Post</Typography>
          <PostAddIcon/>
        
        </Button>
      </div>


      <Button id="post" variant="contained" size='large'
        sx={{
          // border:"2px solid brown",
          borderRadius: "20px", backgroundColor: "#000000",
          textTransform: "none",
          padding:"2%",
          ":hover": { backgroundColor: "white", color: "black"}
        }}
        onClick={() => { handlLogout(true) }}
      >
        <Avatar sx={{ bgcolor: "#000000", cursor: "pointer"}} aria-label="recipe"
          onClick={() => {
            navigate(`/profile/${currentUser._id}`)
          }}
        >
          {currentUser.username.slice(0, 1).toUpperCase()}
        </Avatar>
        <Typography id = "TabText" style = {{marginLeft:"2px",marginRight:"5px"}}>Logout</Typography>
        <MoreHorizIcon id = "TabText"/>
      </Button>


      {/* <Fab color="primary" aria-label="add" id="PostButton"
        onClick={() => { setShow(true) }}
      >
        <PostAddIcon />
      </Fab> */}

    </div>
  );
}

export default SidebarMain;