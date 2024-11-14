import React, { useState, useEffect, useRef } from "react";
import * as Tone from "tone";

const ProgressBar = ({ currentTime, duration, onSeek, color }) => {
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const newTime = (clickPosition / rect.width) * duration;
    onSeek(newTime); // Update playback time
  };

  return (
    <div>
      <div
        onClick={handleSeek} // Add click handler for seeking
        style={{
          width: "100%",
          backgroundColor: "#ddd",
          position: "relative",
          height: "10px",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: `${progress}%`,
            height: "100%",
            backgroundColor: color,
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
            backgroundColor: color,
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
//Allows for pitch and tempo changes.
const AudioEffects = ({ pitch, setPitch, tempo, setTempo, loop, setLoop }) => (
  <div>
    <div>
      <label htmlFor="pitch">Pitch Shift (semitones):</label>
      <input
        type="range"
        id="pitch"
        min="-12"
        max="12"
        value={pitch}
        onChange={(e) => setPitch(Number(e.target.value))}
      />
    </div>
    <div>
      <label htmlFor="tempo">Tempo Multiplier:</label>
      <input
        type="number"
        id="tempo"
        step="0.1"
        min="0.5"
        max="2"
        value={tempo}
        onChange={(e) => setTempo(parseFloat(e.target.value))}
      />
    </div>
    <div>
      <label htmlFor="loop">Loop:</label>
      <input
        type="checkbox"
        id="loop"
        checked={loop}
        onChange={(e) => setLoop(e.target.checked)}
      />
    </div>
  </div>
);

const FileUploader = ({ fileInputRef, handleFileChange }) => (
  //mp3 file uploader
  <input
    type="file"
    ref={fileInputRef}
    accept=".mp3"
    onChange={handleFileChange}
  />
);

const useAudio = () => {
  const [audioBuffer, setAudioBuffer] = useState(null);
  const [originalPlayer, setOriginalPlayer] = useState(null);
  const [alteredPlayer, setAlteredPlayer] = useState(null);
  const [isOriginalPlaying, setIsOriginalPlaying] = useState(false);
  const [isAlteredPlaying, setIsAlteredPlaying] = useState(false);
  const [pitch, setPitch] = useState(0);
  const [tempo, setTempo] = useState(1);
  const [loop, setLoop] = useState(false);
  const [originalTime, setOriginalTime] = useState(0);
  const [alteredTime, setAlteredTime] = useState(0);
  const [originalDuration, setOriginalDuration] = useState(0);
  const [alteredDuration, setAlteredDuration] = useState(0);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const decodedData = await Tone.getContext().decodeAudioData(arrayBuffer);
      setAudioBuffer(decodedData);
      setOriginalDuration(decodedData.duration);
      setAlteredDuration(decodedData.duration / tempo);
    }
  };

  const playOriginal = async () => {
    if (audioBuffer) {
      if (originalPlayer) originalPlayer.stop(); // Stop previous instance if any

      const player = new Tone.Player(audioBuffer).toDestination();
      player.loop = loop;
      setOriginalPlayer(player);

      if (Tone.getContext().state !== "running") await Tone.start();
      player.start();
      setIsOriginalPlaying(true);
    }
  };

  const pauseOriginal = () => {
    if (originalPlayer && isOriginalPlaying) {
      originalPlayer.stop();
      setIsOriginalPlaying(false);
    }
  };

  const playAltered = async () => {
    if (audioBuffer) {
      if (alteredPlayer) alteredPlayer.stop(); // Stop previous instance if any

      const pitchShift = new Tone.PitchShift(pitch).toDestination();
      const player = new Tone.Player(audioBuffer).connect(pitchShift);
      player.loop = loop;
      player.playbackRate = tempo;
      setAlteredPlayer(player);

      if (Tone.getContext().state !== "running") await Tone.start();
      player.start();
      setIsAlteredPlaying(true);
    }
  };

  const pauseAltered = () => {
    if (alteredPlayer && isAlteredPlaying) {
      alteredPlayer.stop();
      setIsAlteredPlaying(false);
    }
  };

  const handleSeekOriginal = (time) => {
    if (originalPlayer) {
      originalPlayer.stop();
      originalPlayer.start(0, time);
      setOriginalTime(time);
    }
  }; // Start from the new seek position

  const handleSeekAltered = (time) => {
    if (alteredPlayer) {
      alteredPlayer.stop();
      alteredPlayer.start(0, time);
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
    pitch,
    setPitch,
    tempo,
    setTempo,
    loop,
    setLoop,
    handleFileChange,
    playOriginal,
    pauseOriginal,
    playAltered,
    pauseAltered,
    originalTime,
    originalDuration,
    alteredTime,
    alteredDuration,
    handleSeekOriginal,
    handleSeekAltered,
    isOriginalPlaying,
    isAlteredPlaying,
  };
};

const AudioPlayer = () => {
  const fileInputRef = useRef(null);
  const {
    pitch,
    setPitch,
    tempo,
    setTempo,
    loop,
    setLoop,
    handleFileChange,
    playOriginal,
    pauseOriginal,
    playAltered,
    pauseAltered,
    originalTime,
    originalDuration,
    alteredTime,
    alteredDuration,
    handleSeekOriginal,
    handleSeekAltered,
    isOriginalPlaying,
    isAlteredPlaying,
  } = useAudio();

  return (
    <div>
      <h1>Upload, Edit, and Play MP3</h1>
      <FileUploader
        fileInputRef={fileInputRef}
        handleFileChange={handleFileChange}
      />
      <AudioEffects
        pitch={pitch}
        setPitch={setPitch}
        tempo={tempo}
        setTempo={setTempo}
        loop={loop}
        setLoop={setLoop}
      />
      <button onClick={isOriginalPlaying ? pauseOriginal : playOriginal}>
        {isOriginalPlaying ? "Pause Original" : "Play Original"}
      </button>
      <ProgressBar
        currentTime={originalTime}
        duration={originalDuration}
        onSeek={handleSeekOriginal}
        color="#4caf50"
      />
      <button onClick={isAlteredPlaying ? pauseAltered : playAltered}>
        {isAlteredPlaying ? "Pause Altered" : "Play Altered"}
      </button>
      <ProgressBar
        currentTime={alteredTime}
        duration={alteredDuration}
        onSeek={handleSeekAltered}
        color="#2196f3"
      />
    </div>
  );
};

export default AudioPlayer;
