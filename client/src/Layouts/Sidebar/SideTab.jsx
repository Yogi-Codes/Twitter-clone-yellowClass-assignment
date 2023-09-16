import React from 'react'
import "./SideTab.css"
function SideTab({text, Icon}) {
  return (
    <div className='side' >
       <div className='option'>
       <div style={{padding:"20px",paddingTop:"0px"}}>
        <Icon fontSize={"large"} />
        </div>
        <h2>{text}</h2>
       </div>
    </div>
  )
}

export default SideTab