import React from 'react'
import "./RightSideBar.css"
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

function RightSideBar() {
  return (
    <div className='rightbar'>
      <div className='inpSearch' >
        <SearchIcon style={{ marginTop: "5px", marginLeft: "7px", color: "grey" }} />
        <input className='inp' placeholder='Search' ></input>
      </div>
      <Card sx={{ maxWidth: 350, marginLeft: "20px", marginTop: "20px", backgroundColor: "#16181C", color: "#fff", borderRadius: "20px" }}>
        <CardContent>

          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }} >
            Subcribe to Premium
          </Typography>

          <Typography variant="body2" sx={{ fontWeight: "bold" }}>
            Subscribe to unlock new features and if eligible, receive a share of ads revenue.

          </Typography>
        </CardContent>

        <Button variant="contained" sx={{ borderRadius: "20px", fontWeight: "bold", backgroundColor: "#1D9BF0", textTransform: "none", marginLeft: "15px", marginBottom: "10px" }}>Subscribe</Button>

      </Card>
      <Card sx={{ maxWidth: 350, marginLeft: "20px", marginTop: "20px", backgroundColor: "#16181C", color: "#fff", borderRadius: "20px", maxHeight: "30vh" }}>
        <CardContent>

          <Typography variant="h6" component="div" sx={{ fontWeight: "bold" }} >
            Who to follow
          </Typography>


        </CardContent>


        <CardActions>
          <Button size="small" sx={{ textTransform: "none" }}>Show More</Button>
        </CardActions>

      </Card>


    </div>
  )
}

export default RightSideBar