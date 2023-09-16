import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import PublicIcon from '@mui/icons-material/Public';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import VideocamIcon from '@mui/icons-material/Videocam';
import axios from "axios"
import CONST from "../../consts"
import { red } from '@mui/material/colors';
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from "react-router-dom"
import { Alert } from '@mui/material';
import { useCookies } from 'react-cookie';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "30vw",
  bgcolor: '#000',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  color: "#ffffff"
};

export default function Tweet(param) {
  const { show, close } = param;
  const { currentUser } = useSelector((state) => state.user);
  const [description, setdescription] = useState("")
  const [file, setfile] = useState(null);
  const [open, setOpen] = useState(show);
  const [shall, setshall] = useState(false)
  const [imageUrl, setImageUrl] = useState(null);
  const [update, setupdate] = useState(0)
  const [isImage, setIsImage] = useState(true)
  const navigate = useNavigate();
  const [err, setErr] = useState(false)
  const [cookies, setCookie] = useCookies(["user"]);


  const handleClose = () => {
    setOpen(false);

  }



  const handleTweet = async () => {
    try {

      const formData = new FormData();
      formData.append('userId', currentUser._id);
      formData.append('description', description);
      formData.append('file', file);
      formData.append('access_token', cookies.access_token); 
      formData.append('media', [])

      const post = await axios.post(CONST.server + `/tweets/`, formData, {
        withCredentials: true,

        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

     close();
     setTimeout(() => {
      window.location.reload()
      
     }, 1000);

    } catch (err) {
      setErr(true)
      setTimeout(() => {
        setErr(false)
        
      }, 3000);
    }
  }


  return (
    <div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={() => {
          handleClose();
          close();
        }}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <div style={{ display: "flex", justifyContent: "space-between", flexDirection: "row" }}>
              <div style={{ cursor: "pointer" }}
                onClick={() => {
                  handleClose();
                  close();
                }} >
                <CloseIcon />
              </div> <Typography variant='h7' sx={{ color: "#1D9BF0", fontWeight: "bold" }} >Drafts</Typography>
            </div>
            <div style={{ height: "100%", justifyContent: "left", display: "flex" }}>
              <Avatar sx={{ bgcolor: red[500], cursor: "pointer" }} aria-label="recipe"
                onClick={() => {
                  navigate(`/profile/${currentUser._id}`)
                }}
              >
                {currentUser.username.slice(0, 1).toUpperCase()}
              </Avatar>
              <h1 style={{
                display: 'inline-block',
                padding: '0px 20px',
                border: '1px solid #5A5A5A',
                borderRadius: '20px',
                height: "25px",
                color: "#1D9BF0",
              
                fontSize: "14px",
                fontWeight: "bold",
                marginLeft:"20px"
              }}>
                Everyone v
              </h1>



            </div>
            <div>

              <TextField
                id="outlined-multiline-static"
                multiline
                rows={4}
                value={description}
                onChange={(e) => {
                  setdescription(e.target.value)
                }}

                placeholder="What is happening?!"
                InputProps={{
                  style: { color: '#FFFFFF' },
                
                }}
                
                InputLabelProps={{
                  style: { color: '#71767B' },
                }}
                style={{overflowY:"auto"}}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: "black",
                    },
                  },
                }}
              />
              {file != null ? isImage ? <img style={{ width: "100%" }} src={URL.createObjectURL(file)} alt="Selected" /> : <video style={{ width: "100%" }} src={URL.createObjectURL(file)} /> : null}

            </div>
            <div>
              <PublicIcon fontSize='small' style={{ color: "#1D9BF0" }} /> <Typography variant='h7' sx={{ color: "#1D9BF0", fontWeight: "bold" }} >Everyone can reply </Typography>
            </div>

            <hr style={{ color: "#5A5A5A", marginTop: "20px" }} ></hr>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }} >
              <div>

                <input
                  type="file"
                  id="fileInput"
                  style={{
                    display: 'none', // Hide the default file input
                  }}
                  onChange={(e) => {
                    setfile(e.target.files[0]);
                    setupdate(update => update + 1)
                    console.log(e.target.files[0].type)
                    if (e.target.files[0].type.includes("image/")) {
                      setIsImage(true)
                    }
                    else {
                      setIsImage(false)
                    }


                  }}
                />
                <label htmlFor="fileInput" style={{ cursor: 'pointer' }} >
                  <PhotoCameraBackIcon fontSize="small" style={{ color: "#1D9BF0" }} />
                  <VideocamIcon fontSize='small' style={{ color: "#1D9BF0" }} />
                </label>

              
              </div>
              <Button variant="contained" size='large'
                sx={{
                  borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
                  textTransform: "none"
                }}
                onClick={() => {
                  setshall(true)
                  handleTweet();
                }}
                id='pbutton'
              >Post</Button>

            </div>
            {err && <Alert variant="filled" severity="error">
 Error occured !pls try again
</Alert>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}




