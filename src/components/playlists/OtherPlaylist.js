import { Link } from "react-router-dom"

export const OtherPlaylist = ({ otherPlaylistObject }) => {
    
    
    return <section>
        <header>{otherPlaylistObject.user?.fullName}</header>
        <div>
            <Link to={`/otherPlaylists/${otherPlaylistObject.id}/songs`}>{otherPlaylistObject.playlistName}</Link>
            </div>
        <div>{otherPlaylistObject.description}</div>
    </section>
}