import { useState } from "react";
export function EditPage() {
  const [pitchValue, setPitchValue] = useState(100);
  const [tempoValue, setTempoValue] = useState(100);
  const [loopA, setLoopA] = useState(100);
  const [loopB, setLoopB] = useState(100);
  return (
    <>
      <div className="box-editpage">
        <h2>Pitch</h2>

        <input
          type="range"
          min="0"
          max="200"
          value={pitchValue}
          step="20"
          className="slider"
          onChange={(event) => {
            setPitchValue(event.target.value);
          }}
        />
      </div>
      <br></br>
      <div className="box-editpage">
        <h2>Tempo</h2>

        <input
          type="range"
          min="0"
          max="200"
          value={tempoValue}
          step="20"
          className="slider"
          onChange={(event) => {
            setTempoValue(event.target.value);
          }}
        />
      </div>
      <br></br>
      <div className="box-editpage">
        <h2>Loop</h2>
        <table className="loop">
          <tbody>
            <tr></tr>
            <tr>
              <td>
                <button className="box-loop">A</button>
              </td>
              <td>
                <button className="box-loop">B</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
