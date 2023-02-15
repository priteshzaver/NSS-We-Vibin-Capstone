import { Link } from "react-router-dom"

export const EachPlaylist = ({ playlist }) => {
    return <section className="bg-white bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2 grid justify-items-center items-center">
        <Link to={`/browse/categories/playlists/${playlist.id}/songs`}>
            <div className="grid justify-items-center">
                <div className="text-lg">{playlist.name}</div>
                <img src={playlist.images[0].url} alt="Playlist Photo" className="w-20" />
            </div>
            <div className="my-3 mx-2">{playlist.description}</div>
        </Link>
    </section>
}