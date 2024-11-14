import React from "react";
import { useRef } from "react";
import useAudio from "./useAudio";
import OriginalProgressBar from "./OriginalProgressBar";
import AlteredProgressBar from "./AlteredProgressBar";
import FileUploader from "./FileUploader";
import AudioEffects from "./AudioEffects";

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
    playAltered,
    originalTime,
    originalDuration,
    alteredTime,
    alteredDuration,
    handleSeekOriginal,
    handleSeekAltered,
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
      <button onClick={playOriginal}>Play Original</button>
      <OriginalProgressBar
        currentTime={originalTime}
        duration={originalDuration}
        onSeek={handleSeekOriginal}
      />
      <button onClick={playAltered}>Play Altered</button>
      <AlteredProgressBar
        currentTime={alteredTime}
        duration={alteredDuration}
        onSeek={handleSeekAltered}
      />
    </div>
  );
};

export default AudioPlayer;
