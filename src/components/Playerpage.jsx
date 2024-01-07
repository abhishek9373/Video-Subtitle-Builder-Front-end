import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";

const parseSrt = (srtContent) => {
  const lines = srtContent.split('\n');
  let subtitles = [];

  for (let i = 0; i < lines.length; i++) {
    // Skip empty lines
    if (lines[i].trim() === '') continue;

    // Parse subtitle number
    const number = parseInt(lines[i], 10);

    // Move to the next line
    i++;

    // Parse time format (HH:mm:ss --> HH:mm:ss)
    const [startTime, endTime] = lines[i].split(' --> ');

    // Move to the next line
    i++;

    // Parse subtitle text
    let text = lines[i];

    // Move to the next line
    i++;

    // Handle multiline subtitles
    while (lines[i] && lines[i].trim() !== '') {
      text += `\n${lines[i]}`;
      i++;
    }

    // Add subtitle to the array
    subtitles.push({
      number: number,
      start: startTime,
      end: endTime,
      text: text,
    });
  }
  return subtitles;
};

const SubtitleDisplay = ({ subtitles, played, videoDuration }) => {
    const convertToSeconds = (time) => {
        const [hh, mm, ss] = time.split(':').map(Number);
      
        // Check if ss is a string, otherwise set it to '0'
        const seconds = typeof ss === 'string' ? parseFloat(ss.replace(',', '.')) : 0;
      
        return hh * 3600 + mm * 60 + seconds;
      };

  const playedSeconds = played * videoDuration;

  const currentSubtitle = subtitles.find(
    (subtitle) =>
      playedSeconds >= convertToSeconds(subtitle.start) &&
      playedSeconds <= convertToSeconds(subtitle.end)
  );

  return (
    <div>
      {currentSubtitle && (
        <div>
          <p>{currentSubtitle.text}</p>
        </div>
      )}
    </div>
  );
};

export default function Playerpage() {
  const { videoId } = useParams();
  const videoURL = `http://localhost:3015/file/${videoId}`;
  const [videoUrl, setVideoUrl] = useState(null);
  const [subtitleContent, setSubtitleContent] = useState('');
  const [subtitles, setSubtitles] = useState([]);
  const [played, setPlayed] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);

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
        console.error("Error fetching video:", error);
      }
    };

    const fetchSubtitleFile = async () => {
      try {
        const response = await fetch(`http://localhost:3015/file/subtitle/${videoId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch subtitle file');
        }

        // Read the subtitle file content
        const subtitleContent = await response.text();
        setSubtitleContent(subtitleContent);
      } catch (error) {
        console.error('Error fetching subtitle file:', error);
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
    <div>
      {videoUrl && (
        <>
          <ReactPlayer
            url={videoUrl}
            controls
            width="75%"
            height="auto"
            onProgress={handleProgress}
            onDuration={handleDuration}
          />
          {videoDuration && (
            <SubtitleDisplay subtitles={subtitles} played={played} videoDuration={videoDuration} />
          )}
        </>
      )}
    </div>
  );
}
