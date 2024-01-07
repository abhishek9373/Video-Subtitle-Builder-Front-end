import React, { useContext, useEffect } from "react";
import "../styles/builder.css";
import { Data } from "../services/store";
import { useNavigate } from "react-router-dom";
import Subtitle from "./Subtitle";
import Player from "./Player";

export default function Builder() {

  const navigate = useNavigate();
  const { file, updateFile } = useContext(Data);

  useEffect(() => {
    if (!file) navigate("/selectvideo");
  }, [file]);

  useEffect(()=>{
    const userId = localStorage.getItem("userId");
    if(!userId) navigate("/");
  }, [])

  return (
    <div id="builder-aligner">
      {file && <Player url={URL.createObjectURL(file)} />}
      {file && <Subtitle />}
    </div>
  );
}
