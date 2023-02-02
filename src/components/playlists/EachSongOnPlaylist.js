import { useNavigate } from "react-router-dom"

export const EachSongOnPlaylist = ({songObject, playlist}) => {
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)
    const navigate = useNavigate()

    const deleteButton = () => {
        if (spotifyUser.id === playlist.userId) {
            return <button onClick={() => {
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
    return <section>
                <header>Title: {songObject.songName}</header>
                <div>Album: {songObject.artistName}</div>
                <footer>
                    {
                        deleteButton()
                    }
                </footer>
            </section>
}