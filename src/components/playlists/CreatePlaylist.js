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
                navigate("/myPlaylists")
            })

    }

    return (
        <article className="grid">
            <h2 className="text-white text-4xl flex justify-center py-2 underline">Create New Vibes</h2>
            <form className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-4">
                <fieldset>
                    <div>
                        <label>Playlist Name:</label>
                        <input
                            required autoFocus
                            className="border-lime-500 border-2 text-black"
                            type="text"
                            playholder="Playlist Name"
                            value={playlist.playlistName}
                            onChange={
                                (event) => {
                                    const copy = { ...playlist }
                                    copy.playlistName = event.target.value
                                    setPlaylist(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <fieldset>
                    <div>
                        <label>Playlist Description:</label>
                        <input
                            type="text"
                            className="border-lime-500 border-2 text-black"
                            playholder="Playlist Description"
                            value={playlist.description}
                            onChange={
                                (event) => {
                                    const copy = { ...playlist }
                                    copy.description = event.target.value
                                    setPlaylist(copy)
                                }
                            } />
                    </div>
                </fieldset>
                <button className="border-white border-2"
                    onClick={(clickEvent) => createPlaylistButton(clickEvent)}>
                    Create Playlist
                </button>
            </form>
        </article>
    )
}
