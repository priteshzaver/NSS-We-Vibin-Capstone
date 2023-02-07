import { useNavigate } from "react-router-dom"

export const EachUserSong = ({songObject, playlist}) => {
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)
    const navigate = useNavigate()

    const deleteButton = () => {
        if (spotifyUser.id === playlist.userId) {
            return <button className="border-white border-2" onClick={() => {
                fetch(`http://localhost:8088/playlistSongs/${songObject.id}`, {
                    method: "DELETE"
                })
                .then(() => {
                        navigate("/playlists")
                })
            }}>
                Delete Song
            </button>
        }
    }
    return <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-6">
                <header>Title: {songObject.songName}</header>
                <div>Album: {songObject.artistName}</div>
                <footer>
                    {
                        deleteButton()
                    }
                </footer>
            </section>
}