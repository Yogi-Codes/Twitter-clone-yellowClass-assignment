import React, { useEffect } from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Typography } from '@mui/material';
import "./Home.css";
import Foryou from '../../Components/ForYou/Foryou';
import Following from '../../Components/Following/Following';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

export default function Home() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const { currentUser } = useSelector((state) => state.user);
    const navigate = useNavigate();

    useEffect(() => {

        if (!currentUser) {
            navigate("/");
        }

    }, [])




    return (
        <div style={{height: "100%",display:"flex",flexDirection:"column"}}>
            <Typography fontSize="20px" fontWeight={600} margin={"12px"}>Home</Typography>
            <div style={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs TabIndicatorProps={{ style: { color: "white", height: "6px", borderRadius: "3px" } }} value={value} onChange={handleChange} centered>
                    <Tab label="For you" style={{ margin: "0px 70px 0 10px", textTransform: "none", fontWeight: "600", fontSize: "15px", color: "whitesmoke" }} />
                    <Tab label="Following" style={{ textTransform: "none", fontWeight: "600", fontSize: "15px", color: "whitesmoke" }} />
                </Tabs>
            </div>
            <div style={{display: "flex", flexGrow:"1",flexDirection:"column",overflowY:"auto"}}>
                {
                    value ? <Following/> : <Foryou />
                }
            </div>
        </div>
    )
}

