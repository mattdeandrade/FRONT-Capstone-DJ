import { useState } from "react";
import { TrackList } from "./features/tracks/TrackList.jsx";
import { Footer } from "./layout/Footer.jsx";
import "./App.css";
import "./layout/table.css";
import { createBrowserRouter, Router } from "react-router-dom";
import Root from "./layout/Root.jsx";
import { EditPage } from "./features/tracks/EditPage.jsx";
import EditPlaylist from "./features/Playlist/EditPlaylist.jsx";
import PlaylistList from "./features/Playlist/PlaylistList.jsx";
import AuthForm from "./features/account/AuthForm.jsx";
import { UploadList } from "./features/uploads/UploadList.jsx";
import { EditList } from "./features/edits/EditList.jsx";
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
      { path: "/uploads", element: <UploadList /> },
      { path: "/edits", element: <EditList /> },
      { path: "/edit", element: <EditPage /> },
      { path: "/playlists", element: <PlaylistList /> },
      { path: "/login", element: <AuthForm /> },
    ],
  },
]);

function App() {
  const navigate = useNavigate();
  return <></>;
}

export default App;
