import { useNavigate } from "react-router-dom";
import { useAddTrackMutation } from "./trackSlice";
import { useEffect, useState } from "react";

export default function AddTrack({getFile, setGetFile}) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const submissionData = {
        ...getFile,
       // playlistId: formData.playlistId ? parseInt(formData.playlistId) : null,
      };

      await addTrack(submissionData).unwrap();

      navigate("/tracks");
    } catch (e) {
      console.error("Failed to add track: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
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
        {loading ? "Adding..." : "Add Track"}
      </button>
      </form>
  );
}
