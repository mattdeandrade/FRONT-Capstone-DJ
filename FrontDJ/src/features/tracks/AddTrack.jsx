import { useNavigate } from "react-router-dom";
import { useAddTrackMutation } from "./trackSlice";
import { useEffect, useState } from "react";

export function AddTrack() {

  const navigate = useNavigate();
  const [addTrack] = useAddTrackMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getFile,setGetFile] = useState();



  function handleChange(event) {

    setGetFile(event.target.files[0])
  }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
       
        await addTrack(getFile).unwrap();
  
        navigate("/tracks");
      } catch (e) {
        console.error("Failed to add track: ", e);
      } finally {
        setLoading(false);
      }
    };
  
    

  return (
    <>
    <form onSubmit={handleSubmit}
    >
    <input
    type="file"
    accept="audio/mp3"
    onChange={handleChange}
      />
      <h2>{"Add a track"}</h2>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Upload"}
      </button>
      </form>
      </>
  );
}
