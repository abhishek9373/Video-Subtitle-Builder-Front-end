import React from 'react'
import '../styles/onboard.css'
import { useNavigate } from 'react-router-dom';
function Onboard() {

  const navigate = useNavigate();

  // implement logging system

  return (
    <div id="onboard-container">
        <div id="onboard-aligner">
            <label htmlFor="name" id="name-lable">Enter your name</label><br />
            <input type="text" name="name" id="name"/><br />
            <button name="submit-name" id="submit-name" onClick={()=>navigate("selectvideo")}>Next</button>
        </div>
    </div>
  )
}

export default Onboard
