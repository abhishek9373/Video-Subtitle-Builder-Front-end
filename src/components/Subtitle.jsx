import React, { useContext, useRef, useState } from "react";
import "../styles/subtitle.css";
import { Data } from '../services/Store';
import axios from 'axios';

export default function Subtitle() {

    const [subtitles, setSubtitles] = useState([]);
    const { file, updateFile } = useContext(Data);

    const startHr = useRef();
    const startMin = useRef();
    const startSec = useRef();
    const startMill = useRef();
    const endHr = useRef();
    const endMin = useRef();
    const endSec = useRef();
    const endMill = useRef();
    const subtitleText = useRef();

    const handleSubtitleSubmit = () => {
        const startTime = `${parseInt(startHr.current.value)}:${parseInt(startMin.current.value)}:${parseInt(startSec.current.value)}`
        const endTime = `${parseInt(endHr.current.value)}:${parseInt(endMin.current.value)}:${parseInt(endSec.current.value)}`
        const newSubtitle = { startTime, endTime, subtitle: subtitleText.current.value }
        setSubtitles([...subtitles, newSubtitle]);
    }

    const handleDownloadSrtFile = () =>{
      const srtContent = subtitles
      .map((subtitle, index) => `${index + 1}\n${subtitle.startTime} --> ${subtitle.endTime}\n${subtitle.subtitle}\n\n`).join("");
      const srtBlob = new Blob([srtContent], { type: "text/plain" });

      const formData = new FormData();
      formData.append("video-file", file);
      formData.append("subtitle-file", srtBlob, "subtitles.srt");

      // Use Axios to send the FormData to the server
      axios.post("http://localhost:3015/file", formData)
        .then((response) => {
          console.log("Server response:", response.data);
          // Handle server response as needed
        })
        .catch((error) => {
          console.error("Error uploading files:", error);
      });
    }

  return (
    <div id="subtitle-container">
      <h4>Add subtitles for video</h4>
      <div className="main-container">
        <table>
          <tbody>
            <tr>
              <td>
                <label htmlFor="start-time" className="label">
                  From
                </label>
              </td>
              <td>
                <div className="start-time-row">
                  <input ref={startHr} type="text" name="start-hr" id="start-hr" placeholder="HH" />
                  <span>:</span>
                  <input ref={startMin} type="text" name="start-min" id="start-min" placeholder="MM" />
                  <span>:</span>
                  <input ref={startSec} type="text" name="start-sec" id="start-sec" placeholder="SS" />
                  <span>:</span>
                  <input ref={startMill} type="text" name="start-mill" id="start-mill" placeholder="MS" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="end-time" className="label">
                  To
                </label>
              </td>
              <td>
                <div className="end-time-row">
                  <input ref={endHr} type="text" name="end-hr" id="end-hr" placeholder="HH" />
                  <span>:</span>
                  <input ref={endMin} type="text" name="end-min" id="end-min" placeholder="MM" />
                  <span>:</span>
                  <input ref={endSec} type="text" name="end-sec" id="end-sec" placeholder="SS" />
                  <span>:</span>
                  <input ref={endMill} type="text" name="end-mill" id="end-mill" placeholder="MS" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <label htmlFor="subtitle-text" className="label">
                  Subtitle
                </label>
              </td>
              <td>
                <div className="subtitle-row">
                  <textarea ref={subtitleText} rows={3} cols={50} type="text" name="subtitle-text" id="subtitle-text" />
                  <button id="submit-subtitle" onClick={handleSubtitleSubmit}>Next Subtitle</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        {subtitles && (<button onClick={handleDownloadSrtFile}>Upload Video</button>)}
      </div>
    </div>
  );
}
