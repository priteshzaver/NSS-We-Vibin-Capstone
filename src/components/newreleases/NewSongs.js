import { useEffect, useState } from "react";

export const NewSongs = ({ songObject }) => {
    const [listPlaylists, setListPlaylists] = useState([])
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
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)
    let token = window.localStorage.getItem("token")
    const [saveSong, setSaveSong] = useState({
        playlistId: 0,
    })
    const [duration, setDuration] = useState([])
    const convertedDuration = convertMsToMinutesSeconds(duration)
    useEffect(() => {
        fetch(`http://localhost:8088/playlists`)
            .then(response => response.json())
            .then((data) => {
                setListPlaylists(data)
            })
    }, [])
    useEffect(() => {
        fetch(`https://api.spotify.com/v1/albums/${songObject.id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then(response => response.json())
            .then(data => {
                setDuration(data.tracks.items[0].duration_ms)
            })
    }, [])
    const saveButton = (event) => {
        event.preventDefault()
        const songToSendToApi = {
            playlistId: saveSong.playlistId,
            songId: songObject.id,
            artistName: songObject.artists[0].name,
            songName: songObject.name,
            songDuration: duration
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

    return <section className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2">
        <div className="grid grid-cols-3 justify-items-center">
            <header className="col-span-3 text-xl">{songObject.name}</header>
            <div className="col-span-1">PLAY</div>
            <div className="grid justify-items-center">
                <div>{songObject.artists[0].name}</div>
                <div className="text-lg">{songObject.release_date}</div>
                <div className="text-lg">{convertedDuration}</div>
            </div>
            <img src={songObject.images[0].url} alt="Album photo" className="w-20 rounded-md my-1" />
        </div>
        <details className="px-2">
            <summary>Save options</summary>
            <form className="grid grid-cols-2 items-center">
                
                    <fieldset>
                        <label>Save to Playlist: </label>
                        <select className="text-black"
                            onChange={(event) => {
                                const copy = { ...saveSong }
                                copy.playlistId = parseInt(event.target.value)
                                setSaveSong(copy)
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
                        className="border-white border-2 bg-slate-700 hover:bg-green-500 mt-2 rounded-md mb-2">
                        Save Song
                    </button>
                
            </form>
        </details>
    </section>
}