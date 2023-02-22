import { useEffect, useState } from "react";
import { NewAlbumSongs } from "./NewAlbumSongs";
//import { NewAlbumSongs } from "./NewAlbumSongs"

export const NewAlbums = ({ albumObject, setterFunction }) => {
  const [songsInAlbum, setSongsInAlbum] = useState([]);
  const [listPlaylists, setListPlaylists] = useState([]);
  const [saveSong, setSaveSong] = useState([{
    playlistId: 0,
    songId: "",
    songName: "",
    songDuration: 0,
    trackUri: ""
  }]);
  const localSpotifyUser = localStorage.getItem("spotify_user");
  const spotifyUser = JSON.parse(localSpotifyUser);
  let token = window.localStorage.getItem("token");

  const trackParameters = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  };
  useEffect(() => {
    fetch(
      `https://api.spotify.com/v1/albums/${albumObject.id}`,
      trackParameters
    )
      .then((response) => response.json())
      .then((data) => {
        setSongsInAlbum(data.tracks.items);
      });
  }, []);
  useEffect(() => {
    fetch(`http://localhost:8088/playlists`)
      .then((response) => response.json())
      .then((data) => {
        setListPlaylists(data);
      });
  }, []);
  const saveButton = (event) => {
    event.preventDefault();
    const songToSendToApi = {
      playlistId: saveSong.playlistId,
      songId: saveSong.songId,
      artistName: albumObject.artists[0].name,
      songName: saveSong.songName,
      songDuration: saveSong.songDuration,
      trackUri: saveSong.trackUri
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
    <section className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2 pb-2">
      <div className="grid grid-cols-3 justify-items-center">
        <header className="col-span-3 text-2xl">{albumObject.name}</header>
        <div className="text-xl">{albumObject.artists[0].name}</div>
        <div className="text-lg">{albumObject.release_date}</div>
        <div className="text-lg">{albumObject.total_tracks} tracks</div>
      </div>
      <details className="px-2 col-span-3">
        <summary>Tracks and Save Options</summary>
        <div className="my-2 grid grid-cols-2">
        {songsInAlbum.map((song) => (
          <NewAlbumSongs
          key={song.id}
          song={song}
          setSaveSong={setSaveSong}
          saveSong={saveSong}
          setterFunction={setterFunction}
          />
          ))}
          </div>
        <form className="grid grid-cols-6 items-center">
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
            className="border-white border-2 bg-slate-700 hover:bg-green-500 rounded-md col-span-3 mx-11"
          >
            Save Song
          </button>
        </form>
      </details>
    </section>
  );
};
