import { Link } from "react-router-dom"

export const UserPlaylist = ({ playlistObject }) => {
    return <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-6">
        <header className="underline text-2xl">
            <Link to={`/myPlaylists/${playlistObject.id}/songs`}>{playlistObject.playlistName}</Link>
        </header>
        <footer>{playlistObject.description}</footer>
    </section>
}