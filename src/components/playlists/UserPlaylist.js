import { Link } from "react-router-dom"

export const UserPlaylist = ({ playlistObject }) => {
    let sum = 0
    playlistObject.playlistSongs.forEach(function(item) {
        sum += item.songDuration
    })
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
    const convertedDuration = convertMsToMinutesSeconds(sum)

    return <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-6">
        <header className="underline text-2xl">
            <Link to={`/myPlaylists/${playlistObject.id}/songs`}>{playlistObject.playlistName}</Link>
        </header>
        <div>{playlistObject.description}</div>
        <div>{playlistObject.playlistSongs?.length} song(s)</div>
        <div>{convertedDuration}</div>
    </section>
}