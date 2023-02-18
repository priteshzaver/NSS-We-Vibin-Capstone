import { useEffect, useState } from "react"
import SpotifyPlayer from "react-spotify-web-playback"

export const MusicPlayer = ({ selectedTrackUri }) => {
    const [play, setPlay] = useState(false)
    const [selectedTrack, setSelectedTrack] = useState([])
    let token = window.localStorage.getItem("token")

    useEffect(() => {
        fetch(`http://localhost:8088/selectedTrack`)
            .then(response => response.json())
            .then(data => {
                setSelectedTrack(data[0].selectedUri)
            })
    }, [])

    if (!token)
        return null

    return (
        <>
        <SpotifyPlayer
            token={token}
            showSaveIcon
            callback={state => !state.isPlaying && setPlay(false)}
            play={play}
            uris={selectedTrack ? selectedTrack : []}
            styles={{
                activeColor: "#fff",
                bgColor: "#333",
                color: "#fff",
                loaderColor: "#fff",
                sliderColor: "#1cb954",
                trackArtistColor: "#ccc",
                trackNameColor: "#fff",
                height: "55px",
            }}
            />
            <button
                onClick={() => {
                    setPlay(!play);
                }}
            >
            </button>
            </>
    )
}