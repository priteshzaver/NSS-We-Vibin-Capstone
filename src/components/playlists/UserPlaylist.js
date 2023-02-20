import { Link } from "react-router-dom"
import { millisecondsToRuntime } from "../helpers/millisecondsToRuntime"

export const UserPlaylist = ({ playlistObject }) => {
    let sum = 0
    playlistObject.playlistSongs.forEach(function (item) {
        sum += item.songDuration
    })
    const convertedDuration = millisecondsToRuntime(sum)
    const deletePlaylistButton = () => {
        const confirmDelete = window.confirm(`Are you sure you want to delete playlist ${playlistObject.playlistName}?`)
        if (confirmDelete) {
            return fetch(`http://localhost:8088/playlists/${playlistObject.id}/?_embed=playlistSongs`, {
                method: "DELETE"
            })
        }
    }

    return <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-6 grid justify-items-center">
        <header className="underline text-2xl">
            <Link to={`/myPlaylists/${playlistObject.id}/songs`}>{playlistObject.playlistName}</Link>
        </header>
        <div>{playlistObject.description}</div>
        <div className="grid grid-cols-2">
            <div>{playlistObject.playlistSongs?.length} song(s)</div>
            <div>Duration: {convertedDuration}</div>
        </div>
        <form className="my-2 grid justify-self-end mr-3">
            <button
                onClick={(clickEvent) => deletePlaylistButton(clickEvent)}
                className="border-white border-2 rounded-md bg-slate-700 hover:bg-red-500 px-2">
                Delete Playlist
            </button>
        </form>
    </section>
}