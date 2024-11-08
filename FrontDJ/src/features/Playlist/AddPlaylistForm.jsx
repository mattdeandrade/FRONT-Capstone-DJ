import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddPlaylistMutation } from "./PlaylistSlice";
import { useSelector } from "react-redux";
import { selectToken } from "../account/authSlice";
export function AddPlaylistForm() {
  const navigate = useNavigate();
  const token = useSelector(selectToken); // Get auth token from Redux store
  const [name, setName] = useState(""); // Playlist name
  const [description, setDescription] = useState(""); // Playlist description
  const [trackIds, setTrackIds] = useState([]); // Track IDs (can be empty initially)
  // Mutation hook to create a new playlist
  const [addPlaylist, { isLoading, error }] = useAddPlaylistMutation();
  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Convert trackIds to integers if they are not empty
    const validTrackIds = trackIds.length
      ? trackIds.map((id) => parseInt(id, 10)) // Convert each trackId to an integer
      : [];
    // Create the playlist data object
    const playlistData = {
      name,
      description,
      trackIds: validTrackIds, // Ensure trackIds is valid (array of integers)
    };
    try {
      // Make the API call to create the playlist
      await addPlaylist(playlistData).unwrap(); // unwrap() provides direct error handling
      // Optionally reset the form after successful submission
      setName("");
      setDescription("");
      setTrackIds([]);
      // Redirect to a different page after successful playlist creation (optional)
      navigate("/playlists"); // Navigate to playlists page or other page
    } catch (err) {
      console.error("Error while adding playlist:", err);
    }
  };
  return (
    <div>
      <h2>Create a New Playlist</h2>
      {/* Render error if it exists, but make sure not to render an object */}
      {error && (
        <p style={{ color: "red" }}>
          {error?.data?.message || "An unexpected error occurred."}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Playlist Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        {/* Optionally add tracks (for now we assume trackIds is empty) */}
        <div>
          <label htmlFor="trackIds">Tracks:</label>
          <input
            id="trackIds"
            type="text"
            value={trackIds.join(", ")} // Display track IDs as a comma-separated string
            onChange={(e) =>
              setTrackIds(
                e.target.value.split(",").map((id) => id.trim()) // Split by commas and trim whitespace
              )
            }
            placeholder="Enter track IDs separated by commas"
          />
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Adding Playlist..." : "Create Playlist"}
        </button>
      </form>
      {/* Show a loading message while the mutation is in progress */}
      {isLoading && <p>Submitting...</p>}
    </div>
  );
}
