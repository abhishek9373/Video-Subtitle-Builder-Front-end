// CustomPlayer.js
import React from "react";
import ReactPlayer from "react-player";

const Player = ({ url }) => {
  return (
    <ReactPlayer
      url={url}
      controls
      width="65%"
      height="auto"
      className="player"
    />
  );
};

export default Player;
