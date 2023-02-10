import { useState } from "react"
import { MusicPlayer } from "../musicplayer/MusicPlayer"

import { SongSearch } from "./SongSearch"


export const MusicContainer = () => {
    const [selectedTrackUri, setSelectedUri] = useState("")

    return <>
        <SongSearch setterFunction={setSelectedUri}/>
        <MusicPlayer selectedTrackUri={selectedTrackUri}/>
        </>
}