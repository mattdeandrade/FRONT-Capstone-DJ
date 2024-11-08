import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetPlaylistQuery, useSharePlaylistMutation } from "./PlaylistSlice"; //useGetPlaylistQuery fetches the playlist data, and useSharePlaylistMutation allows you to share the playlist on the backend.

export function SharePlaylist() {
  //This is a component responsible for rendering the share functionality for a playlist.
  const { id } = useParams(); // Get the playlist ID from the URL parameters
  const { data: playlist, error, isLoading } = useGetPlaylistQuery(id); // Fetch the playlist data
  const [sharePlaylist] = useSharePlaylistMutation(); // Hook for sharing the playlist. Initializes sharePlaylist, which allows you to trigger the sharing process on the backend.
  const [shareableLink, setShareableLink] = useState(""); //Initializes state for shareable link
  const [successMessage, setSuccessMessage] = useState(""); //Initializes state for messages
  const [errorMessage, setErrorMessage] = useState(""); //Provides feedback messages to user

  useEffect(() => {
    //Effect for generating the shareable link:
    if (playlist) {
      // Generates a shareable link:
      //When the playlist is fetched, it sets the shareableLink
      // using the current window’s origin and the playlist ID.
      // The effect runs whenever playlist or id changes:
      setShareableLink(`${window.location.origin}/playlists/${id}`);
    }
  }, [playlist, id]);

  const handleShareClick = async () => {
    //^Defines the share button click handler
    try {
      // Call the share playlist mutation
      await sharePlaylist(id).unwrap();
      setSuccessMessage("Playlist shared successfully!"); //if successful a msg will be displayed
    } catch (e) {
      //if catches error it gets logged and sends a error msg
      console.error(e);
      setErrorMessage("Failed to share playlist. Please try again.");
    }
  };

  const handleCopyClick = () => {
    //^-Defines the copy link button click handler
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => {
        //^-Copies the shareable link to the clipboard
        setSuccessMessage("Link copied to clipboard!"); //If successful, it sets a success message
      })
      .catch(() => {
        //if it fails, it sets an error message.
        setErrorMessage("Failed to copy link.");
      });
  };

  //Handles loading and error states:
  if (isLoading) return <p>Loading playlist...</p>;
  if (error) return <p>Error loading playlist: {error.message}</p>;

  return (
    //Renders the component( Displays a heading with the name of the playlist being shared.):
    <div>
      <h2>Share Playlist: {playlist.name}</h2>
      {/* Displays feedback messages: */}
      {successMessage && <p className="success">{successMessage}</p>}
      {errorMessage && <p className="error">{errorMessage}</p>}

      {/* Renders the shareable link and buttons: */}
      <div>
        <p>Shareable Link: {shareableLink}</p>
        <button onClick={handleCopyClick}>Copy Link</button>
        <button onClick={handleShareClick}>Share Playlist</button>
      </div>
    </div>
  );
}
