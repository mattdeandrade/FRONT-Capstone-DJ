// OriginalProgressBar.js
import React from "react";

const OriginalProgressBar = ({ currentTime, duration, onSeek }) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const newProgress =
      (e.nativeEvent.offsetX / e.target.offsetWidth) * duration;
    onSeek(newProgress); // Update playback time
  };

  return (
    <div>
      <div
        style={{
          width: "100%",
          backgroundColor: "#ddd",
          position: "relative",
          height: "10px",
          borderRadius: "5px",
        }}
        onClick={handleSeek} // Add click handler for seeking
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#4caf50",
            borderRadius: "5px",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: `${progress}%`,
            top: "-4px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#4caf50",
            transform: "translateX(-50%)",
          }}
        />
      </div>
      <span>
        {currentTime.toFixed(1)}s / {duration.toFixed(1)}s
      </span>
    </div>
  );
};

export default OriginalProgressBar;
