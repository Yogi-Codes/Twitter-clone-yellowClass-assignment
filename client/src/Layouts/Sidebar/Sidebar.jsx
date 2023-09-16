import React, { useEffect, useState } from 'react'
import logo from "./../../assets/logo_twitter.ico"
import SideTab from './SideTab'
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tweet from "./../../Components/Modal/Tweet"
import Button from '@mui/material/Button';
import "./SideBar.css"
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/useSlice';
import { useNavigate } from "react-router-dom"
function Sidebar() {
  const [Show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function onClose() {
    setShow(false)
  }
  const handleLogout = (params) => {

    dispatch(logout());
    navigate("/signin")

  }
  return (
    <div className='sidebar'  >
      {Show ? <div>
        <Tweet show={Show} close={onClose} />
      </div> : null}
      <div className='tabs'>
        <div style={{ width: "100%", justifyContent: "left", display: 'flex', flexDirection: "row"}}>
          <img
            src={logo}
            alt="Twitter Logo"
            width={"35px"}
            className="ml-8"
          />
        </div>
        <SideTab text="Home" Icon={HomeIcon} />
        <SideTab text="Explore" Icon={SearchIcon} />
        <SideTab text="Notifications" Icon={NotificationsNoneIcon} />
        <SideTab text="Messages" Icon={MailOutlineIcon} />
        <SideTab text="Bookmarks" Icon={BookmarkBorderIcon} />
        <SideTab text="Lists" Icon={ListAltIcon} />
        <SideTab text="Profile" Icon={PermIdentityIcon} />
        <SideTab text="More" Icon={MoreHorizIcon} />
        <Button variant="contained" size='large'
          sx={{
            borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
            textTransform: "none", marginLeft: "15px", marginBottom: "10px", width: "80%"
          }}
          onClick={() => { setShow(true) }}
        >Post</Button>
      </div>
      <Button variant="contained" size='large'
        sx={{
          borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
          textTransform: "none", marginLeft: "15px", marginBottom: "10px", width: "80%"
        }}
        onClick={() => { handleLogout() }}
      >Logout</Button>
    </div>
  )
}

export default Sidebar