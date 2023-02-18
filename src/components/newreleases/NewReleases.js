import { useEffect, useState } from "react"
import { NewAlbums } from "./NewAlbums"
import { NewSongs } from "./NewSongs"

export const NewReleases = () => {
    const [newReleases, setNewReleases] = useState([])
    const [newSongs, setNewSongs] = useState([])
    const [newAlbums, setNewAlbums] = useState([])
    let token = window.localStorage.getItem("token")
    const trackParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    useEffect(() => {
        fetch("https://api.spotify.com/v1/browse/new-releases?&limit=50", trackParameters)
            .then(response => response.json())
            .then(data => {
                setNewReleases(data.albums.items)
            })
    }, [])
    useEffect(() => {
        const newReleaseSongs = newReleases.filter(song => song.album_type !== "album")
        setNewSongs(newReleaseSongs)
        const newReleaseAlbums = newReleases.filter(album => album.album_type === "album")
        setNewAlbums(newReleaseAlbums)
    }, [newReleases])

    return <>
        <h2 className="text-white text-4xl flex justify-center underline py-2">New Releases</h2>
        <div className="grid grid-cols-2">
            <div>

                <h3 className="text-white text-3xl flex justify-center underline py-2">New Singles</h3>
                <article>
                    {newSongs.map(song => <>
                        <NewSongs key={`song--${song.id}`}
                            songObject={song} />
                    </>)}
                </article>
            </div>
            <div>

                <h3 className="text-white text-3xl flex justify-center underline py-2">New Albums</h3>
                <article className="grid">
                    {newAlbums.map(album => <>
                        <NewAlbums key={`album--${album.id}`}
                            albumObject={album} />
                    </>)}
                </article>
            </div>
        </div>
    </>
}