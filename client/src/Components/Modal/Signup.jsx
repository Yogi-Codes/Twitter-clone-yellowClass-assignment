import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import logo from "./../../assets/logo_twitter.ico"
import { useState } from 'react';
import axios from "axios"
import consts from '../../consts';
import { useDispatch } from "react-redux"
import { loginFailed, loginStart, loginSuccess } from "../../Redux/useSlice"
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

export default function Signup(param) {
  const { show, close } = param;
  const [open, setOpen] = React.useState(show);
  const [username, setUsername] = useState("");
  const [Password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const dispatch = useDispatch();
  const [err, seterr] = useState(false)
  const [cookies, setCookie] = useCookies(["user"]);
  const handleClose = () => {
    setOpen(false);
  }
  function handleCookie(token) {
    setCookie('access_token', token, { path: '/' });
  }
  const navigate = useNavigate();
  const Signup = async (e) => {
    e.preventDefault();
    dispatch(loginStart())


    try {
      const res = await axios.post(consts.server + "/auth/signup",
        {
          email: email,
          username: username,
          password: Password

        }
      )
      console.log(res);

      dispatch(loginSuccess(res.data))
      handleCookie(res.data.token);
      navigate("/user")


    } catch (error) {
      seterr(true)
      setTimeout(() => {
        seterr(false)

      }, 3000);
      dispatch(loginFailed())


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
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                handleClose();
                close();
              }}
            >
              <CloseIcon />
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>

              <img src={logo} alt="Twitter Logo" width={"50px"} />
            </div>
            <Typography variant='h4' sx={{ color: "#FFFFFF", fontWeight: "bold", margin: "20px" }} >Create your account</Typography>
            <div style={{ display: "flex", justifyContent: "space-around", flexDirection: "column" }} >
              <TextField
                required
                id="outlined-required"
                placeholder='Email'
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                InputProps={{
                  style: { color: '#FFFFFF', margin: "20px" },
                }}
                InputLabelProps={{
                  style: { color: '#71767B' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}


              />
              <TextField
                required
                id="outlined-required"
                placeholder='Name'
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
                InputProps={{
                  style: { color: '#FFFFFF', margin: "20px" },
                }}
                InputLabelProps={{
                  style: { color: '#71767B' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}


              />
              <TextField
                required
                value={Password}
                id="outlined-required"
                placeholder='Password'
                onChange={(e) => {
                  setPassword(e.target.value);

                }}
                InputProps={{
                  style: { color: '#FFFFFF', margin: "20px" },
                }}
                InputLabelProps={{
                  style: { color: '#71767B' },
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': {
                      borderColor: 'white',
                    },
                  },
                }}


              />

            </div>


            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }} >

              <Button variant="contained" size='large'
                sx={{
                  borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0",
                  textTransform: "none", width: "300px", margin: "20px", marginLeft: "100px"
                }}
                onClick={Signup}
              >Create account</Button>

            </div>
            {err && <Alert variant="filled" severity="error">
              use non-empty unique values
            </Alert>}
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}




