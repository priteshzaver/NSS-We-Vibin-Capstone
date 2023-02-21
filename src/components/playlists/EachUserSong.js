import { useEffect, useState } from "react";
import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime";

export const EachUserSong = ({ songObject, setterFunction }) => {
  const [listPlaylists, setListPlaylists] = useState([]);
  const convertedDuration = millisecondsToRuntime(songObject.songDuration);
  const [playlistSongs, setPlaylistSongs] = useState({
    playlistId: 0,
    songDuration: convertedDuration,
  });
  const localSpotifyUser = localStorage.getItem("spotify_user");
  const spotifyUser = JSON.parse(localSpotifyUser);
  useEffect(() => {
    fetch(`http://localhost:8088/playlists`)
      .then((response) => response.json())
      .then((data) => {
        setListPlaylists(data);
      });
  }, []);
  const deleteButton = () => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete this song?`
    );
    if (confirmDelete === true) {
      return fetch(`http://localhost:8088/playlistSongs/${songObject.id}`, {
        method: "DELETE",
      });
    }
  };
  const saveButton = (event) => {
    event.preventDefault();
    const songToSendToApi = {
      playlistId: playlistSongs.playlistId,
      songId: songObject.songId,
      artistName: songObject.artistName,
      songName: songObject.songName,
      songDuration: songObject.songDuration,
      trackUri: songObject.trackUri,
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
    <form className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 grid grid-cols-10">
      <section className="mx-2 flex items-center">
        <div class="w-11 h-11 pl-2 rounded-full bg-white grid place-content-center">
          <button
            className="border-t-[15px] border-t-transparent border-l-[30px] border-l-green-500 border-b-[15px] border-b-transparent col-span-1 relative"
            value={songObject.trackUri}
            onClick={(clickevent) => {
              clickevent.preventDefault();
              setterFunction(clickevent.target.value);
            }}
          ></button>
        </div>
      </section>
      <section className="col-span-4 grid content-center justify-items-center">
        <div className="text-2xl font-semibold">{songObject.songName}</div>
        <div className="text-lg">{songObject.artistName}</div>
      </section>
      <section className="col-span-1 grid content-center">
        <div className="grid justify-items-center text-lg">
          {convertedDuration}
        </div>
        <button
          onClick={(clickEvent) => deleteButton(clickEvent)}
          className="border-white border-2 bg-slate-700 hover:bg-red-500 px-3 rounded-md"
        >
          Delete
        </button>
      </section>
      <section></section>
      <section className="grid content-center my-2 col-span-3 mr-1">
        <div className="grid justify-items-center">
          <fieldset>
            <label>Save to Other Playlists: </label>
            <select
              className="text-black"
              onChange={(event) => {
                const copy = { ...playlistSongs };
                copy.playlistId = parseInt(event.target.value);
                setPlaylistSongs(copy);
              }}
            >
              <option value="0">Choose Playlist</option>
              {listPlaylists.map((listPlaylist) => {
                return (
                  <>
                    {spotifyUser.id === listPlaylist.userId &&
                    listPlaylist.id !== songObject.playlistId ? (
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
        </div>
        <button
          onClick={(clickEvent) => saveButton(clickEvent)}
          className="border-white border-2 bg-slate-700 hover:bg-green-500 mt-2 mx-9 rounded-md col-span-1"
        >
          Save Song
        </button>
      </section>
    </form>
  );
};
