import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EachToplistSong } from "./EachToplistSong"

export const ToplistSongs = () => {
    const [playlistContents, setPlaylistContents] = useState([])
    const [playlistSongs, setPlaylistSongs] = useState([])
    const {playlistId} = useParams()
    let token = window.localStorage.getItem("token")
    const trackParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}`, trackParameters)
        .then(response => response.json())
        .then(data => {
            setPlaylistContents(data)
        })
    }, [])
    useEffect(() => {
        fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, trackParameters)
        .then(response => response.json())
        .then(data => {
            setPlaylistSongs(data.items)
        })
    }, [])
    
    return <>
    <h2>{playlistContents.name}</h2>
    <article className="grid">
        {playlistSongs.map(song => <EachToplistSong key={`song--${song.track?.id}`}
        song={song}/>)}
    </article>
    </>
}