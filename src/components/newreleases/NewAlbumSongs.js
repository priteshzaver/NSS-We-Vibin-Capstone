import { useState } from "react";
import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime";

export const NewAlbumSongs = ({ song, saveSong, setSaveSong }) => {
  const convertedDuration = millisecondsToRuntime(song.duration_ms);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(!checked)
    const copy = { ...saveSong };
    copy.songId = event.target.value;
    copy.songName = song.name;
    copy.songDuration = song.duration_ms;
    setSaveSong(copy);
  };

  return (
    <div className="grid grid-cols-6 py-1">
      <p className="col-span-1">PLAY</p>
      <input
        className="col-span-1"
        type="radio"
        value={song.id}
        checked={song.id === saveSong.songId}
        onChange={handleChange}
      />
      <p className="col-span-3">{song.name}</p>

      <p>{convertedDuration}</p>
    </div>
  );
};
