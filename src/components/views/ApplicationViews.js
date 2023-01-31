import { Outlet, Route, Routes } from "react-router-dom"
import { CreatePlaylist } from "../playlists/CreatePlaylist"
import { MyPlaylist } from "../playlists/MyPlaylist"
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
                <Route path="search" element={<SongSearch />} />
                <Route path="myPlaylist" element={<MyPlaylist />} />
                <Route path="createPlaylist" element={<CreatePlaylist />} />
            </Route>
        </Routes>
    )
}