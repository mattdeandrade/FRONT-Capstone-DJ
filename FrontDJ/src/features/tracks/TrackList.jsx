import { useGetTracksQuery } from "./trackSlice";
import { EditTrack } from "./EditTrack.jsx";
import { DeleteTrack } from "./DeleteTrack.jsx";
import { useSelector } from "react-redux";
import { selectToken } from "../account/authSlice";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./tracks.css";
import { AddTrack } from "./AddTrack.jsx";
export function TrackList() {
  const token = useSelector(selectToken);

  const navigate = useNavigate();
  const {
    data: tracks = [],
    isLoadingTracks,
    tracksError,
  } = useGetTracksQuery();

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
    return (
      <>
        {" "}
        <p>There are no tracks in your library.</p>
        <AddTrack />
      </>
    );
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
