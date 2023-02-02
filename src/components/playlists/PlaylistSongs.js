import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EachSong } from "./EachSong"

export const PlaylistSongs = () => {
    const [playlistSongs, setPlaylistSongs] = useState([])
    const {playlistId} = useParams()

    useEffect(() => {
        fetch(`http://localhost:8088/playlists/${playlistId}/?_embed=playlistSongs`)
            .then(response => response.json())
            .then((data) => {
                    setPlaylistSongs(data.playlistSongs)
            })
    }, [])
    
    return <section>
        {playlistSongs.map(song => <EachSong key={`song--${song.id}`}
            songObject={song}/>
            )}
    </section>
}