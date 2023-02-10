import { useNavigate } from "react-router-dom"

export const EachUserSong = ({ songObject, playlist }) => {
    function padTo2Digits(num) {
        return num.toString().padStart(2, '0');
    }
    const convertMsToMinutesSeconds = (milliseconds) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.round((milliseconds % 60000) / 1000);

        return seconds === 60
            ? `${minutes + 1}:00`
            : `${minutes}:${padTo2Digits(seconds)}`;
    }
    const convertedDuration = convertMsToMinutesSeconds(songObject.songDuration)
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
                        navigate("/myPlaylists")
                    })
            }}>
                Delete Song
            </button>
        }
    }
    return <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-6">
        <header>Title: {songObject.songName}</header>
        <div>Album: {songObject.artistName}</div>
        <div>Duration: {convertedDuration}</div>
        <footer>
            {
                deleteButton()
            }
        </footer>
    </section>
}