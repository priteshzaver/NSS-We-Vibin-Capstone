import { Link } from "react-router-dom"

export const Playlist = ({ playlistId, playlistName, playlistDescription, playlistUserId}) => {
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)
    
    return <>
        {
            spotifyUser.id === playlistUserId
                ? <> <header>
                    <Link to={`/myPlaylists/${playlistId}`}>{playlistName}</Link>
                    </header>
                    <div>{playlistDescription}</div>
                </>
                : ""
        }
    </>
}