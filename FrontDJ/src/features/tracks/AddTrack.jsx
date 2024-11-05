import { useNavigate } from "react-router-dom";
import { useAddTrackMutation } from "./trackSlice";
import { useEffect, useState } from "react";

export function AddTrack() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    trackName: "",
    artistName: "",
    albumName: null, //has to start as null due to the schema defining it as either string or (?)
    audioDataUrl: null,
    bpm: 120,
    genre: "",
    instrumental: true,
    vocals: true,
    duration: 1000,
    userId: user.id,
    playlistId: null,
  });

  const [addTrack] = useAddTrackMutation();

  useEffect(() => {
    if (track) {
      setFormData({
        trackName: track.trackName,
        artistName: track.artistName,
        albumName: track.albumName,
        audioDataUrl: track.audioDataUrl,
        bpm: track.bpm,
        genre: track.genre,
        instrumental: track.instrumental,
        vocals: track.vocals,
        duration: track.duration,
        userId: user.id,
        playlistId: null,
      });
    }
  }, [track]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const submissionData = {
        ...formData,
        playlistId: formData.playlistId ? parseInt(formData.playlistId) : null,
      };

      await addTrack(submissionData).unwrap();

      navigate("/tracks");
    } catch (e) {
      console.error("Failed to add track: ", e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{"Add a track"}</h2>
      <label>
        Song Title:
        <input
          type="text"
          name="name"
          value={formData.trackName}
          onChange={(e) =>
            setFormData({ ...formData, trackName: e.target.value })
          }
        />
      </label>
      <br />
      <label>
        Artist:
        <input
          type="text"
          name="name"
          value={formData.artistName}
          onChange={(e) =>
            setFormData({ ...formData, artistName: e.target.value })
          }
        />
      </label>{" "}
      <br />
      <label>
        Album Name (optional)
        <input
          type="text"
          name="name"
          value={formData.albumName}
          onChange={(e) =>
            setFormData({ ...formData, albumName: e.target.value })
          }
        />
      </label>{" "}
      <br />
      <label>
        Genre
        <input
          type="text"
          name="name"
          value={formData.genre}
          onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
        />
      </label>{" "}
      <br />
      <button>Add Track</button>
    </form>
  );
}
