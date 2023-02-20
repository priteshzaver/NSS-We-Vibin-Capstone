import { useEffect, useState } from "react"
import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime";

export const Songs = ({ songName, songId, songArtist, songAlbum, trackUri, setterFunction, songDuration, albumPic }) => {
    const [listPlaylists, setListPlaylists] = useState([])
    const convertedDuration = millisecondsToRuntime(songDuration)
    const [playlistSongs, setPlaylistSongs] = useState({
        songId: songId,
        songName: songName,
        artistName: songArtist,
        playlistId: 0,
        songDuration: convertedDuration
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
    const saveButton = (event) => {
        event.preventDefault()
        const songToSendToApi = {
            playlistId: playlistSongs.playlistId,
            songId: songId,
            artistName: playlistSongs.artistName,
            songName: playlistSongs.songName,
            songDuration: songDuration,
            trackUri: trackUri
        }
        if (songToSendToApi.playlistId !== 0) {
            fetch(`http://localhost:8088/playlistSongs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(songToSendToApi)
            })
                .then(() => {
                    alert(`Your song was successfully saved`)
                })
        }
    }

    return (
        <form className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2 grid grid-cols-9">
            <section className="mx-2 flex items-center">
                <button
                    className="border-t-[15px] border-t-transparent border-l-[30px] border-l-green-500 border-b-[15px] border-b-transparent"
                    value={trackUri}
                    onClick={(clickevent) => {
                        clickevent.preventDefault()
                        setterFunction(clickevent.target.value)
                    }}
                ></button>
            </section>
            <section className="col-span-3 grid content-center">
                <header className="text-2xl font-semibold">{songName}</header>
                <div className="text-lg">{songArtist}</div>
            </section>
            <section className="col-span-2 grid content-center">
                <div className="text-lg">{songAlbum}</div>
                <div className="text-lg">{convertedDuration}</div>
            </section>
            <section>
                <img src={albumPic} alt="Album photo" className="w-20 rounded-md my-1" />
            </section>
            <section className=" grid content-center mt-2 col-span-2 mr-1">
                <fieldset>
                    <label>Save to Playlist: </label>
                    <select className="text-black"
                        onChange={(event) => {
                            const copy = { ...playlistSongs }
                            copy.playlistId = parseInt(event.target.value)
                            setPlaylistSongs(copy)
                        }}>
                        <option value="0">Choose Playlist</option>
                        {listPlaylists.map(listPlaylist => {
                            return <>
                                {
                                    spotifyUser.id === listPlaylist.userId
                                        ? <option value={listPlaylist.id}>
                                            {listPlaylist.playlistName}
                                        </option>
                                        : ""
                                }
                            </>
                        })}
                    </select>
                </fieldset>
                <button
                    onClick={(clickEvent) => saveButton(clickEvent)}
                    className="border-white border-2 bg-slate-700 hover:bg-green-500 mt-2 rounded-md">
                    Save Song
                </button>
            </section>
        </form>
    )
}