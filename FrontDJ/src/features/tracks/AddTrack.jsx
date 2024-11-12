import { useNavigate } from "react-router-dom";
import { useAddTrackMutation } from "./trackSlice";
import { useEffect, useState } from "react";

export default function AddTrack() {
  // const [formData, setFormData] = useState({
  //   trackName: "",
  //   artistName: "",
  //   albumName: undefined,
  //   bpm: 120,
  //   genre: "",
  //   instrumental: true,
  //   vocals: true,
  //   duration: 1000,
  //   playlistId: undefined,
  // });
  const navigate = useNavigate();
  const [addTrack] = useAddTrackMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [getFile,setGetFile] = useState(null);
   


    const handleSubmit = async (event) => {
      event.preventDefault();

      setGetFile(event);
      try {
       
        const FileUploader = () => (
         
          <input
            type="file"
            ref={getFile}
            accept=".mp3"
            onChange={setGetFile}
          />
        );


        const file = new File([FileUploader], "test");
  
  
        await addTrack(file).unwrap();
  
        navigate("/tracks");
      } catch (e) {
        console.error("Failed to add track: ", e);
      } finally {
        setLoading(false);
      }
    };

    

  return (
    <form 
    type="file"
    accept=".mp3"
    onSubmit={handleSubmit}>
      
      <h2>{"Add a track"}</h2>
      {/* <label>
        Song Title:
        <input
          type="text"
          name="name"
          value={getFile.trackName}
          onChange={(e) =>
            setGetFile({ ...getFile, trackName: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Artist:
        <input
          type="text"
          name="name"
          value={getFile.artistName}
          onChange={(e) =>
            setGetFile({ ...getFile, artistName: e.target.value })
          }
        />
      </label>{" "}
      <br />
      <label>
        Album Name (optional)
        <input
          type="text"
          name="name"
          value={getFile.albumName}
          onChange={(e) =>
            setGetFile({ ...getFile, albumName: e.target.value })
          }
        />
      </label>{" "}
      <br />
      <label>
        Genre
        <input
          type="text"
          name="name"
          value={getFile.genre}
          onChange={(e) => setGetFile({ ...getFile, genre: e.target.value })}
        />
        
      </label>{" "} */}
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Choose Track"}
      </button>
      </form>
  );
}

