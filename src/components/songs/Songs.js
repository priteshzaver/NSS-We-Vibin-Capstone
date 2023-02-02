import { useEffect, useState } from "react"

export const Songs = ({ songName, songId, songArtist, songAlbum }) => {
    const [listPlaylists, setListPlaylists] = useState([])
    const [playlistSongs, setPlaylistSongs] = useState({
        songId: songId,
        songName: songName,
        artistName: songArtist,
        playlistId: 0
    })
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)

    useEffect(() => {
        fetch(`http://localhost:8088/playlists`)
            .then(response => response.json())
            .then((data) => {
                setListPlaylists(data)
            })
    }, [])

    const saveSong = () => {
        return <button
            onClick={() => {
                fetch(`http://localhost:8088/playlistSongs`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        playlistId: playlistSongs.playlistId,
                        songId: songId,
                        artistName: playlistSongs.artistName,
                        songName: playlistSongs.songName
                    })
                })
                    .then(response => response.json())
                    .then(() => {
                        alert(`Your song was successfully saved`)
                    })
            }}>
            Save Song
        </button>
    }

    return (
        <form>
            <section>
                <header>Title: {songName}</header>
                <div>Artist: {songArtist}</div>
                <div>Album: {songAlbum}</div>
            </section>
            <fieldset>
                <div>Select playlist to save to:</div>
                {listPlaylists.map(listPlaylist => {
                    return <>
                        {
                            spotifyUser.id === listPlaylist.userId
                                ? <>
                                    <div key={listPlaylist.id} className="radio">
                                        <input
                                            type="radio"
                                            value={listPlaylist.id}
                                            checked={listPlaylist.id === playlistSongs.playlistId}
                                            onChange={(event) => {
                                                const copy = { ...playlistSongs }
                                                copy.playlistId = parseInt(event.target.value)
                                                setPlaylistSongs(copy)
                                            }} />
                                        {listPlaylist.playlistName}
                                    </div>
                                </>
                                : ""
                        }

                    </>
                })}
            </fieldset>
            <fieldset>
                {saveSong()}
            </fieldset>
        </form>
    )
}