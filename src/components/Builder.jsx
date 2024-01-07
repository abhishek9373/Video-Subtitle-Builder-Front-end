import React, { useContext, useEffect } from "react";
import "../styles/builder.css";
import ReactPlayer from "react-player";
import { Data } from "../services/Store";
import { useNavigate } from "react-router-dom";
import Subtitle from "./Subtitle";

export default function Builder() {
  const navigate = useNavigate();
  const { file, updateFile } = useContext(Data);
  useEffect(() => {
    if (!file) navigate("/selectvideo");
  }, [file]);
  return (
    <div id="builder-aligner">
        {file && (
          <ReactPlayer
            url={URL.createObjectURL(file)}
            controls
            width="60%"
            height="auto"
          />
        )}
        {file && <Subtitle />}
      </div>
  );
}
