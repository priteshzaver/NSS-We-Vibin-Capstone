import { Outlet, Route, Routes } from "react-router-dom"
import { MyPlaylists } from "../playlists/MyPlaylists"
import { CreatePlaylist } from "../playlists/CreatePlaylist"
import { OtherUsersPlaylists } from "../playlists/OtherUsersPlaylists"
import { OtherPlaylistSongs } from "../playlists/OtherPlaylistSongs"
import { UserSongs } from "../playlists/UserSongs"
import { MusicContainer } from "../search/MusicContainer"
import { NewReleases } from "../newreleases/NewReleases"
import { Browse } from "../browse/Browse"
import { BrowseCategorySongs } from "../browse/BrowseCategorySongs"
import { BrowseToplists } from "../browse/BrowseToplists"
import { ToplistSongs } from "../browse/ToplistSongs"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    

                    <Outlet />
                </>
            }>
                <Route path="myPlaylists" element={<MyPlaylists />} />
                <Route path="myPlaylists/:playlistId/songs" element={<UserSongs />} />
                <Route path="search" element={<MusicContainer />} />
                <Route path="otherPlaylists" element={<OtherUsersPlaylists />} />
                <Route path="otherPlaylists/:playlistId/songs" element={<OtherPlaylistSongs />} />
                <Route path="createPlaylist" element={<CreatePlaylist />} />
                <Route path="newReleases" element={<NewReleases />} />
                <Route path="browse" element={<Browse />} />
                <Route path="browse/:categoryId/songs" element={<BrowseCategorySongs />} />
                <Route path="browse/:categoryId/playlists" element={<BrowseToplists />} />
                <Route path="browse/toplists/playlists/:playlistId/songs" element={<ToplistSongs />} />
            </Route>
        </Routes>
    )
}