import { useEffect, useState } from "react"

export const MyPlaylist = () => {
    const [listPlaylists, setListPlaylists] = useState([])
    
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)
    
    useEffect(() => {
        fetch(`http://localhost:8088/playlists`)
            .then(response => response.json())
            .then((data) => {
                setListPlaylists(data)
        })
    }, [])


    return (
        <section>
            {listPlaylists.map(listPlaylist => {
                return <>
                    {
                        spotifyUser.id === listPlaylist.userId
                            ? <>
                                <header>{listPlaylist.playlistName}</header>
                                <div>{listPlaylist.description}</div>
                                </>
                            : ""
                    }
                    
                    </>
                
            })}
        </section>
    )
}