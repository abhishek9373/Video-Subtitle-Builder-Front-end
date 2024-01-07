import React from "react";
import "../styles/homepage.css";
import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";
import ReactPlayer from "react-player";
import { useContext } from "react";
import { Data } from "../services/Store";
import { useNavigate } from "react-router-dom"

const fileTypes = ["mp4 ", "avi", "mkv", "mpeg", "MP4"];
function Homepage() {

  const navigate = useNavigate();
  const { file, updateFile } = useContext(Data);
  const [rawFile, setRawFile] = useState(null);
  const handleChange = (file) => {
    setRawFile(file);
    updateFile(file);
  };

  return (
    <div id="home-container">
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
        maxSize={10000}
      />
      <p>
        {rawFile ? `File name: ${rawFile.name}` : "drop or select file from here"}
      </p>

      {rawFile && (
        <ReactPlayer
          url={URL.createObjectURL(rawFile)}
          controls
          width="70%"
          height="auto"
          style={{ marginTop: "20px" }}
        />
      )}

      {rawFile && (<button name="submit-name" id="submit-name" onClick={()=>navigate("/video")}>Next</button>)}
    </div>
  );
}

export default Homepage;
