import { useNavigate } from "react-router-dom";
import { useDeletePlaylistMutation } from "./PlaylistSlice";
import { useState } from "react";
export function DeletePlaylist({ id }) {
  const navigate = useNavigate();
  const [deletePlaylist] = useDeletePlaylistMutation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this playlist?"
    );
    if (!confirmed) return;
    setLoading(true);
    setError(null);
    try {
      await deletePlaylist(id).unwrap();
      navigate("/playlists");
    } catch (e) {
      console.error(e);
      setError("Failed to delete playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <>
      {error && <p className="error">{error}</p>}
      <button
        onClick={handleDelete}
        className="delete-button"
        disabled={loading}
      >
        {loading ? "Deleting..." : "Delete this Playlist"}
      </button>
    </>
  );
}
