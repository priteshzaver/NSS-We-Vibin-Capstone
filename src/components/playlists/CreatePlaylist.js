import { useState } from "react"
import { useNavigate } from "react-router-dom"

export const CreatePlaylist = () => {
    const [playlist, setPlaylist] = useState({
        userId: 0,
        playlistName: '',
        description: ""
    })
    const navigate = useNavigate()
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)
    
    const createPlaylistButton = (event) => {
        event.preventDefault()
        const playlistToSendToApi = {
            userId: spotifyUser.id,
            playlistName: playlist.playlistName,
            description: playlist.description
        }
        return fetch(`http://localhost:8088/playlists`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(playlistToSendToApi)
        })
        .then(() => {
            navigate("/myPlaylist")
        })

    }

    return (
        <form className="createPlaylistForm">
            <h2 className="createPlaylistForm__title">New Playlist</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="playlistName">Playlist Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        playholder="Playlist Name"
                        value={playlist.playlistName}
                        onChange={
                            (event) => {
                                const copy = {...playlist}
                                copy.playlistName = event.target.value
                                setPlaylist(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="playlistDescription">Playlist Description:</label>
                    <input
                        type="text"
                        className="form-control"
                        playholder="Playlist Description"
                        value={playlist.description}
                        onChange={
                            (event) => {
                                const copy = {...playlist}
                                copy.description = event.target.value
                                setPlaylist(copy)
                            }
                        }/>
                </div>
            </fieldset>
            <button 
                onClick={(clickEvent) => createPlaylistButton(clickEvent)}
                className="btn btn-primary">
                Create Playlist
            </button>
        </form>
    )
}
