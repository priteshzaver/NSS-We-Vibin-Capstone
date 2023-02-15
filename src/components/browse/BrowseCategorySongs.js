import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EachCategorySong } from "./EachCategorySong"

export const BrowseCategorySongs = () => {
    const [categorySongs, setCategorySongs] = useState([])
    const {categoryId} = useParams()

    let token = window.localStorage.getItem("token")
    const trackParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    useEffect(() => {
        fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists?&limit10`, trackParameters)
        .then(response => response.json())
        .then(data => {
            setCategorySongs(data.playlists.items)
        })
    }, [])
    return <>
    <h2>Category Name</h2>
    <article className="grid">
        {categorySongs.map(song => <EachCategorySong key={`song--${song.id}`}
        song={song}/>)}
    </article>
    </>
}