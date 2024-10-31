import { useState } from "react";
import { TrackList } from "./features/tracks/TrackList.jsx";
import "./App.css";
import "./layout/table.css";
import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root.jsx";
import Navbar from "./layout/Navbar.jsx";
import EditPlaylist from "./features/Playlist/EditPlaylist.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      // { index: true, element: <DepartmentList /> },
      // { path: "/playlists", element: <PlayLists /> },
      // { path: "/playlists/:id", element: <EditPlaylist /> },
      //{ path: "/playlists/:id/share", element: <SharePlaylist /> },
      //  { path: "/login", element: <AuthForm /> },

      { path: "/tracks", element: <TrackList /> },
      // { path: "/playlists", element: <PlaylistList /> },
    ],
  },
]);

function App() {
  return (
    <>
      <Navbar></Navbar>
      <TrackList></TrackList>
    </>
  );
}

export default App;
