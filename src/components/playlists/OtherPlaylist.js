import { Link } from "react-router-dom"

export const OtherPlaylist = ({ otherPlaylistObject }) => {
    
    
    return <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-6">
        <header>Owner: {otherPlaylistObject.user?.fullName}</header>
        <div className="underline text-2xl">
            <Link to={`/otherPlaylists/${otherPlaylistObject.id}/songs`}>{otherPlaylistObject.playlistName}</Link>
            </div>
        <div >{otherPlaylistObject.description}</div>
    </section>
}