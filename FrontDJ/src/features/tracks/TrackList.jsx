//import { useGetTracksQuery } from "./trackSlice";
//import { useGetTrackQuery } from "./trackSlice";
//import { AddTrack } from "./AddTrack";
import { EditTrack } from "./EditTrack.jsx";
import { DeleteTrack } from "./DeleteTrack.jsx";
import { useSelector } from "react-redux";
//import { selectToken } from "../account/authSlice";
//import { useNavigate } from "react-router-dom"; //exported as an object(not default)
import { useState } from "react";
import "./tracks.css";

export function TrackList() {
  //const token = useSelector(selectToken);
  //const navigate = useNavigate();
  // const { data: tracks = [], isLoading, error } = useGetTracksQuery();

  const tracks = [
    {
      id: 1,
      name: "Bodak Yellow",
      artist: "Cardi B",
      album: "Invasion of Privacy",
      duration: "3:54",
    },
    { id: 2, name: "Hello", artist: "Adele", album: "25", duration: "6:07" },
  ];
  const [selectedTrackId, setSelectedTrackId] = useState("");
  /**   if (isLoading) {
    return <p>Loading Tracks...</p>;
  }

  if (error) {
    return <p>{error.message}</p>;
  }

  if (!tracks.length) {
    return <p>There are no tracks in your library.</p>;
  } */

  return (
    <>
      <table className="tracks-table">
        <tbody>
          <tr>{/**AddTrack */}</tr>
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
              <td className="box">{song.name} </td>

              <td className="box">{song.artist}</td>
              <td className="box"> {song.album}</td>
              <td className="box">{song.duration}</td>
              <td>{<EditTrack />}</td>
              <td>{<DeleteTrack />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
