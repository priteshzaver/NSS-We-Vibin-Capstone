import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime";

export const EachUserSong = ({ songObject, setterFunction }) => {
  const convertedDuration = millisecondsToRuntime(songObject.songDuration);
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

  return (
    <section className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-6 grid grid-cols-9 place-items-center">
      <section className="my-2 flex items-center">
        <button
          className="border-t-[15px] border-t-transparent border-l-[30px] border-l-green-500 border-b-[15px] border-b-transparent col-span-1"
          value={songObject.trackUri}
          onClick={(clickevent) => {
            clickevent.preventDefault();
            setterFunction(clickevent.target.value);
          }}
        ></button>
      </section>
      <div className="col-span-4 text-2xl">{songObject.songName}</div>
      <div className="col-span-2 text-lg">{songObject.artistName}</div>
      <div className="col-span-1 text-lg">{convertedDuration}</div>
      <form className="py-1">
        <button
          onClick={(clickEvent) => deleteButton(clickEvent)}
          className="border-white border-2 bg-slate-700 hover:bg-red-500 px-3 rounded-md col-span-1 "
        >
          Delete
        </button>
      </form>
    </section>
  );
};
