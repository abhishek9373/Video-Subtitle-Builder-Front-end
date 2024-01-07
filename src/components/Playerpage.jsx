import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import parseSrt from "../services/srt-parser";
import SubtitleDisplay from "./SubtitleDisplay";
import { VIDEO_UPLOAD } from "../shared/constants/routes.constants";
import '../styles/playerpage.css'
import { useNavigate } from "react-router-dom";

export default function Playerpage() {
  const { videoId } = useParams();
  const videoURL = VIDEO_UPLOAD + `/${videoId}`;
  const [videoUrl, setVideoUrl] = useState(null);
  const [subtitleContent, setSubtitleContent] = useState("");
  const [subtitles, setSubtitles] = useState([]);
  const [played, setPlayed] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchVideoUrl = async () => {
      try {
        const response = await fetch(videoURL);
        if (!response.ok) {
          throw new Error("Failed to fetch video");
        }
        // Read the response as a Blob
        const videoBlob = await response.blob();
        // Create a URL for the Blob
        const videoBlobUrl = URL.createObjectURL(videoBlob);
        setVideoUrl(videoBlobUrl);
      } catch (error) {
        throw error;
      }
    };

    const fetchSubtitleFile = async () => {
      try {
        const response = await fetch(VIDEO_UPLOAD + `/subtitle/${videoId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch subtitle file");
        }
        // Read the subtitle file content
        const subtitleContent = await response.text();
        setSubtitleContent(subtitleContent);
      } catch (error) {
        // implement alert system
        throw error;
      }
    };
    fetchVideoUrl();
    fetchSubtitleFile();
  }, [videoId]);

  useEffect(() => {
    // Parse SRT content and set subtitles state
    const parsedSubtitles = parseSrt(subtitleContent);
    setSubtitles(parsedSubtitles);
  }, [subtitleContent]);

  const handleProgress = (progress) => {
    setPlayed(progress.played);
  };

  const handleDuration = (duration) => {
    setVideoDuration(duration);
  };

  return (
    <div id="playerpage-container">
      {videoUrl && (
        <>
          <ReactPlayer
            url={videoUrl}
            controls
            width="70%"
            height="auto"
            onProgress={handleProgress}
            onDuration={handleDuration}
            className="subtitle-player"
          />
          {videoDuration && (
            <SubtitleDisplay
              subtitles={subtitles}
              played={played}
              videoDuration={videoDuration}
              className = "subtitle-display"
            />
          )}
        </>
      )}
      <button onClick={()=> navigate('/myvideos')}>my videos</button>
    </div>
  );
}
