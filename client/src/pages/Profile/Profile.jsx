import React from 'react'
import { Typography } from '@mui/material';
import "./Profile.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CONST from '../../consts';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Link, useLocation, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux"
import { following } from "../../Redux/useSlice";
import { useCookies } from 'react-cookie';
function Profile(props) {
  const { tw, setData } = props;
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [nameIni, setnameIni] = useState("")
  const [follow, setfollow] = useState(0)
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(["user"]);
  const handleFollowUnfollow = async (e) => {



    try {

      if (!currentUser.following.includes(id)) {
        try {
          const follow = await axios.put(CONST.server + `/users/follow/${id}`, {
            id: currentUser._id,
            access_token:cookies.access_token
          },{
            withCredentials:true
          });
          dispatch(following(id));
          setfollow(follow + 1)
        } catch (err) {
          console.log("error", err);
        }
      } else {
        try {
          const unfollow = await axios.put(CONST.server + `/users/unfollow/${id}`, {
            id: currentUser._id,
            access_token:cookies.access_token
          },{
            withCredentials:true
          });

          dispatch(following(id));
        } catch (err) {
          console.log("error", err);
        }
      }

      setfollow(follow + 1)



    } catch (err) {
      console.log("error", err);
    }
  };




  let { id } = useParams();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const findUser = await axios.get(CONST.server + `/users/find/${id}`);

        setUserData(findUser.data);
        setnameIni(findUser.data.username)
      } catch (err) {
        console.log("error", err);
      }
    }; fetchData();
  }, [currentUser, id]);

  return (
    <div className='ProfileMain'>
      <div className="Cover">
        <div className="ProfilePic">
          <Avatar sx={{ bgcolor: red[500], cursor: "pointer", fontSize: "50px",height:"100%",width:"100%" }} aria-label="recipe"
          >
            {nameIni.slice(0, 1).toUpperCase()}
          </Avatar>
        </div>

        {currentUser._id === id ? (
          <Button id = "postBut" variant="contained" size='large'
            // sx={{
            //   borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
            //   textTransform: "none", marginLeft: "15px", marginBottom: "10px", width: "80%", maxWidth: "200px", maxHeight: "30px"
            // }}

            className='ProfileFollow'
          ><Typography fontWeight={600} fontSize={"small"}>Edit Profile</Typography></Button>
        ) : currentUser.following.includes(id) ? (
          <Button id="postBut" variant="contained" size='large'
            // sx={{
            //   borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
            //   textTransform: "none", marginLeft: "15px", marginBottom: "10px", width: "80%", maxWidth: "200px", maxHeight: "30px"
            // }}
            onClick={handleFollowUnfollow}
            className='ProfileFollow'
          ><Typography fontWeight={600} fontSize={"small"}>Following</Typography></Button>
        ) : (
          <Button id="postBut" variant="contained" size='large'
            // sx={{
            //   borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
            //   textTransform: "none", marginLeft: "15px", marginBottom: "10px", width: "80%", maxWidth: "200px", maxHeight: "30px"
            // }}
            onClick={handleFollowUnfollow}
            className='ProfileFollow'
          ><Typography fontWeight={600} fontSize={"small"}>Follow</Typography></Button>)}

      </div>
      {
        id != null ?
          <Typography className="Name" fontWeight={600}  fontSize={"small"} style={{ marginLeft: "20px" }}>{nameIni}</Typography> :
          <></>
      }

    </div>
  )
}

export default Profile