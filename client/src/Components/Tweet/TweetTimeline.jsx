import React from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CONST from '../../consts';
import { useNavigate } from "react-router-dom"
import formatDistance from "date-fns/formatDistance"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link, useLocation, useParams } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import EditTweet from '../Modal/EditTweet';
import { Typography } from '@mui/material';
import { useCookies } from 'react-cookie';

function TweetTimeline(props) {
  const { tw, setData } = props;
  const { currentUser } = useSelector((state) => state.user);
  const [userData, setUserData] = useState([]);
  const [nameIni, setnameIni] = useState("")
  const navigate = useNavigate();
  const date = formatDistance(new Date(tw.createdAt), new Date());
  const location = useLocation().pathname;
  const [file, setfile] = useState(null);
  const [isImage, setIsImage] = useState(true)
  const [show, setshow] = useState(false)
  const [cookies, setCookie] = useCookies(["user"]);



  function onClose() {
    setshow(false)
  }
  const handleEdit = () => {
    setshow(true)
  }
  const handleLike = async (e) => {
    e.preventDefault();


    try {
      const like = await axios.put(CONST.server + `/tweets/${tw._id}/like`, {
        id: currentUser._id,
        access_token: cookies.access_token
      }, {
        withCredentials: true,
      });
      console.log(location);
      if (location == "/user/home" || location == "/user") {
        const newData = await axios.get(CONST.server + `/tweets/timeline/${currentUser._id}`);
        setData(newData.data);

      }



    } catch (err) {
      console.log("error", err);
    }
  };
  const handleDelete = async (e) => {
    // e.preventDefault();


    try {
      const del = await axios.delete(CONST.server + `/tweets/${tw._id}`, {
        data: {
          id: currentUser._id,
          access_token: cookies.access_token
        },
        withCredentials: true,
      });

      if (location == "/user/home" || location == "/user") {
        const newData = await axios.get(CONST.server + `/tweets/timeline/${currentUser._id}`);
        setData(newData.data);

      }



    } catch (err) {
      console.log("error", err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      
      try {
        const findUser = await axios.get(CONST.server + `/users/find/${tw.userId}`);

        setUserData(findUser.data);
        setnameIni(findUser.data.username.slice(0, 1).toUpperCase())

      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [tw.userId, tw.likes]);
  return (
    <Card sx={{ maxWidth: "40vw", width: "600px", padding: "20px", backgroundColor: "#000000", border: "0.5px solid #2F3336" }}
      key={tw._id}
    >
      {show ? <div>
        <EditTweet show={show} close={onClose} text={tw.description} tid={tw._id} media={tw.media[0]} />
      </div> : null}
      <CardHeader
        sx={{
          display: 'flex',
          alignItems: 'flex-start', // Add this line to make the avatar stick to the top
          bgcolor: 'red[500]',
          color: '#FFFFFF',
        }}
        avatar={
          <Avatar sx={{ bgcolor: red[500], cursor: "pointer" }} aria-label="recipe"
            onClick={() => {
              navigate(`/user/profile/${userData._id}`)
            }}
          >
            {nameIni}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={userData.username + " · " + date}
        subheader={tw.description}
        subheaderTypographyProps={{ color: 'white' }}
        style={{
          display: "flex",
          flexWrap: "wrap",
          maxWidth: 500,
          whiteSpace: 'nowrap',
          overflow: "auto",
          textOverflow: 'ellipsis'
        }}

      />

      {tw.media[0] !== "http://google.com" ? (
        tw.media[0].includes("image/") ? (
          <img
            src={tw.media[0]}
            alt="Paella dish"
            style={{ width: "100%" }}
          />
        ) : (
          <video style={{ width: "100%" }} src={tw.media[0]} controls />
        )
      ) : null}

      <div>
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "left",gap:"5%",margin:"1%" }}  >
          <div style={{ display: 'flex', justifyContent: "center", flexDirection: "row" }}>
            {tw.likes.includes(currentUser._id) ? (
              <FavoriteIcon fontSize = "small" sx={{ cursor: "pointer", color: "#F91880" }} onClick={handleLike}></FavoriteIcon>
            ) : (
              <FavoriteBorderIcon fontSize = "small" sx={{ cursor: "pointer", color: "#cdcdcd" }} onClick={handleLike}></FavoriteBorderIcon>
            )}
            <Typography fontSize = "small" style={{ color: "#cdcdcd", marginLeft: "10px", marginTop: "0px" }}>{tw.likes.length}</Typography>
          </div>
          {tw.userId === currentUser._id ? <DeleteIcon fontSize = "small" sx={{ color: "#cdcdcd" }}
            onClick={() => {
              handleDelete()
            }}
          /> : null}
          {tw.userId === currentUser._id ? <EditIcon fontSize = "small" sx={{ color: "#cdcdcd" }}
            onClick={() => {
              handleEdit()
            }}
          /> : null}

        </div>


      </div>

    </Card>
  )
}

export default TweetTimeline