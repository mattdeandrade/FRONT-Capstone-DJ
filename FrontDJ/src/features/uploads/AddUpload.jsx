import { useNavigate } from "react-router-dom";
import { useAddUploadMutation } from "./uploadsSlice";
import { useEffect, useState } from "react";

export function AddUpload() {
  const [formData, setFormData] = useState({
    name: "",
    artistName: "",
    albumName: undefined,
    bpm: 120,
    genre: "",
    instrumental: true,
    vocals: true,
    duration: 1000,
    playlistId: undefined,
  });
  const navigate = useNavigate();
  const [addUpload] = useAddUploadMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const submissionData = {
        ...formData,
        playlistId: formData.playlistId ? parseInt(formData.playlistId) : null,
      };

      await addUpload(submissionData).unwrap();

      navigate("/uploads");
    } catch (e) {
      console.error("Failed to add upload: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{"Upload"}</h2>
      <label>
        Song Title:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) =>
            setFormData({ ...formData, uploadName: e.target.value })
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
      <button type="submit" disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
