import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EachUserSong } from "./EachUserSong"

export const UserSongs = () => {
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
    

    return <article className="grid gap-10 mt-2">
            <h2 className="text-white text-4xl flex justify-center py-2">{playlist.playlistName}</h2>
        {playlistSongs.map(song => <EachUserSong key={song.id}
            songObject={song}
            playlist={playlist}
            />
        )}
    </article>
}