import { useNavigate } from "react-router-dom";
import { useAddPlaylistMutation } from "./PlaylistSlice";
import { useState } from "react";

export function AddPlaylistForm() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    ownerId: null, 
    trackIds: [],
  });

  const navigate = useNavigate();
  const [addPlaylist] = useAddPlaylistMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function postPlaylist(event) { //handle
    event.preventDefault();
    setLoading(true);
    setError(null);

    // Validation
    if (!formData.name || !formData.description) {
      setError("Name and description are required.");
      setLoading(false);
      return;
    }

    try {
      const playlist = await addPlaylist({
        ...formData,
        trackIds: formData.trackIds,
      }).unwrap();
      navigate("/playlists");
    } catch (e) {
      console.error(e);
      setError("Failed to add playlist.");
    } finally {
      setLoading(false);
    }
  }


  return (
    <form onSubmit={postPlaylist} className="add-update-form">
      <h2>Add Playlist</h2>
      {error && <p className="error">{error}</p>}
      <label>
        Name
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </label>
      <br />
      <label>
        Description
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          required
        />
      </label>
      <br />
      <label>
        Tracks (comma-separated IDs)
        <input
          name="trackIds"
          value={formData.trackIds}
          onChange={(e) =>
            setFormData({
              ...formData,
              trackIds: e.target.value.split(",").map(Number),
            })
          }
        />
      </label>
      <br />
      <label>
        Owner ID
        <input
          type="number"
          name="ownerId"
          value={formData.ownerId || ""}
          onChange={(e) =>
            setFormData({ ...formData, ownerId: Number(e.target.value) })
          }
        />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Playlist"}
      </button>
      <br />
    </form>
  );
}
