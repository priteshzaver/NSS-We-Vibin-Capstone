import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export const OtherUserSong = ({ songObject }) => {
    const [saveSong, setSaveSong] = useState({
       playlistId: 0 
    })
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`http://localhost:8088/playlists`)
            .then(response => response.json())
            .then(data => {
                setPlaylists(data)
            })
    }, [])

    useEffect(() => {
        const myPlaylists = playlists.filter(playlist => playlist.userId === spotifyUser.id)
        setFilteredPlaylists(myPlaylists)
    }, [playlists])

    const saveButton = (event) => {
        event.preventDefault()

        const songToSendToApi = {
            playlistId: saveSong.playlistId,
            songId: songObject.songId,
            artistName: songObject.artistName,
            songName: songObject.songName,
        }

        return fetch(`http://localhost:8088/playlistSongs`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(songToSendToApi)
        })
            .then(response => response.json())
            .then(() => {
                navigate("/myPlaylists")
            })
    }

    return <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-6">
        <header>Title: {songObject.songName}</header>
        <div>Artist: {songObject.artistName}</div>
        <form>
            <fieldset>
                <div>Save To Playlist:</div>
                {filteredPlaylists.map(playlist => {
                    return <div key={playlist.id} className="radio">
                            <input
                                type="radio"
                                value={playlist.id}
                                checked={playlist.id === saveSong.playlistId}
                                onChange={(event) => {
                                    const copy = {...saveSong}
                                    copy.playlistId = parseInt(event.target.value)
                                    setSaveSong(copy)
                                }}/>
                                {playlist.playlistName}
                    </div>
                })}
            </fieldset>
            <button 
                onClick={(clickEvent) => saveButton(clickEvent)}
                className="btn btn-primary">
                Save Song
            </button>
        </form>
    </section>
}