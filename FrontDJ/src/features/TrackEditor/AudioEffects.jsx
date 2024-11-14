import React from "react";

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

export default AudioEffects;
