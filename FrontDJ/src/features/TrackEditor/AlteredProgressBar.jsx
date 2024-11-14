import React from "react";

const AlteredProgressBar = ({ currentTime, duration }) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;
  const displayCurrentTime = currentTime ? currentTime.toFixed(1) : "0.0";
  const displayDuration = duration ? duration.toFixed(1) : "0.0";

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
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: "#2196f3",
            borderRadius: "5px",
          }}
        />
        {/* Tracker */}
        <div
          style={{
            position: "absolute",
            left: `${progress}%`,
            top: "-4px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: "#2196f3",
            transform: "translateX(-50%)", // Center the tracker over the progress bar
          }}
        />
      </div>
      <span>
        {displayCurrentTime}s / {displayDuration}s
      </span>
    </div>
  );
};

export default AlteredProgressBar;
