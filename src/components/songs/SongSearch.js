import { useContext, useState } from "react"
import TokenContext from "../../SpotifyAccess"
import { MusicPlayer } from "../musicplayer/MusicPlayer"
import { Songs } from "./Songs"

export const SongSearch = ({setterFunction}) => {
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
        return <button className="border-white border-2"
            onClick={() => {
                fetch(`https://api.spotify.com/v1/search?q=` + searchTerms + `&type=track%2Cartist%2Calbum&limit=10`, trackParameters)
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
            <div className="">
                <input
                    onChange={
                        (changeEvent) => {
                            setSearchTerms(changeEvent.target.value)
                        }
                    }
                    type="text" placeholder="Enter search terms" />
                {findSong()}
            </div>
            <div className="grid grid-cols-3">
                {songs.map(song => <Songs key={`song--${song.id}`}
                    songArtist={song.artists[0].name}
                    songName={song.name}
                    songId={song.id}
                    songAlbum={song.album?.name}
                    trackUri={song.uri}
                    setterFunction={setterFunction} />)}
            </div>
            
        </section>
    )
}

{/* <div>
                {songs.map(song => <MusicPlayer key={`song--${song.id}`}
                    trackUri={song.uri} />)}
            </div> */}