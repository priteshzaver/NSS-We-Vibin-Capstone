import { Link } from "react-router-dom"

export const UserPlaylist = ({ playlistObject }) => {
    return <section className="playlist">
        <header>
            <Link to={`/myPlaylists/${playlistObject.id}/songs`}>{playlistObject.playlistName}</Link>
        </header>
        <footer>{playlistObject.description}</footer>
    </section>
}