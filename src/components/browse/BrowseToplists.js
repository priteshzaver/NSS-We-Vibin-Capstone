import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { EachToplist } from "./EachToplist"

export const BrowseToplists = () => {
    const [playlists, setPlaylists] = useState([])
    const { categoryId } = useParams()
    let token = window.localStorage.getItem("token")
    const trackParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
    useEffect(() => {
        fetch(`https://api.spotify.com/v1/browse/categories/${categoryId}/playlists`, trackParameters)
            .then(response => response.json())
            .then(data => {
                setPlaylists(data.playlists.items)
            })
    }, [])

    return <>
        <h2 className="text-white underline text-4xl flex justify-center py-2">Toplists</h2>
        <article className="grid grid-cols-4">
            {playlists.map(playlist => <EachToplist key={`playlist--${playlist.id}`}
                playlist={playlist} />)}
        </article>
    </>
}