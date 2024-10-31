import { useGetPlaylistsQuery } from "./PlaylistSlice.js"; //imports the useGetPlaylistsQuery hook, which allows to fetch playlists from the Redux store.
import { AddPlaylistForm } from "./AddPlaylistForm.jsx"; //Imports the AddPlaylistForm component to allow users to add new playlists.
import { DeletePlaylist } from "./DeletePlaylist.jsx"; //Imports the DeletePlaylist component, which provides functionality to delete a playlist.
import { useSelector } from "react-redux"; //Imports the useSelector hook from Redux to access the Redux store's state.
import { selectToken } from "../account/authSlice"; //Imports the selectToken selector to check if the user is logged in by accessing the authentication token.
import { useNavigate, Link } from "react-router-dom"; //Imports the useNavigate hook, which enables programmatic navigation between routes.
import { useState } from "react"; //Imports the useState hook from React to manage local component state.
import { SharePlaylist } from "./SharePlaylist.jsx"; //Imports the SharePlaylist component to enable sharing playlists.
//import "./PlaylistList.css";

export default function PlaylistList() {
  //^-Defines the PlaylistList component
  // const token = useSelector(selectToken); //Uses the useSelector hook to retrieve the authentication token from the Redux store, determining if the user is logged in.
  // const navigate = useNavigate(); //Initializes the navigate function to programmatically change routes in the app.
  // const { data: playlists = [], isLoading, error } = useGetPlaylistsQuery(); //Calls useGetPlaylistsQuery to fetch playlists, destructuring the response into playlists, isLoading, and error.
  const [filter, setFilter] = useState(""); // State for filtering playlists
  // ^-manages the search input for filtering playlists.
  const [selectedPlaylist, setSelectedPlaylist]= useState(null);
  const playlists = [
    {
      id: 1,
      name: "4 Your Eyez Only",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum soluta natus illum consequatur atque unde earum aspernatur repudiandae magni laboriosam esse fugiat, labore nihil, accusantium ea iste? Culpa, nulla deleniti?",
      ownerId: 1,
      owner: { username: "bpatin" },
      tracks: [
        { id: 1, trackName: "Lost ones" },
        { id: 2, trackName: "Neighbors" },
        { id: 3, trackName: "4 your eyez" },
      ],
    },
    {
      id: 2,
      name: "DAMN",
      description:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum soluta natus illum consequatur atque unde earum aspernatur repudiandae magni laboriosam esse fugiat, labore nihil, accusantium ea iste? Culpa, nulla deleniti?",
      ownerId: 1,
      owner: { username: "bpatin" },
      tracks: [
        { id: 4, trackName: "HUMBLE" },
        { id: 5, trackName: "FEAR" },
        { id: 6, trackName: "LOVE" },
      ],
    },
  ];


  // Loading and error handling
  // if (isLoading) {
  //   return <p>Loading Playlists...</p>;
  // }

  // if (error) {
  //   return <p>{error.message}</p>;
  // }

  if (!playlists.length) {
    return <p>There are no playlists.</p>;
  }

  return (
    <>
      {/* rendering a heading for the playlist list: */}
      <h1> Our Playlists</h1>

      {/* This form renders a search input field that updates the filter state as the user types, allowing them to filter the displayed playlists.  */}
      <form>
        <input
          type="text"
          placeholder="Search playlists..."
          onChange={(e) => setFilter(e.target.value)}
        />
      </form>

      {/* Creates a table structure for displaying the playlists: */}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Owner</th>
            <th>Tracks</th>
            {/* the th rows below are for share, edit, and delete */}
            <th></th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {/* Maps over the playlists array created above, rendering a table row for each playlist. Each row has a unique key set to the playlist ID. */}
          {playlists.map((playlist) => (
            <tr key={playlist.id} className="blue-green">
              {/* Displays the name and ID of the current playlist in a heading. */}
              <td>{playlist.name}</td>
              <td>{playlist.owner.username}</td>
              <td>
                {playlist.tracks.map((track) => track.trackName).join(", ")}
              </td>
              <td>
                {/* Renders the DeletePlaylist component, passing the current playlist ID as a prop to enable deletion. */}
                <DeletePlaylist id={playlist.id} />
              </td>
              <td>
                <Link to={`/playlists/${playlist.id}/share`}>Share</Link>{" "}
              </td>
              <td>
                <Link to={`/playlists/${playlist.id}`}>Edit</Link>{" "}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
      {/* {token && (
        <div>
          <AddPlaylistForm />
        </div>
      )} */}
    </>
  );
}
