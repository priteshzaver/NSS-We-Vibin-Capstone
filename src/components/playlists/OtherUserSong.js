import { useEffect, useState } from "react"
import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime";

export const OtherUserSong = ({ songObject, setterFunction }) => {
    const convertedDuration = millisecondsToRuntime(songObject.songDuration)
    const [saveSong, setSaveSong] = useState({
        playlistId: 0
    })
    const [playlists, setPlaylists] = useState([])
    const [filteredPlaylists, setFilteredPlaylists] = useState([])
    const localSpotifyUser = localStorage.getItem("spotify_user")
    const spotifyUser = JSON.parse(localSpotifyUser)

    useEffect(() => {
        fetch(`http://localhost:8088/playlists`)
            .then(response => response.json())
            .then(data => {
                setPlaylists(data)
            })
    }, [])

    useEffect(() => {
        const myPlaylists = playlists.filter(playlist => playlist.userId === spotifyUser.id)
        setFilteredPlaylists(myPlaylists)
    }, [playlists])

    const saveButton = (event) => {
        event.preventDefault()
        const songToSendToApi = {
            playlistId: saveSong.playlistId,
            songId: songObject.songId,
            artistName: songObject.artistName,
            songName: songObject.songName,
            songDuration: songObject.songDuration,
            trackUri: songObject.trackUri
        }
        if (songToSendToApi.playlistId !== 0) {
            return fetch(`http://localhost:8088/playlistSongs`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(songToSendToApi)
            })
                .then(() => {
                    alert("Your song was successfully saved!")
                })
        }
    }

    return (
      <section className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-6 grid grid-cols-9 place-items-center">
        <section className="mx-2 flex items-center">
          <button
            className="border-t-[15px] border-t-transparent border-l-[30px] border-l-green-500 border-b-[15px] border-b-transparent col-span-1"
            value={songObject.trackUri}
            onClick={(clickevent) => {
              clickevent.preventDefault();
              setterFunction(clickevent.target.value);
            }}
          ></button>
        </section>
        <header className="col-span-3 text-2xl">{songObject.songName}</header>
        <div className="col-span-2 text-lg">{songObject.artistName}</div>
        <div className="text-lg">{convertedDuration}</div>

        <form className="py-1 col-span-2 grid justify-self-center">
          <fieldset>
            <label>Save to Playlist: </label>
            <select
              className="text-black"
              onChange={(event) => {
                const copy = { ...saveSong };
                copy.playlistId = parseInt(event.target.value);
                setSaveSong(copy);
              }}
            >
              <option value="0">Choose Playlist</option>
              {filteredPlaylists.map((playlist) => {
                return (
                  <>
                    <option value={playlist.id}>{playlist.playlistName}</option>
                  </>
                );
              })}
            </select>
          </fieldset>

          <button
            onClick={(clickEvent) => saveButton(clickEvent)}
            className="border-white border-2 bg-slate-700 hover:bg-green-500 mt-2 rounded-md"
          >
            Save Song
          </button>
        </form>
      </section>
    );
}