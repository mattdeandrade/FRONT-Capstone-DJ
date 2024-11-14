import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetPlaylistQuery, useEditPlaylistMutation } from "./PlaylistSlice";
import { useGetTracksQuery } from "../tracks/trackSlice";

export default function EditPlaylist() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const {
    data: playlist,
    error: fetchError,
    isLoading: fetchLoading,
  } = useGetPlaylistQuery(id);
  const { data: tracks = [] } = useGetTracksQuery();
  const [editPlaylist] = useEditPlaylistMutation();
  console.log("playlist", playlist);

  const [trackIds, setTrackIds] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    trackIds: [],
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (playlist) {
      setFormData({
        name: playlist.name,
        description: playlist.description,
        trackIds: playlist.tracks.map((track) => track.id) || [],
      });
    }
  }, [playlist]);



  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await editPlaylist({ id, trackIds: trackIds }).unwrap();
      navigate("/playlists");
    } catch (e) {
      console.error(e);
      setError("Failed to update playlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTrackIds([...trackIds, e.target.value])
  }


  if (fetchLoading) return <p>Loading playlist...</p>;
  if (fetchError) return <p>Error loading playlist: {fetchError.message}</p>;

  return (
    <form onSubmit={handleSubmit} className="edit-playlist-form">
      {/* Once the playlist is available then render the contents: */}
      {playlist && (
        <>
          <h2>Add a track to Playlist: {playlist.name}</h2>
          {error && <p className="error">{error}</p>}

          {/* <label>
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
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
          <br /> */}
          {/* <label>
            Track Name
            <input
              name="tracks"
              value={formData.trackIds.join(", ")}
              onChange={(e) =>//ADD A FILTER
                setFormData({
                  ...formData,
                  trackIds: e.target.value.split(",").map(Number),
                  // tracks.filter(track)
                })
              }
            />
          </label> */}
          <select onChange={handleChange}>
            <option value="">Choose a Track</option>
            {tracks.map((track) => (
              <option key={track.id} value={track.id}>
                {" "}
                {track.trackName}
              </option>
            ))}
          </select>
          <br />
          <button type="submit" disabled={loading}>
            {loading ? "Updating..." : "Update Playlist"}
          </button>
        </>
      )}
    </form>
  );
}
