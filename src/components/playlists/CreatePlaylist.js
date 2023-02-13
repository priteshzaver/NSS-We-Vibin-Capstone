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
        <article className="grid grid-cols-10">
            <h2 className="text-white text-4xl flex justify-center py-2 underline col-span-10">Create New Vibes</h2>
            <form className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-4 py-4 col-start-4 col-end-8 grid justify-items-center">
                <div className="mb-3">
                    <fieldset className="mb-2 text-lg">
                        
                            <label>Playlist Name: </label>
                            <input
                                required autoFocus
                                className="text-black"
                                type="text"
                                placeholder="Playlist Name"
                                value={playlist.playlistName}
                                onChange={
                                    (event) => {
                                        const copy = { ...playlist }
                                        copy.playlistName = event.target.value
                                        setPlaylist(copy)
                                    }
                                } />
                        
                    </fieldset>
                    <fieldset className="text-lg">
                        
                            <label>Playlist Description: </label>
                            <input
                                type="text"
                                className="text-black"
                                placeholder="Playlist Description"
                                value={playlist.description}
                                size="28"
                                onChange={
                                    (event) => {
                                        const copy = { ...playlist }
                                        copy.description = event.target.value
                                        setPlaylist(copy)
                                    }
                                } />
                    
                    </fieldset>
                </div>
                <div>
                <button
                    className="border-white border-2 bg-slate-700 hover:bg-green-500 px-8"
                    onClick={(clickEvent) => createPlaylistButton(clickEvent)}>
                    Create Playlist
                </button>
                </div>
            </form>
        </article>
    )
}
