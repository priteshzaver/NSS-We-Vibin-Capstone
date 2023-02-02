export const EachSong = ({ songObject }) => {
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)

    const deleteButton = () => {
        if (spotifyUser) {
            return <button onClick={() => {
                fetch(`http://localhost:8088/playlistSongs/${songObject.id}`, {
                    method: "DELETE"
                })
            }}>
                Delete Song
            </button>
        }
        else {
            return ""
        }
    }
    
    
    return <>
        <header>Title: {songObject.songName}</header>
        <div>Artist: {songObject.artistName}</div>
        <footer>
            {
                deleteButton()
            }
        </footer>
    </>
}