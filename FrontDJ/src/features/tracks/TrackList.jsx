import { useGetTracksQuery } from "./trackSlice";
import { useGetTrackQuery } from "./trackSlice";
//import { useGetUserQuery } from "../account/authSlice";
import { AddTrack } from "./AddTrack";
import { EditTrack } from "./EditTrack.jsx";
import { EditPage } from "./EditPage";
import { DeleteTrack } from "./DeleteTrack.jsx";
import { useSelector } from "react-redux";
import { selectToken } from "../account/authSlice";
import { useNavigate } from "react-router-dom"; //exported as an object(not default)
import { useState } from "react";
import "./tracks.css";

export function TrackList() {
  const token = useSelector(selectToken);

  const navigate = useNavigate();
  const {
    data: tracks = [],
    isLoadingTracks,
    tracksError,
  } = useGetTracksQuery(); /**const { data: user, isLoadingUser, userError } = useGetUserQuery();   if (userError) return <p>Please log in to see your account details.</p>;
if (isLoadingUser) return <p>Loading...</p>; */

  /**   const tracks = [
    {
      id: 1,
      name: "Bodak Yellow",
      artist: "Cardi B",
      album: "Invasion of Privacy",
      duration: "3:54",
    },
    { id: 2, name: "Hello", artist: "Adele", album: "25", duration: "6:07" },
  ];*/

  const [selectedTrackId, setSelectedTrackId] = useState("");

  if (isLoadingTracks) {
    return <p>Loading Tracks...</p>;
  }

  if (tracksError) {
    return <p>{error.message}</p>;
  }
  if (!tracks.length && !token) {
    return <p>You must be logged in to view your library.</p>;
  }

  if (!tracks.length) {
    return <p>There are no tracks in your library.</p>;
  }

  return token ? (
    <>
      {" "}
      <AddTrack />
      <table className="tracks-table">
        <tbody>
          <tr>
            <th>Track</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
            <td>Edit</td>
            <td>Delete</td>
          </tr>

          {tracks.map((song) => (
            <tr key={song.id}>
              <td className="box-editpage">{song.trackName} </td>

              <td className="box-editpage">{song.artistName}</td>
              <td className="box-editpage"> {song.albumName}</td>
              <td className="box-editpage">{song.duration}</td>
              <td>{<EditTrack id={song.id} />}</td>
              <td>{<DeleteTrack id={song.id} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <>You must be logged in to view tracks.</>
  );
}
