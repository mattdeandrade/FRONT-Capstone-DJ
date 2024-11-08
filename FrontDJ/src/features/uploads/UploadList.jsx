import { useGetUploadsQuery } from "./uploadsSlice";
import { useGetUploadQuery } from "./uploadsSlice";
//import { useGetUserQuery } from "../account/authSlice";
import { AddUpload } from "./AddUpload.jsx";
import { EditUpload } from "./EditUpload.jsx";

import { DeleteUpload } from "./DeleteUpload.jsx";
import { useSelector } from "react-redux";
import { selectToken } from "../account/authSlice.js";
import { useNavigate } from "react-router-dom"; //exported as an object(not default)
import { useState } from "react";
import "./uploads.css";

export function UploadList() {
  const token = useSelector(selectToken);

  const navigate = useNavigate();
  const {
    data: uploads = [],
    isLoadingUploads,
    uploadsError,
  } = useGetUploadsQuery(); /**const { data: user, isLoadingUser, userError } = useGetUserQuery();   if (userError) return <p>Please log in to see your account details.</p>;
if (isLoadingUser) return <p>Loading...</p>; */

  /**   const Uploads = [
    {
      id: 1,
      name: "Bodak Yellow",
      artist: "Cardi B",
      album: "Invasion of Privacy",
      duration: "3:54",
    },
    { id: 2, name: "Hello", artist: "Adele", album: "25", duration: "6:07" },
  ];*/

  const [selectedUploadId, setSelectedUploadId] = useState("");

  if (isLoadingUploads) {
    return <p>Loading Uploads...</p>;
  }

  if (uploadsError) {
    return <p>{error.message}</p>;
  }
  if (!uploads.length && !token) {
    return <p>You must be logged in to view your uploads.</p>;
  }

  if (!uploads.length) {
    return (
      <>
        {" "}
        <p>There are no uploads in your library.</p> <AddUpload />
      </>
    );
  }

  return token ? (
    <>
      {" "}
      <AddUpload />
      <table className="uploads-table">
        <tbody>
          <tr>
            <th>Track</th>
            <th>Artist</th>
            <th>Album</th>
            <th>Duration</th>
            <td>Edit</td>
            <td>Delete</td>
          </tr>

          {uploads.map((song) => (
            <tr key={song.id}>
              <td className="box-editpage">{song.name} </td>

              <td className="box-editpage">{song.artistName}</td>
              <td className="box-editpage"> {song.albumName}</td>
              <td className="box-editpage">{song.duration}</td>
              <td>{<EditUpload id={song.id} />}</td>
              <td>{<DeleteUpload id={song.id} />}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  ) : (
    <>You must be logged in to view uploads.</>
  );
}
