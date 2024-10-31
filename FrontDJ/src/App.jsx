import { useState } from "react";
import { TrackList } from "./features/tracks/TrackList.jsx";

import "./App.css";
import "./layout/table.css";
import { createBrowserRouter } from "react-router-dom";
import Root from "./layout/Root.jsx";
import Navbar from "./layout/Navbar.jsx";

import { EditPage } from "./features/tracks/EditPage.jsx";
import EditPlaylist from "./features/Playlist/EditPlaylist.jsx";
import PlaylistList from "./features/Playlist/PlaylistList.jsx";
import { SharePlaylist } from "./features/Playlist/SharePlaylist.jsx";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [

      // { path: "/playlists", element: <PlayLists /> },

      //  { path: "/login", element: <AuthForm /> },
      { path: "/playlists/:id", element: <EditPlaylist /> },
      { path: "/playlists/:id/share", element: <SharePlaylist /> },
      { path: "/tracks", element: <TrackList /> },
      { path: "/edit", element: <EditPage /> },
      { path: "/playlists", element: <PlaylistList /> },

    ],
  },
]);

function App() {
  const navigate = useNavigate();
  return (
    <>
      <Navbar></Navbar>
      <TrackList></TrackList>
      <Footer></Footer>
    </>
  );
}

export default App;
