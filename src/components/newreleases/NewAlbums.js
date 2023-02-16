import { useEffect, useState } from "react"
import { NewAlbumSongs } from "./NewAlbumSongs"

export const NewAlbums = ({ songObject }) => {
    const [albumDetails, setAlbumDetails] = useState([])

    let token = window.localStorage.getItem("token")
    const trackParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    useEffect(() => {
        fetch(`https://api.spotify.com/v1/albums/${songObject.id}`, trackParameters)
            .then(response => response.json())
            .then(data => {
                setAlbumDetails(data.tracks.items)
            })
    }, [])


    return <section className="bg-slate-300 bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2">
        <div className="grid grid-cols-3 justify-items-center">
            <header className="col-span-3 text-xl">{songObject.name}</header>
            <div className="text-lg">{songObject.artists[0].name}</div>
            <div className="text-lg">{songObject.release_date}</div>
            <div className="text-lg">{songObject.total_tracks} tracks</div>
        </div>
        <details className="px-2">
            <summary>Tracks and Save Options</summary>
            {albumDetails.map(song => <NewAlbumSongs key={song.id}
                song={song} />)}
        </details>
    </section>
}