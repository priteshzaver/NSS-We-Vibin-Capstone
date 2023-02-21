import { useEffect, useState } from "react";
import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime";

export const NewSongs = ({ songObject, setterFunction }) => {
  const [listPlaylists, setListPlaylists] = useState([]);
  const [duration, setDuration] = useState([]);
  const localSpotifyUser = localStorage.getItem("spotify_user");
  const spotifyUser = JSON.parse(localSpotifyUser);
  let token = window.localStorage.getItem("token");
  const [saveSong, setSaveSong] = useState({
    playlistId: 0,
  });
  const convertedDuration = millisecondsToRuntime(duration);
  useEffect(() => {
    fetch(`http://localhost:8088/playlists`)
      .then((response) => response.json())
      .then((data) => {
        setListPlaylists(data);
      });
  }, []);
  useEffect(() => {
    fetch(`https://api.spotify.com/v1/albums/${songObject.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setDuration(data.tracks.items[0].duration_ms);
      });
  }, []);
  const saveButton = (event) => {
    event.preventDefault();
    const songToSendToApi = {
      playlistId: saveSong.playlistId,
      songId: songObject.id,
      artistName: songObject.artists[0].name,
      songName: songObject.name,
      songDuration: duration,
      trackUri: songObject.uri,
    };
    if (songToSendToApi.playlistId !== 0) {
      fetch(`http://localhost:8088/playlistSongs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(songToSendToApi),
      }).then(() => {
        alert(`Your song was successfully saved`);
      });
    }
  };

  return (
    <section className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 my-2 grid grid-cols-5 pb-2">
      <div className="grid col-span-5 justify-items-center">
        <header className="text-2xl">{songObject.name}</header>
      </div>
      <section className="ml-3 flex items-center col-span-1">
        <button
          className="border-t-[15px] border-t-transparent border-l-[30px] border-l-green-500 border-b-[15px] border-b-transparent"
          value={songObject.uri}
          onClick={(clickevent) => {
            clickevent.preventDefault();
            setterFunction(clickevent.target.value);
          }}
        ></button>
      </section>
      <div className="col-span-2 grid place-content-center">
        <div className="justify-self-center text-xl">
          {songObject.artists[0].name}
        </div>
        <div className="justify-self-center text-lg">
          {songObject.release_date}
        </div>
      </div>
      <section className="grid place-content-center">
        <div className="text-lg">{convertedDuration}</div>
      </section>
      <div className="col-span-1 grid place-content-center">
        <img
          src={songObject.images[0].url}
          alt="Album photo"
          className="w-20 rounded-md my-1"
        />
      </div>
      <details className="pl-2 col-span-5">
        <summary>Save Options</summary>
        <form>
          <section className="grid grid-cols-5 my-2">
            <fieldset className="col-span-3 place-self-center">
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
                {listPlaylists.map((listPlaylist) => {
                  return (
                    <>
                      {spotifyUser.id === listPlaylist.userId ? (
                        <option value={listPlaylist.id}>
                          {listPlaylist.playlistName}
                        </option>
                      ) : (
                        ""
                      )}
                    </>
                  );
                })}
              </select>
            </fieldset>
            <button
              onClick={(clickEvent) => saveButton(clickEvent)}
              className="border-white border-2 bg-slate-700 hover:bg-green-500 rounded-md col-span-2 mx-3"
            >
              Save Song
            </button>
          </section>
        </form>
      </details>
    </section>
  );
};
