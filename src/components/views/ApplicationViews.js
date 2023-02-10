import { Outlet, Route, Routes } from "react-router-dom"
import { MyPlaylists } from "../playlists/MyPlaylists"
import { CreatePlaylist } from "../playlists/CreatePlaylist"
import { OtherUsersPlaylists } from "../playlists/OtherUsersPlaylists"
import { OtherPlaylistSongs } from "../playlists/OtherPlaylistSongs"
import { UserSongs } from "../playlists/UserSongs"
import { SongSearch } from "../songs/SongSearch"
import { MusicContainer } from "../songs/MusicContainer"

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
                
            </Route>
        </Routes>
    )
}