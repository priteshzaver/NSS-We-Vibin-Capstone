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
    <div className="grid grid-cols-6 justify-items-center content-center my-1">
      <p className="col-span-1 grid content-center">
          <div class="w-7 h-7 pl-1.5 rounded-full bg-slate-700 hover:bg-slate-500 grid place-content-center">
            <button
              className="border-t-[10px] border-t-transparent border-l-[20px] border-l-green-500 border-b-[10px] border-b-transparent col-span-1 relative hover:scale-125 duration-300"
              value={song.uri}
              onClick={(clickevent) => {
                clickevent.preventDefault();
                setterFunction(clickevent.target.value);
              }}
            ></button>
          </div>
        
      </p>
      <input
        className="col-span-1 h-[30px] place-self-center"
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
