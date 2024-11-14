import { useGetEditsQuery } from "./editSlice";
import { useGetEditQuery } from "./editSlice";

import { DeleteEdit } from "./DeleteEdit.jsx";
import { useSelector } from "react-redux";
import { selectToken } from "../account/authSlice";
import { useNavigate } from "react-router-dom"; //exported as an object(not default)
import { useState } from "react";
import "./edits.css";

export function EditList() {
  const token = useSelector(selectToken);

  const navigate = useNavigate();
  const {
    data: edits = [],
    isLoadingEdits,
    editsError,
  } = useGetEditsQuery(); /**const { data: user, isLoadingUser, userError } = useGetUserQuery();   if (userError) return <p>Please log in to see your account details.</p>;
if (isLoadingUser) return <p>Loading...</p>; */

  /**   const Edits = [
    {
      id: 1,
      name: "Bodak Yellow",
      artist: "Cardi B",
      album: "Invasion of Privacy",
      duration: "3:54",
    },
    { id: 2, name: "Hello", artist: "Adele", album: "25", duration: "6:07" },
  ];*/

  const [selectedEditId, setSelectedEditId] = useState("");

  if (isLoadingEdits) {
    return <p>Loading Edits...</p>;
  }

  if (editsError) {
    return <p>{error.message}</p>;
  }
  if (!edits.length && !token) {
    return <p>You must be logged in to view your library.</p>;
  }

  if (!edits.length) {
    return <p>There are no edits in your library.</p>;
  }

  return token ? (
    <>
      <table className="Edits-table">
        <tbody>
          <tr>
            <th>Track</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
            <td>Edit</td>
            <td>Delete</td>
          </tr>

          {edits.map((song) => (
            <tr key={song.id}>
              <td className="box-editpage">{song.editName} </td>

              <td className="box-editpage">{song.artistName}</td>

              <td className="box-editpage">{song.duration}</td>

              <td>{<DeleteEdit id={song.id} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <>You must be logged in to view edits.</>
  );
}
