import React from "react";
import '../styles/playerpage.css'

const SubtitleDisplay = ({ subtitles, played, videoDuration }) => {
    const convertToSeconds = (time) => {
        const [hh, mm, ss] = time.split(':').map(Number);
        // Check if ss is a string, otherwise set it to '0'
        // const seconds = typeof ss === 'string' ? parseFloat(ss.replace(',', '.')) : 0;
        console.log(hh * 3600 + mm * 60 + ss)
        return hh * 3600 + mm * 60 + ss;
      };

  const playedSeconds = played * videoDuration;

  const currentSubtitle = subtitles.find(
    (subtitle) =>
      playedSeconds >= convertToSeconds(subtitle.start) &&
      playedSeconds <= convertToSeconds(subtitle.end)
  );

  return (
    <div className="subtitle-display">
      {currentSubtitle && (
        <div>
          <p>{currentSubtitle.text}</p>
        </div>
      )}
    </div>
  );
};

export default SubtitleDisplay;