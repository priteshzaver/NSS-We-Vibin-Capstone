export const EachUserSong = ({ songObject }) => {
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
    const convertedDuration = convertMsToMinutesSeconds(songObject.songDuration)
    const deleteButton = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete this song?`)
        if (confirmDelete === true) {
            return fetch(`http://localhost:8088/playlistSongs/${songObject.id}`, {
                method: "DELETE"
            })

        }
    }

    return <section className="bg-white bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-6 grid grid-cols-8 justify-items-center items-center">
        <header className="col-span-4 text-2xl">{songObject.songName}</header>
        <div className="col-span-2 text-lg">Album: {songObject.artistName}</div>
        <div className="text-lg">{convertedDuration}</div>
        <form className="py-1">
            <button
                onClick={(clickEvent) => deleteButton(clickEvent)}
                className="border-white border-2 bg-slate-700 hover:bg-red-500 px-3 rounded-md">
                Delete
            </button>
        </form>
    </section>
}