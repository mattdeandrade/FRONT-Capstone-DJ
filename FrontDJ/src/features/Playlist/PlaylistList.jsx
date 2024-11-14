import { useGetUserPlaylistsQuery } from "./PlaylistSlice.js";
import { AddPlaylistForm } from "./AddPlaylistForm.jsx";
import { DeletePlaylist } from "./DeletePlaylist.jsx";
import { useSelector } from "react-redux";
import { selectToken } from "../account/authSlice";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { SharePlaylist } from "./SharePlaylist.jsx";
import { useGetTracksQuery } from "../tracks/trackSlice.js";

export default function PlaylistList() {
  const token = useSelector(selectToken); // Get auth token from Redux
  const navigate = useNavigate(); // Navigate between pages
  const { data: playlists = [], isLoading, error } = useGetUserPlaylistsQuery(); // Fetch users playlists data
  const { data: tracks = [] } = useGetTracksQuery();
  console.log(tracks);
  

  const [filter, setFilter] = useState(""); // Filter state for search
  // Debugging: log data, isLoading, and error
  // console.log("Playlists: ", playlists);
  // console.log("isLoading: ", isLoading);
  // console.log("Error: ", error);
  // console.log(token);
  if (isLoading) {
    return <p>Loading Playlists...</p>;
  }
  return (
    <>
      <h1> Our Playlists</h1>
      {error && <p>{error.data.message}</p>}
      {/* {!playlists.length && <p>There are no playlists.</p>} */}
      <form>
        <input
          type="text"
          placeholder="Search playlists..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Tracks</th>
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {playlists && playlists.length > 0 ? (
            playlists
              .filter((playlist) =>
                playlist.name.toLowerCase().includes(filter.toLowerCase())
              ) // Optional filtering
              .map((playlist) => (
                <tr key={playlist.id} className="blue-green">
                  <td>{playlist.name}</td>
                  <td>{playlist.user.username}</td>
                  {/* Rendering tracks */}
                  <td>
                    {playlist.tracks && playlist.tracks.length > 0
                      ? playlist.tracks
                          .map((track) => track.trackName)
                          .join(", ")
                      : "No tracks"}
                  </td>
                  {/* Delete button */}
                  <td>
                    <DeletePlaylist id={playlist.id} />
                  </td>
                  {/* Share link */}
                  <td>
                    <Link to={`/playlists/${playlist.id}/share`}>Share</Link>
                  </td>
                  {/* Edit link */}
                  <td>
                    <Link to={`/playlists/${playlist.id}`}>
                      Add More Tracks
                    </Link>
                  </td>
                </tr>
              ))
          ) : (
            <tr>
              <td colSpan="6">No playlists found.</td>
            </tr>
          )}
        </tbody>
      </table>
      {/* Add Playlist Form */}
      {token && (
        <div>
          <AddPlaylistForm />
        </div>
      )}
    </>
  );
}
