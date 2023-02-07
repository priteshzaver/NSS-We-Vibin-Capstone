import { useEffect, useState } from "react"
import { OtherPlaylist } from "./OtherPlaylist"

export const OtherUsersPlaylists = () => {
    const [otherPlaylists, setOtherPlaylists] = useState([])
    const [otherFilteredPlaylists, setOtherFilteredPlaylists] = useState([])
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)

    useEffect(() => {
        fetch(`http://localhost:8088/playlists?_expand=user`)
            .then(response => response.json())
            .then((data) => {
                setOtherPlaylists(data)
            })
    }, [])
    
    useEffect(() => {
        const myPlaylists = otherPlaylists.filter(playlist => playlist.userId !== spotifyUser.id)
        setOtherFilteredPlaylists(myPlaylists)
    }, [otherPlaylists])

    return <>
        <h2 className="text-white text-4xl flex justify-center py-2">Other Users Playlists</h2>

        <article className="grid grid-cols-3 gap-10">
            {otherFilteredPlaylists.map(playlist => <OtherPlaylist key={`playlist--${playlist.id}`}
                otherPlaylistObject={playlist}
                />
            )}
        </article>
        
        </>
}