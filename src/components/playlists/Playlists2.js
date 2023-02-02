import { Link } from "react-router-dom"

export const Playlists2 = ({ playlistObject }) => {
    return <section className="playlist">
        <header>
            <Link to={`/playlists/${playlistObject.id}/songs`}>{playlistObject.playlistName}</Link>
        </header>
        <footer>{playlistObject.description}</footer>
    </section>
}