import { useEffect, useState } from "react"
import { Playlist } from "./Playlist"

export const MyPlaylists = () => {
    const [listPlaylists, setListPlaylists] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:8088/playlists`)
            .then(response => response.json())
            .then((data) => {
                setListPlaylists(data)
            })
    }, [])
    
    return (
        <section>
            {listPlaylists.map(listPlaylist => <Playlist key={`playlist--${listPlaylist.id}`}
                    playlistId={listPlaylist.id}
                    playlistUserId={listPlaylist.userId}
                    playlistName={listPlaylist.playlistName}
                    playlistDescription={listPlaylist.description} />
            )}
        </section>
    )
}