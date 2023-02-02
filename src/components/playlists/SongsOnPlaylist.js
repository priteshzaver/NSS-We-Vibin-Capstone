import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EachSongOnPlaylist } from "./EachSongOnPlaylist"

export const SongsOnPlaylist = () => {
    const [playlist, setPlaylist] = useState([])
    const [playlistSongs, setPlaylistSongs] = useState([])
    const { playlistId } = useParams()
    
    useEffect(() => {
        fetch(`http://localhost:8088/playlists/${playlistId}/`)
            .then(response => response.json())
            .then((data) => {
                setPlaylist(data)
            })
    }, [])
    useEffect(() => {
        fetch(`http://localhost:8088/playlistSongs/?playlistId=${playlistId}`)
            .then(response => response.json())
            .then(data => {
                setPlaylistSongs(data)
            })
    }, [])
    

    return <>
        {playlistSongs.map(song => <EachSongOnPlaylist key={song.id}
            songObject={song}
            playlist={playlist}
            />
        )}
    </>
}