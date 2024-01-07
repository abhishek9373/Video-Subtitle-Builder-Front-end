import React, { useContext, useRef, useState } from "react";
import "../styles/subtitle.css";
import { Data } from "../services/store";
import axios from "axios";
import { VIDEO_UPLOAD } from "../shared/constants/routes.constants";

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

  const validateInput = () => {
    if (
      !validateTimeInput(
        startHr.current.value,
        startMin.current.value,
        startSec.current.value,
        startMill.current.value
      )
    ) {
      alert("Invalid start time");
      return false;
    }

    if (
      !validateTimeInput(
        endHr.current.value,
        endMin.current.value,
        endSec.current.value,
        endMill.current.value
      )
    ) {
      alert("Invalid end time");
      return false;
    }

    if (!subtitleText.current.value.trim()) {
      alert("Subtitle text cannot be empty");
      return false;
    }

    return true;
  };

  const validateTimeInput = (hr, min, sec, mill) => {
    const isValidNumber = (value) => !isNaN(value) && parseInt(value, 10) >= 0;

    return (
      isValidNumber(hr) &&
      isValidNumber(min) &&
      isValidNumber(sec) &&
      isValidNumber(mill)
    );
  };

  const handleSubtitleSubmit = () => {
    if (validateInput()) {
      const startTime = `${parseInt(startHr.current.value)}:${parseInt(
        startMin.current.value
      )}:${parseInt(startSec.current.value)}:${parseInt(
        startMill.current.value
      )}`;
      const endTime = `${parseInt(endHr.current.value)}:${parseInt(
        endMin.current.value
      )}:${parseInt(endSec.current.value)}:${parseInt(endMill.current.value)}`;
      const newSubtitle = {
        startTime,
        endTime,
        subtitle: subtitleText.current.value.trim(),
      };
      setSubtitles([...subtitles, newSubtitle]);

      // Clear input fields after adding a subtitle
      startHr.current.value = "";
      startMin.current.value = "";
      startSec.current.value = "";
      startMill.current.value = "";
      endHr.current.value = "";
      endMin.current.value = "";
      endSec.current.value = "";
      endMill.current.value = "";
      subtitleText.current.value = "";
    }
  };

  const handleFinalSubmit = async () => {
    if (subtitles.length > 0) {
      const srtContent = subtitles
        .map(
          (subtitle, index) =>
            `${index + 1}\n${subtitle.startTime} --> ${subtitle.endTime}\n${
              subtitle.subtitle
            }\n\n`
        )
        .join("");
      const srtBlob = new Blob([srtContent], { type: "text/plain" });

      const formData = new FormData();
      formData.append("video-file", file);
      formData.append("subtitle-file", srtBlob, "subtitles.srt");

      // Use Axios to send the FormData to the server
      await axios.post(VIDEO_UPLOAD, formData);
    } else {
      alert("Please add at least one subtitle before uploading the video.");
    }
  };

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
                  <input
                    ref={startHr}
                    type="text"
                    name="start-hr"
                    id="start-hr"
                    placeholder="HH"
                  />
                  <span>:</span>
                  <input
                    ref={startMin}
                    type="text"
                    name="start-min"
                    id="start-min"
                    placeholder="MM"
                  />
                  <span>:</span>
                  <input
                    ref={startSec}
                    type="text"
                    name="start-sec"
                    id="start-sec"
                    placeholder="SS"
                  />
                  <span>:</span>
                  <input
                    ref={startMill}
                    type="text"
                    name="start-mill"
                    id="start-mill"
                    placeholder="MS"
                  />
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
                  <input
                    ref={endHr}
                    type="text"
                    name="end-hr"
                    id="end-hr"
                    placeholder="HH"
                  />
                  <span>:</span>
                  <input
                    ref={endMin}
                    type="text"
                    name="end-min"
                    id="end-min"
                    placeholder="MM"
                  />
                  <span>:</span>
                  <input
                    ref={endSec}
                    type="text"
                    name="end-sec"
                    id="end-sec"
                    placeholder="SS"
                  />
                  <span>:</span>
                  <input
                    ref={endMill}
                    type="text"
                    name="end-mill"
                    id="end-mill"
                    placeholder="MS"
                  />
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
                  <textarea
                    ref={subtitleText}
                    rows={3}
                    cols={5}
                    type="text"
                    name="subtitle-text"
                    id="subtitle-text"
                  />
                  <button id="submit-subtitle" onClick={handleSubtitleSubmit}>
                    Next Subtitle
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div id="final-submit">
        {subtitles && <button onClick={handleFinalSubmit}>Upload Video</button>}
      </div>
    </div>
  );
}
