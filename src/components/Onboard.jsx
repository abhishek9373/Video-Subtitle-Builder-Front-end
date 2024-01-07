import React, { useRef } from "react";
import "../styles/onboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from "../shared/constants/routes.constants";
function Onboard() {
  const numberRef = useRef();
  const navigate = useNavigate();

  const handleOnboard = async () => {
    try {
      if (!numberRef?.current?.value) return;
      const number = String(numberRef.current.value);
      if (isNaN(number)) return alert("Please enter a valid phone number");
      localStorage.setItem("phoneNumber", number.toString());
      const response = await axios.post(SERVER_URL+`/auth/onboard`, { mobile: number });
      if(response?.data?.data){
        // save userId to localstorage
        localStorage.setItem("userId", response.data.data._id);
        navigate("selectvideo");
      }else{
        // show alert box
      }
    } catch (error) {
      throw error;
    }
  };

  // implement logging system
  return (
    <div id="onboard-container">
      <div id="onboard-aligner">
        <label htmlFor="name" id="name-lable">
          Enter your phone no
        </label>
        <br />
        <input ref={numberRef} type="text" name="name" id="name" />
        <br />
        <button name="submit-name" id="submit-name" onClick={handleOnboard}>
          Next
        </button>
      </div>
    </div>
  );
}

export default Onboard;
