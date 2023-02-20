import { Outlet, Route, Routes } from "react-router-dom";
import { MyPlaylists } from "../playlists/MyPlaylists";
import { CreatePlaylist } from "../playlists/CreatePlaylist";
import { OtherUsersPlaylists } from "../playlists/OtherUsersPlaylists";
import { OtherPlaylistSongs } from "../playlists/OtherPlaylistSongs";
import { UserSongs } from "../playlists/UserSongs";
import { NewReleases } from "../newreleases/NewReleases";
import { Browse } from "../browse/Browse";
import { BrowsePlaylists } from "../browse/BrowsePlaylists";
import { PlaylistSongs } from "../browse/PlaylistSongs";
import { SongSearch } from "../search/SongSearch";

export const ApplicationViews = ({ setterFunction }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route
          path="myPlaylists"
          element={<MyPlaylists />}
        />
        <Route
          path="myPlaylists/:playlistId/songs"
          element={<UserSongs setterFunction={setterFunction} />}
        />
        <Route
          path="search"
          element={<SongSearch setterFunction={setterFunction} />}
        />
        <Route
          path="otherPlaylists"
          element={<OtherUsersPlaylists/>}
        />
        <Route
          path="otherPlaylists/:playlistId/songs"
          element={<OtherPlaylistSongs setterFunction={setterFunction} />}
        />
        <Route
          path="createPlaylist"
          element={<CreatePlaylist />}
        />
        <Route
          path="newReleases"
          element={<NewReleases setterFunction={setterFunction} />}
        />
        <Route
          path="browse"
          element={<Browse />}
        />
        <Route
          path="browse/:categoryId/playlists"
          element={<BrowsePlaylists />}
        />
        <Route
          path="browse/categories/playlists/:playlistId/songs"
          element={<PlaylistSongs setterFunction={setterFunction} />}
        />
      </Route>
    </Routes>
  );
};
