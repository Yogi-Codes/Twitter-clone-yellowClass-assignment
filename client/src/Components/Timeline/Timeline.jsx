import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import CONST from "../../consts";
import Tweet from "../../Components/Tweet/Tweet";
import { useCookies } from "react-cookie";

function Timeline() {
  const [timeLine, setTimeLine] = useState(null);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const timelineTweets = await axios.get(
          CONST.server + `/tweets/explore`
        );

        setTimeLine(timelineTweets.data);
   
      } catch (err) {
        console.log("error", err);
      }
    };

    fetchData();
  }, [currentUser._id]);
  return (
    <div style={{display:"flex",flexDirection:"column",gap:"10px",alignItems:"center",padding:"20px",padding:"10px"}}>
      {timeLine &&
        timeLine.map((tweet) => (
          <div>
            <Tweet tw={tweet} key={tweet._id} setData={setTimeLine} />
          </div>
        ))}
      {/* <div style={{ height: "200px" }}></div> */}
    </div>
  );
}

export default Timeline;
