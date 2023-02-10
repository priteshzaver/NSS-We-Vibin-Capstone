import { useEffect, useState } from "react"
import { UserPlaylist } from "./UserPlaylist"

export const MyPlaylists = () => {
    const [allPlaylists, setAllPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)

    useEffect(() => {
        fetch(`http://localhost:8088/playlists?_embed=playlistSongs`)
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
        <h2 className="text-white text-4xl flex justify-center py-2">My Playlists</h2>
        <article className="grid grid-cols-3 gap-10">
            {filteredPlaylists.map(playlist => <UserPlaylist key={`playlist--${playlist.id}`}
                playlistObject={playlist}/>
            )}
        </article>
    </>
}