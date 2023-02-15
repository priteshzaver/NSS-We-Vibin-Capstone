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
    

    return <section className="bg-white bg-opacity-40 rounded shadow-lg shadow-emerald-400 text-white border-2 border-opacity-30 mx-2 my-2 grid grid-cols-4 justify-items-center items-center">
        <header className="text-xl">Album: {songObject.name}</header>
        <div className="text-lg">{songObject.artists[0].name}</div>
        <div className="text-lg">{songObject.release_date}</div>
        <div className="text-lg">{songObject.total_tracks} tracks</div>
        {albumDetails.map(song => <NewAlbumSongs key={song.id}
        song={song.name}/>)}
    </section>
}