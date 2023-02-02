import { useEffect, useState } from "react"
import "./Playlists.css"
import { UserPlaylist } from "./UserPlaylist"

export const MyPlaylists = () => {
    const [allPlaylists, setAllPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)

    useEffect(() => {
        fetch(`http://localhost:8088/playlists`)
            .then(response => response.json())
            .then(data => {
                setAllPlaylists(data)
            })
    }, [])

    useEffect(() => {
        const myPlaylists = allPlaylists.filter(playlist => playlist.userId === spotifyUser.id)
        setFilteredPlaylists(myPlaylists)
    }, [allPlaylists])

    return <>
        <h2>My Playlists</h2>

        <article className="playlists">
            {filteredPlaylists.map(playlist => <UserPlaylist key={`playlist--${playlist.id}`}
                playlistObject={playlist}/>
            )}
        </article>
    </>
}