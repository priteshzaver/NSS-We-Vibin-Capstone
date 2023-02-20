import { useState } from "react";
import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime";

export const NewAlbumSongs = ({ song, saveSong, setSaveSong, setterFunction }) => {
  const convertedDuration = millisecondsToRuntime(song.duration_ms);
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(!checked)
    const copy = { ...saveSong };
    copy.songId = event.target.value;
    copy.songName = song.name;
    copy.songDuration = song.duration_ms;
    copy.trackUri = song.uri
    setSaveSong(copy);
  };

  return (
    <div className="grid grid-cols-6 py-1">
      <p className="col-span-1">
        <section className="my-2 flex items-center">
          <button
            className="border-t-[15px] border-t-transparent border-l-[30px] border-l-green-500 border-b-[15px] border-b-transparent col-span-1"
            value={song.uri}
            onClick={(clickevent) => {
              clickevent.preventDefault();
              setterFunction(clickevent.target.value);
            }}
          ></button>
        </section>
      </p>
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
