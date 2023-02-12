import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { OtherUserSong } from "./OtherUserSong"

export const OtherPlaylistSongs = () => {
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
        fetch(`http://localhost:8088/playlists/${playlistId}/?_embed=playlistSongs`)
            .then(response => response.json())
            .then((data) => {
                setPlaylistSongs(data.playlistSongs)
            })
    }, [])

    return <>
        <h2 className="text-white text-4xl flex justify-center py-2 underline">{playlist.playlistName}</h2>
        <article className="grid gap-10">
            {playlistSongs.map(song => <OtherUserSong key={`song--${song.id}`}
                songObject={song} />
            )}
        </article>
    </>
}