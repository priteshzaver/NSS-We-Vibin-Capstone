import { Outlet, Route, Routes } from "react-router-dom"
import { AllPlaylists } from "../playlists/AllPlaylists"
import { CreatePlaylist } from "../playlists/CreatePlaylist"
import { MyPlaylists } from "../playlists/MyPlaylists"
import { PlaylistSongs } from "../playlists/PlaylistSongs"
import { SongsOnPlaylist } from "../playlists/SongsOnPlaylist"
import { SongSearch } from "../songs/SongSearch"

export const ApplicationViews = () => {
	return (
        <Routes>
            <Route path="/" element={
                <>
                    <h1>We Vibin'</h1>
                    <div>Share and explore music with your friends</div>

                    <Outlet />
                </>
            }>
                <Route path="playlists" element={<AllPlaylists />} />
                <Route path="playlists/:playlistId/songs" element={<SongsOnPlaylist />} />
                <Route path="search" element={<SongSearch />} />
                <Route path="myPlaylists" element={<MyPlaylists />} />
                <Route path="createPlaylist" element={<CreatePlaylist />} />
                <Route path="myPlaylists/:playlistId" element={<PlaylistSongs />} />
            </Route>
        </Routes>
    )
}