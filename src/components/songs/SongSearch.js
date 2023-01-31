import { useContext, useState } from "react"
import TokenContext from "../../SpotifyAccess"
import { Songs } from "./Songs"

export const SongSearch = () => {
    const [songs, setSongs] = useState([])
    const [searchTerms, setSearchTerms] = useState("")
    const accessToken = useContext(TokenContext)
    const trackParameters = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + accessToken
        }
    }
    const findSong = () => {
        return <button
            onClick={() => {
                fetch(`https://api.spotify.com/v1/search?q=` + searchTerms + `&type=track&limit=10`, trackParameters)
                    .then(response => response.json())
                    .then(data => {
                        setSongs(data.tracks.items)
                    })
            }}>
            Search
        </button>
    }
    return (
        <section>
            <div>
                <input
                    onChange={
                        (changeEvent) => {
                            setSearchTerms(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Enter search terms" />
                {findSong()}
            </div>
            <div>
                {songs.map(song => <Songs key={`song--${song.id}`}
                    songArtist={song.artists[0].name}
                    songName={song.name}
                    songId={song.id} />)}
            </div>
        </section>
    )
}