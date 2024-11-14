import React from "react";
import { useState, useEffect } from "react";
import * as Tone from "tone";

const useAudio = () => {
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [originalPlayer, setOriginalPlayer] = useState(null);
  const [alteredPlayer, setAlteredPlayer] = useState(null);
  // Other states...

  const handleSeekOriginal = (time) => {
    if (originalPlayer) {
      originalPlayer.stop();
      originalPlayer.start(0, time); // Start from the new seek position
      setOriginalTime(time);
    }
  };

  const handleSeekAltered = (time) => {
    if (alteredPlayer) {
      alteredPlayer.stop();
      alteredPlayer.start(0, time * tempo); // Account for playback rate
      setAlteredTime(time);
    }
  };

  // Update time-tracking interval
  useEffect(() => {
    const interval = setInterval(() => {
      if (originalPlayer && originalPlayer.state === "started") {
        setOriginalTime(originalPlayer.progress * originalDuration);
      }
      if (alteredPlayer && alteredPlayer.state === "started") {
        setAlteredTime(alteredPlayer.progress * alteredDuration);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [originalPlayer, alteredPlayer, originalDuration, alteredDuration]);

  return {
    // Other return values...
    handleSeekOriginal,
    handleSeekAltered,
  };
};
export default useAudio;
