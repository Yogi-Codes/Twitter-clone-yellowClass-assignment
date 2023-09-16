import React from 'react'
import { useState } from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import "./MidComponent_test.css";

export default function MidComponent_test() {

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <Tabs TabIndicatorProps={{style:{color:"white",height:"6px",borderRadius:"3px"}}} value={value} onChange={handleChange} centered>
                    <Tab label="For you" style={{ margin:"0px 70px 0 10px",textTransform: "none",fontWeight: "600",fontSize:"15px",color:"whitesmoke"}} />
                    <Tab label="Following" style={{ textTransform: "none", fontWeight: "600",fontSize:"15px",color:"whitesmoke"}} />
                </Tabs>
            </Box>
            <div>
                {
                    value ? <>replace with component 1</> : <>replace with component 2</>
                }
            </div>
        </>
    )
}

