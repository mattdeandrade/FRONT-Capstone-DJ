import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlaylistQuery, useEditPlaylistMutation } from "./PlaylistSlice";

export default function EditPlaylist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    data: playlist,
    error: fetchError,
    isLoading: fetchLoading,
  } = useGetPlaylistQuery(id);
  const [editPlaylist] = useEditPlaylistMutation();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trackIds: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // const playlist = {
  //   id: 1,
  //   name: "4 Your Eyez Only",
  //   description:
  //     "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum soluta natus illum consequatur atque unde earum aspernatur repudiandae magni laboriosam esse fugiat, labore nihil, accusantium ea iste? Culpa, nulla deleniti?",
  //   ownerId: 1,
  //   owner: { username: "bpatin" },
  //   tracks: [
  //     { id: 1, trackName: "Lost ones" },
  //     { id: 2, trackName: "Neighbors" },
  //     { id: 3, trackName: "4 your eyez" },
  //   ],
  // };

  useEffect(() => {
    if (playlist) {
      setFormData({
        name: playlist.name,
        description: playlist.description,
        tracks: playlist.tracks.map((track) => track.id) || [],
      });
    }
  }, [playlist]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await editPlaylist({ id, trackIds: formData.trackIds }).unwrap();
      navigate("/playlists");
    } catch (e) {
      console.error(e);
      setError("Failed to update playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) return <p>Loading playlist...</p>;
  if (fetchError) return <p>Error loading playlist: {fetchError.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="edit-playlist-form">
      <h2>Edit Playlist</h2>
      {/* {error && <p className="error">{error}</p>} */}

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
          name="tracks"
          value={formData.trackIds.join(", ")}
          onChange={(e) =>
            setFormData({
              ...formData,
              trackIds: e.target.value.split(",").map(Number),
            })
          }
        />
      </label>
      <br />
      <button type="submit" disabled={loading}>
        {loading ? "Updating..." : "Update Playlist"}
      </button>
    </form>
  );
}
