import { useContext, useState } from "react"
import TokenContext from "../../SpotifyAccess"
import { MusicPlayer } from "../musicplayer/MusicPlayer"
import { Songs } from "./Songs"

export const SongSearch = ({ setterFunction }) => {
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
        return <button className="border-white border-2 bg-slate-700 hover:bg-green-500"
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
        <article className="grid">
            <h2 className="text-white text-4xl flex justify-center py-2 underline">Search For New Vibes</h2>
            <section className="bg-white bg-opacity-40 rounded shadow-2xl shadow-emerald-400 text-white border-2 border-opacity-30 mx-4">

                <div className="flex items-center my-3">
                    <div className="mx-2 text-black">
                        <input
                            onChange={
                                (changeEvent) => {
                                    setSearchTerms(changeEvent.target.value)
                                }
                            }
                            type="text" placeholder="Enter search terms" />
                    </div>
                    <div>
                        {findSong()}

                    </div>
                </div>

                <div className="grid grid-cols-1">
                    {songs.map(song => <Songs key={`song--${song.id}`}
                        songArtist={song.artists[0].name}
                        songName={song.name}
                        songId={song.id}
                        songAlbum={song.album?.name}
                        trackUri={song.uri}
                        setterFunction={setterFunction}
                        songDuration={song.duration_ms}
                        albumPic={song.album?.images[0].url} />)}
                </div>

            </section>
        </article>
    )
}
